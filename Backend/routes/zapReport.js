import express from "express";
import axios from "axios";
import { explainVulnerability } from "../llm/explain.js";
import dotenv from "dotenv";
import { authenticateToken } from "./auth.js";

dotenv.config();

const router = express.Router();

const ZAP_API = process.env.ZAP_API;
const ZAP_API_KEY = process.env.ZAP_API_KEY;

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

router.post("/report", authenticateToken, async (req, res) => {
  const { url } = req.body;
  if (!url) return res.status(400).json({ error: "URL is required" });

  try {
    // 🕷️ Step 1: Spider the target
    const spiderRes = await axios.get(`${ZAP_API}/JSON/spider/action/scan/`, {
      params: { url, apikey: ZAP_API_KEY },
    });

    const spiderScanId = spiderRes.data.scan;
    console.log("Spider started. ID:", spiderScanId);

    // Wait until spidering is done
    let spiderStatus = "0";
    while (spiderStatus !== "100") {
      const statusRes = await axios.get(`${ZAP_API}/JSON/spider/view/status/`, {
        params: { scanId: spiderScanId, apikey: ZAP_API_KEY },
      });
      spiderStatus = statusRes.data.status;
      console.log("Spider progress:", spiderStatus + "%");
      await delay(3000);
    }

    console.log("Spidering complete.");

    // 🛡️ Step 2: Active Scan
    const scanRes = await axios.get(`${ZAP_API}/JSON/ascan/action/scan/`, {
      params: { url, apikey: ZAP_API_KEY },
    });

    const scanId = scanRes.data.scan;
    console.log("Active Scan started. ID:", scanId);

    // Wait until active scan completes
    let status = "0";
    while (status !== "100") {
      const statusRes = await axios.get(`${ZAP_API}/JSON/ascan/view/status/`, {
        params: { scanId, apikey: ZAP_API_KEY },
      });
      status = statusRes.data.status;
      console.log("Scan progress:", status + "%");
      await delay(3000);
    }

    console.log("Scan completed!");

    // 🧠 Step 3: Get alerts
    const alertsRes = await axios.get(`${ZAP_API}/JSON/core/view/alerts/`, {
      params: { baseurl: url, apikey: ZAP_API_KEY },
    });

    const alerts = alertsRes.data.alerts || [];

    const explained = await Promise.all(
      alerts.map(async (v) => {
        try {
          const raw = await explainVulnerability(v);
          const explanation = formatExplanation(raw);
          return { ...v, explanation };
        } catch (err) {
          return { ...v, explanation: "Error explaining vulnerability." };
        }
      })
    );

    return res.json({
      message: "Scan & explanation complete",
      data: explained,
    });
  } catch (err) {
    console.error("ZAP report error:", err.message);
    return res
      .status(500)
      .json({ error: "Internal error during report generation." });
  }
});

function formatExplanation(text) {
  if (!text) return "";

  // Remove Markdown symbols like asterisks, headers
  let cleaned = text.replace(/[*#`]/g, "");
  cleaned = cleaned.replace(/\n+/g, " ").trim();

  // Shorten the explanation (e.g., to 300 characters)
  if (cleaned.length > 500) {
    cleaned = cleaned.slice(0, 500) + "...";
  }

  return cleaned;
}
export default router;
