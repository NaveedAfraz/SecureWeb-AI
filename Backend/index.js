// server/index.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import zapRoutes from "./routes/zap.js";
import connectDB from "./db/db.js";
import zapReportRoutes from "./routes/zapReport.js";
import authRoutes from "./routes/auth.js";
import cookieParser from "cookie-parser";
dotenv.config();
const app = express();
connectDB();

app.use(cookieParser());
const corsOptions = {
  origin: ["https://secure-web-ai.vercel.app", "http://localhost:5173"],
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/zap", zapRoutes);
app.use("/api/zap", zapReportRoutes);

app.get("/", (req, res) => res.send("Server is running!"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
