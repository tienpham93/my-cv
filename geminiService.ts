
import { GoogleGenAI, Type } from "@google/genai";
import { ImageSize } from "./types";

export const generateProfessionalImage = async (prompt: string, size: ImageSize = '1K'): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-image-preview',
    contents: {
      parts: [
        {
          text: `A high-end, professional, and modern creative branding image for a software quality engineer portfolio. Subject: ${prompt}. Style: Clean, minimalist, tech-oriented, cinematic lighting, corporate aesthetic.`,
        },
      ],
    },
    config: {
      imageConfig: {
        aspectRatio: "16:9",
        imageSize: size
      }
    },
  });

  for (const part of response.candidates[0].content.parts) {
    if (part.inlineData) {
      return `data:image/png;base64,${part.inlineData.data}`;
    }
  }
  
  throw new Error("No image data returned from Gemini API");
};

export const refineSummary = async (originalSummary: string): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Refine the following professional summary for a Software Quality Engineer. Keep it humble, factual, and punchy. Original: "${originalSummary}"`,
    config: {
      systemInstruction: "You are an expert tech recruiter specializing in QA and Automation roles. Your tone is professional, clear, and impactful.",
      temperature: 0.7,
    }
  });

  return response.text || originalSummary;
};
