import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;
const users = []; // Use MongoDB in future

// Default user creation
(async () => {
  const passwordHash = await bcrypt.hash("password123", 10);
  users.push({
    id: "user1",
    username: "testuser",
    passwordHash,
    roles: ["user"]
  });
})();

// Middleware to protect routes
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

// Register
router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({ message: "All fields required" });

  if (users.find(u => u.username === username))
    return res.status(409).json({ message: "User already exists" });

  const passwordHash = await bcrypt.hash(password, 10);
  users.push({ id: Date.now().toString(), username, passwordHash, roles: ["user"] });

  res.status(201).json({ message: "User registered successfully!" });
});

// Login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);
  if (!user || !(await bcrypt.compare(password, user.passwordHash)))
    return res.status(401).json({ message: "Invalid credentials" });

  const token = jwt.sign(
    { id: user.id, username: user.username, roles: user.roles },
    JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.json({ message: "Login successful!", token, username: user.username });
});

export default router;
