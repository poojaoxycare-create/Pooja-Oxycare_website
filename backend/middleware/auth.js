import { Clerk } from "@clerk/clerk-sdk-node";

const clerkClient = new Clerk({
  secretKey: process.env.CLERK_SECRET_KEY,
});

export const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "Authorization header missing" });
    }

    // Extract token from "Bearer <token>" format
    const parts = authHeader.split(" ");
    if (parts.length !== 2 || parts[0] !== "Bearer") {
      return res.status(401).json({ message: "Invalid authorization format" });
    }

    const token = parts[1];
    if (!token) {
      return res.status(401).json({ message: "Token missing" });
    }

    let session;
    try {
      session = await clerkClient.verifyToken(token);
    } catch (verifyErr) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }

    if (!session) {
      return res.status(401).json({ message: "Invalid token" });
    }

    let fullUser;
    try {
      fullUser = await clerkClient.users.getUser(session.sub);
    } catch (getUserErr) {
      return res.status(401).json({ message: "Failed to fetch user details" });
    }
    req.user = {
      id: session.sub,
      email: fullUser.emailAddresses?.[0]?.emailAddress || session.email || "",
      name: fullUser.firstName && fullUser.lastName 
        ? `${fullUser.firstName} ${fullUser.lastName}` 
        : session.name || "",
      role: fullUser.publicMetadata?.role || "user",
    };

    next();
  } catch (err) {
    res.status(401).json({ message: "Authentication failed" });
  }
};
