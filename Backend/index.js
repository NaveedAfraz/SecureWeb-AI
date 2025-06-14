// server/index.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import zapRoutes from "./routes/zap.js";
import mobsfRoutes from "./routes/mobsf.js";
import zapReportRoutes from "./routes/zapReport.js";
import authRoutes from "./routes/auth.js";
dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/zap", zapRoutes);
app.use("/api/mobsf", mobsfRoutes);
app.use("/api/zap", zapReportRoutes);

app.get("/", (req, res) => res.send("Server is running!"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
