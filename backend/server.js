import dotenv from "dotenv";
dotenv.config();

// Validate required environment variables BEFORE importing modules that depend on them
const requiredEnvVars = [
  "CLERK_SECRET_KEY",
  "MONGO_URI",
  "IMAGEKIT_PUBLIC_KEY",
  "IMAGEKIT_PRIVATE_KEY",
  "IMAGEKIT_URL_ENDPOINT",
];

for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    console.error(`ERROR: ${envVar} is not set in .env file`);
    process.exit(1);
  }
}

// Dynamic imports to ensure env vars are validated first
const { default: app } = await import("./app.js");
const { default: connectDB } = await import("./db/db.js");
const { default: userRoutes } = await import("./routes/userRoutes.js");
const { default: productRoutes } = await import("./routes/productRoutes.js");
const { default: orderRoutes } = await import("./routes/orderRoutes.js");
const { default: contactRoutes } = await import("./routes/contactRoutes.js");

const PORT = process.env.PORT || 3000;

connectDB();

app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/contact", contactRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
