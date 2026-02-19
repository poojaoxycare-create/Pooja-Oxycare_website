import User from "../models/user.model.js";
import { Clerk } from "@clerk/clerk-sdk-node";

const clerkClient = new Clerk({
  secretKey: process.env.CLERK_SECRET_KEY,
});

export const createUser = async (req, res) => {
  try {
    const { clerkUserId, email, name, phone } = req.body;

    if (!clerkUserId || !email || !name) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const existingUser = await User.findOne({ clerkUserId });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({ clerkUserId, email, name, phone });
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const syncUser = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const existingUser = await User.findOne({ clerkUserId: req.user.id });

    if (existingUser) {
      return res.status(200).json({ message: "User already exists", user: existingUser });
    }

    const newUser = await User.create({
      clerkUserId: req.user.id,
      email: req.user.email,
      name: req.user.name || "User",
      username: req.user.username || "",
      phone: "",
    });

    res.status(201).json({ message: "User created", user: newUser });
  } catch (err) {
    res.status(500).json({ message: "Sync error" });
  }
};

export const getUserByClerkId = async (req, res) => {
  try {
    const { clerkUserId } = req.params;
    const user = await User.findOne({ clerkUserId });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const setupFirstAdmin = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const adminCount = await User.countDocuments({ role: "admin" });
    if (adminCount > 0) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    await clerkClient.users.updateUserMetadata(req.user.id, {
      publicMetadata: { role: "admin" },
    });
    res.json({ message: "You've been set as admin", email: req.user.email });
  } catch (err) {
    res.status(500).json({ message: "Failed to set admin" });
  }
};
