import { GoogleGenAI, Content } from "@google/genai";
import { ChatMessage, Role } from "../types";

// Initialize Gemini with the API Key
// NOTE: In a real app, strict backend proxying is recommended for key security.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Sends a message to the Gemini model with the legal context system instruction.
 */
export const sendToGemini = async (
  history: ChatMessage[],
  currentMessage: string,
  legalContext: string
): Promise<string> => {
  try {
    // Convert app history to Gemini Content format
    const historyContent: Content[] = history.map((msg) => ({
      role: msg.role === Role.USER ? "user" : "model",
      parts: [{ text: msg.text }],
    }));

    const modelId = "gemini-2.5-flash"; // Using Flash for speed and large context window

    const response = await ai.models.generateContent({
      model: modelId,
      contents: [
        ...historyContent,
        { role: "user", parts: [{ text: currentMessage }] }
      ],
      config: {
        systemInstruction: legalContext,
        temperature: 0.3, // Low temperature for factual accuracy
        maxOutputTokens: 1000,
      },
    });

    // The new @google/genai SDK returns the response object directly (no .response wrapper)
    // and provides a .text getter for easy access.
    if (response.text) {
      return response.text;
    }

    return "I apologize, I could not generate a response based on the legal documents.";

  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to consult the legal knowledge base. Please try again.");
  }
};