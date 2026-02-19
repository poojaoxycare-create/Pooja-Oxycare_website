import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      unique: true,
      sparse: true,
    },

    description: {
      type: String,
      required: true,
    },

    // Single product image
    image: {
      url: { type: String, default: "" },
      fileId: { type: String, default: "" },
    },

    // Pricing fields
    buyPrice: {
      type: Number,
      required: false,
    },

    rentPrice: {
      type: Number,
      required: false,
    },

    safetyDeposit: {
      type: Number,
      default: 0,
    },

    // Discount as percentage (0-100)
    discount: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },

    category: {
      type: String,
      required: true,
    },

    stock: {
      type: Number,
      default: 0,
    },

    // Link product to owner (Clerk user id) - required
    ownerClerkId: {
      type: String,
      required: true,
    },

    // Optional MongoDB User reference
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
