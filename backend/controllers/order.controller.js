import Order from "../models/order.model.js";
import Product from "../models/products.models.js";
import { sendEmail } from "../config/mailer.js";

// Simple HTML escape function
const escapeHTML = (str) => {
  if (!str) return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
};

export const createOrder = async (req, res) => {
  try {
    const {
      productId,
      orderType,
      quantity,
      fullName,
      phone,
      addressLine1,
      city,
      state,
      pincode,
      rentStartDate,
      rentDays,
      finalPrice,
    } = req.body;
    const userClerkId = req.user.id;
    const userEmail = req.user.email;

    if (!productId || !orderType || !quantity || !fullName || !phone || !addressLine1 || !city || !state || !pincode || !finalPrice) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Validate phone (10 digits)
    if (!/^\d{10}$/.test(phone.replace(/\s/g, ""))) {
      return res.status(400).json({ message: "Phone must be 10 digits" });
    }

    // Validate pincode (6 digits)
    if (!/^\d{6}$/.test(pincode.replace(/\s/g, ""))) {
      return res.status(400).json({ message: "Pincode must be 6 digits" });
    }

    if (!["buy", "rent"].includes(orderType)) {
      return res.status(400).json({ message: "orderType must be 'buy' or 'rent'" });
    }

    if (quantity <= 0) {
      return res.status(400).json({ message: "quantity must be greater than 0" });
    }

    if (orderType === "rent") {
      if (!rentStartDate || !rentDays) {
        return res.status(400).json({ message: "rentStartDate and rentDays are required for rent orders" });
      }
      if (rentDays <= 0) {
        return res.status(400).json({ message: "rentDays must be greater than 0" });
      }
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const productSnapshot = {
      productName: product.name,
      imageUrl: product.image?.url || null,
      buyPrice: product.buyPrice || null,
      rentPrice: product.rentPrice || null,
    };

    const order = new Order({
      userClerkId,
      userEmail,
      fullName,
      phone,
      addressLine1,
      city,
      state,
      pincode,
      productId,
      productSnapshot,
      orderType,
      quantity,
      rentStartDate: orderType === "rent" ? rentStartDate : undefined,
      rentDays: orderType === "rent" ? rentDays : undefined,
      finalPrice,
    });

    await order.save();
    res.status(201).json({ message: "Order created successfully", order });
  } catch (err) {
    res.status(500).json({ message: "Failed to create order", error: err.message });
  }
};

export const getMyOrders = async (req, res) => {
  try {
    const userClerkId = req.user.id;

    const orders = await Order.find({ userClerkId }).populate("productId").sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch orders", error: err.message });
  }
};

export const adminAcceptOrder = async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await Order.findByIdAndUpdate(
      orderId,
      { orderStatus: "accepted" },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    const emailHtml = `
      <h2>Your Order Has Been Accepted</h2>
      <p>Thank you for your order!</p>
      <p><strong>Product:</strong> ${escapeHTML(order.productSnapshot.productName)}</p>
      <p><strong>Quantity:</strong> ${order.quantity}</p>
      <p><strong>Order Total:</strong> ₹${order.finalPrice}</p>
      <p>Your ${order.orderType === "buy" ? "delivery" : "rental"} will be processed within 1 day.</p>
      <p>Thank you for shopping with us!</p>
    `;

    await sendEmail(order.userEmail, "Your order has been accepted", emailHtml);

    res.json({ message: "Order accepted", order });
  } catch (err) {
    res.status(500).json({ message: "Failed to accept order", error: err.message });
  }
};

export const adminRejectOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { reason } = req.body;

    const order = await Order.findByIdAndUpdate(orderId, { orderStatus: "rejected" }, { new: true });

    if (!order) return res.status(404).json({ message: "Order not found" });

    const emailHtml = `
      <h2>Your Order Has Been Rejected</h2>
      <p>Unfortunately, your order could not be processed.</p>
      <p><strong>Product:</strong> ${escapeHTML(order.productSnapshot.productName)}</p>
      <p><strong>Order Amount:</strong> ₹${order.finalPrice}</p>
      <p>Your refund will be processed within 2 working days.</p>
      <p>If you have any questions, please contact us.</p>
    `;

    await sendEmail(order.userEmail, "Your order has been rejected", emailHtml);

    return res.json({ message: "Order rejected", order, reason: reason || null });
  } catch (err) {
    return res.status(500).json({ message: "Failed to reject order", error: err.message });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("productId").sort({ createdAt: -1 });
    return res.json(orders);
  } catch (err) {
    return res.status(500).json({ message: "Failed to fetch orders", error: err.message });
  }
};

export const getRentedOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      orderType: "rent",
      orderStatus: "accepted",
    }).sort({ rentStartDate: 1 });

    // Add calculated fields and filter response
    const rentedOrders = orders.map((order) => {
      const rentEndDate = new Date(order.rentStartDate);
      rentEndDate.setDate(rentEndDate.getDate() + order.rentDays);
      const isExpired = new Date() > rentEndDate;

      return {
        _id: order._id,
        fullName: order.fullName,
        phone: order.phone,
        productSnapshot: order.productSnapshot,
        rentStartDate: order.rentStartDate,
        rentDays: order.rentDays,
        rentEndDate,
        isExpired,
      };
    });

    return res.json(rentedOrders);
  } catch (err) {
    console.error("Failed to fetch rented orders:", err.message);
    return res.status(500).json({ message: "Failed to fetch rented orders", error: err.message });
  }
};
