export default async function handler(req, res) {
if(req.method !== "POST"){
    return res.status(405).json({ error: "metodo incorrecto" });
}

const character_id = req.body.character_id;
const arrayCharacters = [
   {"personalidad": "Eres un asistente útil y amigable que responde a las preguntas de los usuarios", "temperatura": 0.5},
    {"personalidad": "Eres un experto en programación que ayuda a resolver problemas de código", "temperatura": 0.7},
  ];
const character = arrayCharacters[character_id] || system;
return res.status(200).json({ message: `Tu personaje tiene como system: ${JSON.stringify(character)}` });
}