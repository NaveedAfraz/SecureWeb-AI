import express from "express";
import axios from "axios";
import { explainVulnerability } from "../llm/explain.js";

const router = express.Router();
const ZAP_API = process.env.ZAP_API || "http://localhost:8080";

// Route to trigger ZAP scan
router.post("/scan", async (req, res) => {
  const { url } = req.body;
  if (!url) {
    return res.status(400).json({ error: "Missing URL" });
  }

  try {
    // 1. Optional: Start spider first (to crawl site)
    await axios.get(`${ZAP_API}/JSON/spider/action/scan/`, {
      params: {
        url,
        apikey: process.env.ZAP_API_KEY,
      },
    });

    // 2. Start active scan
    const response = await axios.get(`${ZAP_API}/JSON/ascan/action/scan/`, {
      params: {
        url,
        apikey: process.env.ZAP_API_KEY,
      },
    });

    res.json({
      message: "ZAP Scan Started",
      scanId: response.data.scan,
    });
  } catch (error) {
    console.error("ZAP Scan error:", error.message);
    res.status(500).json({ error: "ZAP scan failed" });
  }
});

// Route to explain a vulnerability
router.post("/explain", async (req, res) => {
  const { vulnerability } = req.body;

  if (!vulnerability) {
    return res.status(400).json({ error: "Missing vulnerability data" });
  }

  try {
    const explanation = await explainVulnerability(vulnerability);
    res.json({ explanation });
  } catch (err) {
    console.error("LLM error:", err.message);
    res.status(500).json({ error: "LLM error" });
  }
});

export default router;
