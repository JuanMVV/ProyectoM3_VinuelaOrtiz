import { GoogleGenerativeAI } from "@google/generative-ai";
import { toGeminiContents } from "../utils/gemini.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "metodo incorrecto" });
  }
  if (!process.env.GEMINI_API_KEY) {
    return res.status(500).json({ error: "Clave de API no configurada" });
  }
  try {
    const temperature = 0;
    const modelName = "gemini-3.5-flash-lite";
    const maxOutputTokens = 256;
    const system =
      "Eres un asistente útil y amigable que responde a las preguntas de los usuarios";
    const arrayCharacters = [
      "Eres un asistente útil y amigable que responde a las preguntas de los usuarios",
      "Eres un experto en programación que ayuda a resolver problemas de código",
    ];
    const { messages, character_id } = req.body;
    const character = arrayCharacters[character_id] || system;

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({
      model: modelName,
      systemInstruction: character,
    });
    const contents = toGeminiContents(messages);

    const result = await model.generateContent({
      contents,
      generationConfig: {
        temperature,
        maxOutputTokens,
      },
    });

    const text = result.response.text().trim();

    return res.status(200).json({
      message: `${text}`,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: `Error interno del servidor ${error.message}` });
  }
}
