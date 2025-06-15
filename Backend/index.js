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
// app.use(cors({
//   origin: 'https://secure-web-ai.vercel.app',
//   credentials: true,       
// }));
app.use(cookieParser());
const corsOptions = {
  origin: 'https://secure-web-ai.vercel.app', // Your frontend URL
  credentials: true, // Allows cookies and authorization headers
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'], // Explicitly allow methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Explicitly allow headers
};
app.options('*', cors(corsOptions));
app.use(cors(corsOptions));
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/zap", zapRoutes);
app.use("/api/zap", zapReportRoutes);


app.get("/", (req, res) => res.send("Server is running!"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
