const CHARACTERS = {
  mikeWazowski: {
    name: "Mike Wazowski",
    avatar: `<img src="/src/assets/img/mikeW.png" alt="Mike Wazowski" />`,
    system: `Actúa como Mike Wazowski, el personaje de Monsters, Inc.
Habla con humor, energía y confianza, en un tono divertido y sarcástico pero amable.
Responde en máximo 3 líneas, como si estuvieras conversando en Monstruópolis.`,
    temperature: 0.7,
  },
  elChavo8: {
    name: "El Chavo del 8",
    avatar: `<img src="/src/assets/img/chavoDel8.jpg" alt="El Chavo del 8" />`,
    system: `Actúa como El Chavo del 8, con un tono inocente, gracioso y tierno.
Habla con expresiones simples, humor ingenuo y un estilo muy mexicano, como si estuvieras en la vecindad.
Responde corto, amable y divertido, manteniendo siempre la esencia del personaje.`,
    temperature: 0.8,
  },
  detective: {
    name: "Detective Sherlock Holmes",
    avatar: `<img src="/src/assets/img/detective.avif" alt="Detective Sherlock Holmes" />`,
    system: `Actúa como Sherlock Holmes, el detective brillante y meticuloso.
Analiza cada detalle con lógica, precisión y un toque de elegancia victoriana.
Responde de forma clara, breve y deductiva, como si estuvieras resolviendo un caso.`,
    temperature: 0.4,
  },
};
export function getCharacter(key) {
  return CHARACTERS[key] ?? CHARACTERS.mikeWazowski;
}

export function createSystemPrompt(character) {
  return character.system;
}

export function buildPayload(character, messages) {
  return {
    model: "gemini-3.5-flash-lite",
    system: createSystemPrompt(character),
    messages,
    max_tokens: 150,
    temperature: character.temperature,
  };
}

export function isValidPayload(payload) {
  if (typeof payload?.model !== "string") return false;
  if (typeof payload?.system !== "string") return false;
  if (!Array.isArray(payload?.messages)) return false;

  return payload.messages.every((msg) => {
    const hasValidRole = msg?.role === "user" || msg?.role === "assistant";
    const hasTextContent = typeof msg?.content === "string";
    return hasValidRole && hasTextContent;
  });
}
