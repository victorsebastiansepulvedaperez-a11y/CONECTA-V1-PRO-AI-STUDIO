import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize Gemini API client safely
  const apiKey = process.env.GEMINI_API_KEY;
  let ai: GoogleGenAI | null = null;

  if (apiKey && apiKey !== "MY_GEMINI_API_KEY" && apiKey.trim() !== "") {
    try {
      ai = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });
      console.log("Gemini API initialized successfully.");
    } catch (err) {
      console.error("Failed to initialize Gemini Client:", err);
    }
  } else {
    console.warn("No valid GEMINI_API_KEY found. Server will run in simulation/fallback mode.");
  }

  // API endpoint for interactive AI Chat (Estrella AI / Asistente MCP)
  app.post("/api/chat", async (req, res) => {
    const { message, systemInstruction, history } = req.body;

    if (!message) {
      return res.status(400).json({ error: "El mensaje es requerido." });
    }

    // High quality mock responses tailored to the Conecta V2 Pro dashboard cases
    // (fallback in case API key is missing or invalid)
    const lowerMessage = message.toLowerCase();
    let fallbackResponse = "";

    if (lowerMessage.includes("jessica") || lowerMessage.includes("muñoz") || lowerMessage.includes("caso")) {
      fallbackResponse = "He revisado el caso de Jessica Muñoz (7° Básico A). El análisis del chat muestra ideación suicida latente relacionada con conflictos familiares graves y sentimientos de soledad escolar. Recomiendo activar el Protocolo de Crisis de forma inmediata, realizar contacto de emergencia con la madre (C. Muñoz) y programar una sesión presencial de contención con la Dupla Psicosocial mañana en primera hora.";
    } else if (lowerMessage.includes("alerta") || lowerMessage.includes("riesgo")) {
      fallbackResponse = "Actualmente tenemos 1 alerta crítica activa de Nivel 5 (Jessica Muñoz, 7°A) y 1 alerta moderada de Nivel 3 (Kevin Soto, 2°M B por Bullying severo). Ambas se encuentran en monitoreo activo por parte de la Dupla Psicosocial. ¿Deseas que prepare una derivación formal a la red de salud local?";
    } else if (lowerMessage.includes("clima") || lowerMessage.includes("slep") || lowerMessage.includes("indicadores")) {
      fallbackResponse = "El Clima Emocional Global del distrito SLEP está en 84.2%, mostrando una tendencia al alza del +3.5% respecto al mes anterior. Las áreas de mayor preocupación se concentran en el 7° Básico A, debido a incidencias repetidas de cyberbullying. He generado una recomendación para implementar talleres de asertividad digital esta semana.";
    } else if (lowerMessage.includes("kudos") || lowerMessage.includes("premio") || lowerMessage.includes("sofía")) {
      fallbackResponse = "Sofía Carvajal ha recibido 3 nuevas medallas de Kudos esta semana en la categoría de 'Liderazgo' y 'Empatía'. Su tutor, el Prof. Omar Lobos, destaca su gran compañerismo en trabajos grupales. Recomiendo enviar una felicitación digital al Portal del Apoderado para reforzar positivamente su conducta.";
    } else {
      fallbackResponse = "Hola. Soy el asistente de Conecta V2 Pro. He analizado el estado socioemocional de la institución y estoy aquí para ayudarte a redactar respuestas de contención, coordinar derivaciones clínicas o revisar las auditorías del sistema.";
    }

    if (ai) {
      try {
        const contents = [];
        
        // Add chat history if present
        if (history && Array.isArray(history)) {
          for (const item of history) {
            contents.push({
              role: item.sender === "user" ? "user" : "model",
              parts: [{ text: item.text }]
            });
          }
        }
        
        // Append current message
        contents.push({
          role: "user",
          parts: [{ text: message }]
        });

        const response = await ai.models.generateContent({
          model: "gemini-3.5-flash",
          contents: contents,
          config: {
            systemInstruction: systemInstruction || "Eres Estrella AI, un asistente de inteligencia emocional educativa de Conecta V2 Pro. Ayudas a psicólogos, docentes y directivos a abordar casos críticos de estudiantes, redactar respuestas empáticas y optimizar la convivencia escolar. Responde siempre en español de forma profesional, clara, empática y accionable.",
            temperature: 0.7,
          }
        });

        if (response && response.text) {
          return res.json({ reply: response.text });
        } else {
          return res.json({ reply: fallbackResponse });
        }
      } catch (err: any) {
        console.error("Gemini API call failed, falling back to mock:", err.message);
        return res.json({ reply: fallbackResponse + " (Simulado: " + err.message + ")" });
      }
    } else {
      // Return beautiful fallback simulation responses
      return res.json({ reply: fallbackResponse });
    }
  });

  // Serve static build in production, or mount Vite dev middleware
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Express server listening on http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start custom server:", err);
});
