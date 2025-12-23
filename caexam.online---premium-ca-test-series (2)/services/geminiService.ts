import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || ''; // Ensure this environment variable is set in your build/deployment
const ai = new GoogleGenAI({ apiKey });

export const askGeminiTutor = async (question: string): Promise<string> => {
  if (!apiKey) {
    return "API Key is missing. Please configure the environment variable.";
  }

  try {
    const model = 'gemini-3-flash-preview'; // Fast model for interactive tutor
    const response = await ai.models.generateContent({
      model: model,
      contents: `You are an expert CA (Chartered Accountant) tutor for Indian CA students. 
      Answer the following doubt concisely and clearly. Focus on ICAI guidelines and sections if applicable.
      
      Student Question: ${question}`,
    });

    return response.text || "I couldn't generate an answer at this moment.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Sorry, I am facing technical difficulties connecting to the knowledge base.";
  }
};