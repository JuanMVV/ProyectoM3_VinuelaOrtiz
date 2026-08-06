import { describe, it, expect } from "vitest";
import {
  appendUserMessage,
  appendAssistantMessage,
  getTrimmedHistory,
  resetHistory,
} from "../src/engine/history.js";

describe("history.js", () => {
  it("Agrega un nuevo mensaje al user sin modificar el arreglo original", () => {
    const original = [];
    const next = appendUserMessage(original, "hola soy el nuevo mensaje");

    expect(original).toEqual([]);
    expect(next).toEqual([
      { role: "user", content: "hola soy el nuevo mensaje" },
    ]);
  });
  it("agregaR un mensaje como assistant con el role de assistant", () => {
    const next = appendAssistantMessage([], "respuesta");

    expect(next).toEqual([{ role: "assistant", content: "respuesta" }]);
  });

  it("recorta el historial con slice(-maxTurns)", () => {
    const messages = [
      { role: "user", content: "1" },
      { role: "assistant", content: "2" },
      { role: "user", content: "3" },
    ];

    expect(getTrimmedHistory(messages, 2)).toEqual(messages.slice(-2));
  });

  it("resetHistory devuelve un array vacio", () => {
    expect(resetHistory()).toEqual([]);
  });
});
