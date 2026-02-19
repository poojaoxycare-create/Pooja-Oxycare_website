import Product from "../models/products.models.js";
import imagekit from "../config/imagekit.js";

export const createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      category,
      stock,
      buyPrice,
      rentPrice,
      safetyDeposit,
      discount,
    } = req.body;

    // Validate required fields
    if (!name || !description || !category) {
      return res.status(400).json({ message: "name, description, and category are required" });
    }

    let discountValue = discount ? Number(discount) : 0;
    if (isNaN(discountValue) || discountValue < 0 || discountValue > 100) {
      discountValue = 0;
    }

    // Validate prices are not negative
    const buyPriceNum = buyPrice ? Number(buyPrice) : undefined;
    const rentPriceNum = rentPrice ? Number(rentPrice) : undefined;
    const SafetyDepositNum = safetyDeposit ? Number(safetyDeposit) : 0;

    if (buyPriceNum !== undefined && (isNaN(buyPriceNum) || buyPriceNum < 0)) {
      return res.status(400).json({ message: "buyPrice must be a positive number" });
    }
    if (rentPriceNum !== undefined && (isNaN(rentPriceNum) || rentPriceNum < 0)) {
      return res.status(400).json({ message: "rentPrice must be a positive number" });
    }
    if (isNaN(SafetyDepositNum) || SafetyDepositNum < 0) {
      return res.status(400).json({ message: "safetyDeposit must be a positive number" });
    }

    // Generate slug from product name
    const slug = name
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .concat('-' + Date.now()); // Ensure uniqueness

    const productData = {
      name: name.trim(),
      description,
      category,
      stock: stock ? Math.max(0, Number(stock)) : 0,
      buyPrice: buyPriceNum,
      rentPrice: rentPriceNum,
      safetyDeposit: SafetyDepositNum,
      discount: discountValue,
      slug,
      ownerClerkId: req.user.id,
    };

    if (req.file) {
      const base64 = req.file.buffer.toString("base64");
      const uploadResult = await imagekit.upload({
        file: base64,
        fileName: req.file.originalname,
        folder: "/products",
        useUniqueFileName: true,
      });

      productData.image = {
        url: uploadResult.url,
        fileId: uploadResult.fileId,
      };
    }

    const product = new Product(productData);
    await product.save();

    res.status(201).json({ message: "Product created", product });
  } catch (err) {
    console.error("Product creation error:", err);
    res.status(500).json({ message: "Failed to create product", error: err.message });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch products", error: err.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch product", error: err.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      description,
      category,
      stock,
      buyPrice,
      rentPrice,
      safetyDeposit,
      discount,
    } = req.body;

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Validate prices are not negative
    if (buyPrice !== undefined) {
      const buyPriceNum = Number(buyPrice);
      if (isNaN(buyPriceNum) || buyPriceNum < 0) {
        return res.status(400).json({ message: "buyPrice must be a positive number" });
      }
    }
    if (rentPrice !== undefined) {
      const rentPriceNum = Number(rentPrice);
      if (isNaN(rentPriceNum) || rentPriceNum < 0) {
        return res.status(400).json({ message: "rentPrice must be a positive number" });
      }
    }
    if (safetyDeposit !== undefined) {
      const safetyDepositNum = Number(safetyDeposit);
      if (isNaN(safetyDepositNum) || safetyDepositNum < 0) {
        return res.status(400).json({ message: "safetyDeposit must be a positive number" });
      }
    }

    if (name) {
      product.name = name.trim();
      // Regenerate slug if name changes
      product.slug = name
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')
        .concat('-' + Date.now());
    }
    if (description) product.description = description;
    if (category) product.category = category;
    if (stock !== undefined) product.stock = Math.max(0, Number(stock));
    if (buyPrice !== undefined) product.buyPrice = Number(buyPrice);
    if (rentPrice !== undefined) product.rentPrice = Number(rentPrice);
    if (safetyDeposit !== undefined) product.safetyDeposit = Number(safetyDeposit);

    if (discount !== undefined) {
      let discountValue = Number(discount);
      if (isNaN(discountValue) || discountValue < 0 || discountValue > 100) {
        discountValue = 0;
      }
      product.discount = discountValue;
    }

    if (req.file) {
      if (product.image && product.image.fileId) {
        try {
          await imagekit.deleteFile(product.image.fileId);
        } catch (delErr) {
          // Continue with upload if delete fails
        }
      }
      const base64 = req.file.buffer.toString("base64");
      const uploadResult = await imagekit.upload({
        file: base64,
        fileName: req.file.originalname,
        folder: "/products",
        useUniqueFileName: true,
      });

      product.image = {
        url: uploadResult.url,
        fileId: uploadResult.fileId,
      };
    }

    await product.save();
    res.json({ message: "Product updated", product });
  } catch (err) {
    res.status(500).json({ message: "Failed to update product", error: err.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (product.image && product.image.fileId) {
      try {
        await imagekit.deleteFile(product.image.fileId);
      } catch (delErr) {
        // Continue with deletion if image delete fails
      }
    }

    await product.deleteOne();
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete product", error: err.message });
  }
};
