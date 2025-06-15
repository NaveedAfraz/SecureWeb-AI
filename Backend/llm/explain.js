import { generateText } from "ai";
import { google } from "@ai-sdk/google";
import dotenv from "dotenv";
dotenv.config();

export async function explainVulnerability(vuln) {
  const prompt = `
You are a cybersecurity expert. Please explain this vulnerability:

Alert: ${vuln.alert}
Description: ${vuln.desc}
Risk Level: ${vuln.riskdesc}

Explain:
1. What is the vulnerability ?
2. Why is it dangerous?
3. How can it be fixed?
4.EVERY RESPONSE FOR THE ABOVE QUESTION SHOULD BE IN 2 LINES.
`;

  try {
    const { text } = await generateText({
      model: google("models/gemini-1.5-flash"), // ✅ WORKS
      prompt,
      apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
    });

    return text;
  } catch (error) {
    console.error("Gemini API error:", error);
    throw new Error("LLM error");
  }
}
