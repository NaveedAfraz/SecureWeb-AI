// server/index.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import zapRoutes from "./routes/zap.js";
<<<<<<< HEAD
import connectDB from "./db/db.js";
=======
>>>>>>> 3050aa4 (updated features)
import zapReportRoutes from "./routes/zapReport.js";
import authRoutes from "./routes/auth.js";
dotenv.config();
const app = express();
<<<<<<< HEAD
connectDB();
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/zap", zapRoutes);
  
=======

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/zap", zapRoutes);
>>>>>>> 3050aa4 (updated features)
app.use("/api/zap", zapReportRoutes);

app.get("/", (req, res) => res.send("Server is running!"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
