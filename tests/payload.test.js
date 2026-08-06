import { describe, it, expect } from "vitest";
import {
  buildPayload,
  getCharacter,
  isValidPayload,
} from "../src/engine/payload.js";

describe("payload.js", () => {
  it("construye un payload valido con system top-level e historial en messages[]", () => {
    const character = getCharacter("elChavo8");
    const messages = [{ role: "user", content: "hola" }];
    const payload = buildPayload(character, messages);

    expect(payload.model).toBe("gemini-3.5-flash-lite");
    expect(payload.system).toContain("El Chavo del 8");
    expect(payload.messages).toBe(messages);
    expect(isValidPayload(payload)).toBe(true);
  });

  it("rechaza un payload que pone role system dentro de messages[]", () => {
    const payload = {
      model: "gemini-3.5-flash-lite",
      system: "Prompt correcto",
      messages: [{ role: "system", content: "Prompt incorrecto" }],
    };

    expect(isValidPayload(payload)).toBe(false);
  });
});

describe("Mike Wazowski character", () => {
  it("debe devolver su perfil y construir un payload válido", () => {
    const character = getCharacter("mikeWazowski");

    expect(character.name).toBe("Mike Wazowski");
    expect(character.avatar).toContain("mikeW.png");
    expect(character.system).toContain("Monstruópolis");

    const payload = buildPayload(character, [
      { role: "user", content: "Hola" },
    ]);

    expect(payload.model).toBe("gemini-3.5-flash-lite");
    expect(payload.system).toBe(character.system);
    expect(payload.temperature).toBe(character.temperature);
    expect(payload.messages).toHaveLength(1);
  });
});

describe("Chavo del 8 character", () => {
  it("debe devolver el perfil del chavo del 8 y construir un payload válido", () => {
    const character = getCharacter("elChavo8");

    expect(character.name).toBe("El Chavo del 8");
    expect(character.avatar).toContain("chavoDel8.jpg");
    expect(character.system).toContain("la vecindad");

    const payload = buildPayload(character, [
      { role: "user", content: "Hola" },
    ]);

    expect(payload.model).toBe("gemini-3.5-flash-lite");
    expect(payload.system).toBe(character.system);
    expect(payload.temperature).toBe(character.temperature);
    expect(payload.messages).toHaveLength(1);
  });
});

describe("Sherlock Holmes character", () => {
  it("debe devolver el perfil de Sherlock Holmes y construir un payload válido", () => {
    const character = getCharacter("detective");

    expect(character.name).toBe("Detective Sherlock Holmes");
    expect(character.avatar).toContain("detective.avif");
    expect(character.system).toContain("Sherlock Holmes");

    const payload = buildPayload(character, [
      { role: "user", content: "Hola" },
    ]);

    expect(payload.model).toBe("gemini-3.5-flash-lite");
    expect(payload.system).toBe(character.system);
    expect(payload.temperature).toBe(character.temperature);
    expect(payload.messages).toHaveLength(1);
  });
});
