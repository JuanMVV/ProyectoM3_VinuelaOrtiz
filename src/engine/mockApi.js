/*
 * mockApi.js — Simulación de la AI API para la clase
 *
 * El frontend nunca debe exponer una API key real. Por eso este ejercicio usa
 * un mock con el mismo shape general de Anthropic: content[] + usage + stop_reason.
 *
 * Para migrar a producción, se reemplaza callAI() por un fetch a un proxy/serverless
 * que agregue la API key del lado servidor.
 */

let requestCount = 0;

const MOCK_RESPONSES = {
  mikeWazowski: [
    "¡Ojo con esa pregunta! Puede parecer sencilla, pero tiene más vueltas que una ronda de sustos.",
    "¡Eso suena interesante! Yo empezaría reuniendo toda la información y después buscaría la forma más inteligente de resolverlo.",
    "Mirá, no hace falta ser enorme para enfrentar un gran problema. Con atención, creatividad y un buen plan, se puede avanzar.",
    "¡Tengo una teoría! Tal vez la respuesta esté en ese pequeño detalle que todos están pasando por alto.",
  ],

  elChavo8: [
    "Pues yo creo que primero habría que entender bien el problema... aunque a veces uno entiende una cosa y era otra.",
    "Eso me recuerda a cuando uno busca algo y lo tiene enfrente, pero no lo encuentra porque está buscando en otro lado.",
    "Yo no sé mucho de eso, pero si todos colaboran y nadie se queda con la torta, seguramente podemos encontrar una solución.",
    "A veces las cosas se complican porque uno quiere hacerlas rápido. Mejor vamos paso por paso, aunque nos tardemos un poquito.",
  ],

  detective: [
    "Interesante. La respuesta no está en la primera impresión, sino en la relación entre los detalles.",
    "Antes de sacar conclusiones, conviene ordenar los hechos y distinguir las pruebas de las simples sospechas.",
    "Hay algo que no encaja. Ese dato aparentemente insignificante podría ser la pieza que falta para resolver el caso.",
    "Mi hipótesis inicial es clara, pero todavía no definitiva. Necesito comprobar cada indicio antes de emitir un veredicto.",
  ],
};

function simulateLatency() {
  const ms = 800 + Math.random() * 1200;
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function detectCharacterKey(payload) {
  const system = payload?.system ?? "";

  if (system.includes("El chavo")) return "elChavo8";
  if (system.includes("detective") || system.includes("Detective"))
    return "detective";
  return "mikeWazowski";
}

function getLastUserMessage(payload) {
  const messages = Array.isArray(payload?.messages) ? payload.messages : [];
  const lastUser = [...messages].reverse().find((msg) => msg?.role === "user");
  return lastUser?.content ?? "";
}

function estimateTokens(text) {
  return Math.max(1, Math.ceil(String(text).length / 4));
}

export async function callAI(payload) {
  requestCount += 1;
  await simulateLatency();

  const characterKey = detectCharacterKey(payload);
  const responses = MOCK_RESPONSES[characterKey];
  const responseText = responses[(requestCount - 1) % responses.length];
  const userText = getLastUserMessage(payload);
  const inputTokens = estimateTokens(JSON.stringify(payload));
  const outputTokens = estimateTokens(responseText);

  return {
    id: `msg_mock_${requestCount}`,
    type: "message",
    role: "assistant",
    content: [
      {
        type: "text",
        text: `${responseText}${userText ? `\n\nSobre "${userText}", miraría primero el contexto.` : ""}`,
      },
    ],
    stop_reason: "end_turn",
    usage: {
      input_tokens: inputTokens,
      output_tokens: outputTokens,
    },
  };
}
