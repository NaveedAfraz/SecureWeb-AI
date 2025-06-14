// import express from "express";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import dotenv from "dotenv";
// import User from "../models/auth.js";
// dotenv.config();

// const router = express.Router();
// const JWT_SECRET = process.env.JWT_SECRET;
//  // Use MongoDB in future

// // Default user creation
// (async () => {
//   const passwordHash = await bcrypt.hash("password123", 10);
//   users.push({
//     id: "user1",
//     username: "testuser",
//     passwordHash,
//     roles: ["user"],
//   });
// })();

// // Middleware to protect routes
// export const authenticateToken = (req, res, next) => {
//   const authHeader = req.headers["authorization"];
//   const token = authHeader?.split(" ")[1];
//   if (!token) return res.status(401).json({ message: "No token provided" });

//   jwt.verify(token, JWT_SECRET, (err, user) => {
//     if (err) return res.status(403).json({ message: "Invalid token" });
//     req.user = user;
//     next();
//   });
// };

// // Register
// router.post("/register", async (req, res) => {
//   console.log("Received register:", req.body);
//   const { username, password } = req.body;
//   if (!username || !password)
//     return res.status(400).json({ message: "All fields required" });

//   if (users.find((u) => u.username === username))
//     return res.status(409).json({ message: "User already exists" });

//   const passwordHash = await bcrypt.hash(password, 10);
//   const user = new User({ username, passwordHash });
//   await user.save();

//   res.status(201).json({ message: "User registered successfully!" });
// });

// // Login
// router.post("/login", async (req, res) => {
//   const { username, password } = req.body;
//   const user = users.find((u) => u.username === username);
//   if (!user || !(await bcrypt.compare(password, user.passwordHash)))
//     return res.status(401).json({ message: "Invalid credentials" });

//   const token = jwt.sign(
//     { id: user.id, username: user.username, roles: user.roles },
//     JWT_SECRET,
//     { expiresIn: "1h" }
//   );

//   res.json({ message: "Login successful!", token, username: user.username });
// });

// export default router;

import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/auth.js"; // ✅ MongoDB User Model

dotenv.config();
const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

// 🔐 Middleware to protect routes
export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token provided" });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    req.user = user;
    next();
  });
};

// 📝 Register Route
router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({ message: "All fields are required" });

  try {
    const existing = await User.findOne({ username });
    if (existing)
      return res.status(409).json({ message: "User already exists" });

    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = new User({ username, passwordHash, roles: ["user"] });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully!" });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ message: "Server error during registration." });
  }
});

// 🔐 Login Route
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, username: user.username, roles: user.roles },
      JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax",
      maxAge: 3600000, // 1 hour
    });
    res.json({ message: "Login successful!", token, username: user.username });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error during login." });
  }
});

router.get("/check", (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "Not logged in" });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    res.json({ message: "User authenticated", user });
  });
});

router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out successfully" });
});
export default router;
