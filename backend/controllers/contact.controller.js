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

export const sendContact = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, subject, message } = req.body || {};

    // Validate required fields
    if (!email || !message) {
      return res.status(400).json({ message: "Email and message are required" });
    }

    // Simple email validation
    if (!email.includes("@")) {
      return res.status(400).json({ message: "Invalid email address" });
    }

    const adminEmail = process.env.ADMIN_EMAIL || process.env.GMAIL_USER;
    if (!adminEmail) {
      console.warn("WARNING: ADMIN_EMAIL not set, using GMAIL_USER fallback");
    }

    const fullName = `${firstName || ""} ${lastName || ""}`.trim() || "(not provided)";

    // Escape all user input to prevent XSS
    const html = `
      <h3>New contact form submission</h3>
      <p><strong>Name:</strong> ${escapeHTML(fullName)}</p>
      <p><strong>Email:</strong> ${escapeHTML(email)}</p>
      <p><strong>Phone:</strong> ${escapeHTML(phone || '(not provided)')}</p>
      <p><strong>Subject:</strong> ${escapeHTML(subject || '(none)')}</p>
      <hr />
      <p>${escapeHTML(message)}</p>
    `;

    await sendEmail(adminEmail, `Contact form: ${subject || "New message"}`, html);

    return res.json({ message: "Message sent" });
  } catch (err) {
    console.error("Failed to send contact email:", err.message);
    return res.status(500).json({ message: "Failed to send message" });
  }
};
