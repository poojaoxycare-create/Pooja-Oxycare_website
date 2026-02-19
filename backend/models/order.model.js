import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    // User info (from Clerk)
    userClerkId: {
      type: String,
      required: true,
    },
    userEmail: {
      type: String,
      required: true,
    },

    // User delivery/rental details
    fullName: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    addressLine1: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    pincode: {
      type: String,
      required: true,
    },

    // Product reference & snapshot
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    productSnapshot: {
      productName: String,
      imageUrl: String,
      buyPrice: Number,
      rentPrice: Number,
    },

    // Order type
    orderType: {
      type: String,
      enum: ["buy", "rent"],
      required: true,
    },

    // Quantity
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },

    // Rent details (only if orderType = "rent")
    rentStartDate: Date,
    rentDays: Number,

    // Pricing & Status
    finalPrice: {
      type: Number,
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "refunded"],
      default: "pending",
    },
    orderStatus: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;
