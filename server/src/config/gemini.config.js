import { GoogleGenAI } from "@google/genai";

// Configurable model with automatic fallback list
const MODELS = [
  process.env.GEMINI_MODEL || "gemini-2.5-flash",
  "gemini-3.5-flash",
  "gemini-3.5-flash-lite",
];

let ai = null;

const getAIClient = () => {
  if (!ai) {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY environment variable is missing in your configuration.");
    }
    ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });
  }
  return ai;
};

const generateContent = async (prompt) => {
  const client = getAIClient();
  let lastError = null;

  // Try models in order; if one is busy or rate-limited, fall back to the next
  for (const model of MODELS) {
    try {
      const response = await client.models.generateContent({
        model,
        contents: prompt,
      });

      if (response && response.text) {
        return response.text;
      }
    } catch (error) {
      lastError = error;
      console.warn(`Gemini model ${model} failed: ${error.message}. Trying next fallback...`);
    }
  }

  console.error("All Gemini models failed:", lastError?.message);
  throw new Error(`Gemini AI service error: ${lastError?.message || 'Unknown error'}`);
};

export { generateContent };