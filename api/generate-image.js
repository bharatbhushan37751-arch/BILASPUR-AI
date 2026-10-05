// api/_core.ts
import { GoogleGenAI } from "@google/genai";
function getApiKey() {
  return process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY || process.env.GOOGLE_GENAI_API_KEY || "";
}
function getGeminiClient() {
  const apiKey = getApiKey();
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build"
      }
    }
  });
}
async function generateSceneImage(params) {
  const { prompt, aspectRatio = "16:9", quality = "standard" } = params;
  const apiKey = getApiKey();
  if (!apiKey) {
    throw new Error("Missing API key on the server.");
  }
  const ai = getGeminiClient();
  const targetModel = quality === "studio" ? "gemini-3-pro-image-preview" : "gemini-3.1-flash-image-preview";
  const validRatios = ["1:1", "2:3", "3:2", "3:4", "4:3", "9:16", "16:9", "21:9"];
  const chosenRatio = validRatios.includes(aspectRatio) ? aspectRatio : "16:9";
  const enhancedPrompt = prompt.toLowerCase().includes("bilaspur") || prompt.toLowerCase().includes("himachal") ? prompt : `${prompt}, scenic Bilaspur Himachal Pradesh India, Himalayan landscape, authentic cultural atmosphere, photorealistic travel photography`;
  let response;
  try {
    response = await ai.models.generateContent({
      model: targetModel,
      contents: { parts: [{ text: enhancedPrompt }] },
      config: {
        imageConfig: {
          aspectRatio: chosenRatio
        }
      }
    });
  } catch (primaryErr) {
    const standardRatio = ["1:1", "3:4", "4:3", "9:16", "16:9"].includes(chosenRatio) ? chosenRatio : "16:9";
    response = await ai.models.generateContent({
      model: "gemini-3.1-flash-image",
      contents: { parts: [{ text: enhancedPrompt }] },
      config: {
        imageConfig: {
          aspectRatio: standardRatio
        }
      }
    });
  }
  let imageUrl = "";
  const parts = response.candidates?.[0]?.content?.parts || [];
  for (const part of parts) {
    if (part.inlineData?.data) {
      const mimeType = part.inlineData.mimeType || "image/jpeg";
      imageUrl = `data:${mimeType};base64,${part.inlineData.data}`;
      break;
    }
  }
  if (!imageUrl) {
    throw new Error("No image data returned from AI model.");
  }
  return { imageUrl, prompt: enhancedPrompt, aspectRatio: chosenRatio };
}

// api/generate-image.ts
async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,POST");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Content-Type"
  );
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }
  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body || {};
    const result = await generateSceneImage(body);
    return res.status(200).json(result);
  } catch (err) {
    console.error("Image generator serverless error:", err);
    return res.status(500).json({ error: err.message || "Internal Server Error" });
  }
}
export {
  handler as default
};
