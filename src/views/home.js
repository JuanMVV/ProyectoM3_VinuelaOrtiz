import { getCharacter } from "../engine/payload.js";
import { navigateTo } from "../router.js";

const CHARACTER_KEYS = ["mikeWazowski", "elChavo8", "detective"];

const THEMES = {
  mikeWazowski: {
    gradient: "linear-gradient(135deg, #4b5563, #1f2937)",
    accent: "#9ca3af",
  },
  elChavo8: {
    gradient: "linear-gradient(135deg, #6b7280, #374151)",
    accent: "#cbd5e1",
  },
  detective: {
    gradient: "linear-gradient(135deg, #52525b, #27272a)",
    accent: "#d1d5db",
  },
};

export function renderHome() {
  const $app = document.querySelector("#app");
  $app.className = "view-home";

  $app.innerHTML = `
  <div class="home-hero">
  <h1 class="home-hero__title">⚡ Despertá tu chat legendario</h1>
  <p class="home-hero__subtitle">
    Elegí entre 3 personajes únicos y comenzá conversaciones llenas de humor, personalidad y respuestas inesperadas.
  </p>
</div>

<section class="home-section home-features">
  <h2 class="home-section-title">¿Qué podés hacer?</h2>
  <div class="home-feature-cards">
    <article class="home-feature-card">
      <h3>🗣️ Chatear con personajes icónicos</h3>
      <p>Seleccioná tu personaje favorito y empezá una charla personalizada con su estilo, tono y personalidad propia.</p>
    </article>

    <article class="home-feature-card">
      <h3>✨ Vivir experiencias distintas</h3>
      <p>Cada personaje responde de manera diferente, así que cada conversación se siente única, divertida y dinámica.</p>
    </article>

    <article class="home-feature-card">
      <h3>🚀 Interactuar al instante</h3>
      <p>Elegí un personaje, escribí tu mensaje y empezá a conversar de forma rápida, simple y segura.</p>
    </article>
  </div>
</section>

<section class="home-section home-character-section">
  <h2 class="home-section-title">Elegí tu personaje</h2>
  <p class="home-section-description">
    Explorá los 3 personajes disponibles y descubrí con cuál querés empezar tu próxima aventura conversacional.
  </p>
  <div class="home-cards">
    ${CHARACTER_KEYS.map((key) => renderCard(key)).join("")}
  </div>
</section>

<section class="home-section home-about">
  <h2 class="home-section-title">Sobre la experiencia</h2>
  <p class="home-section-description">
    Esta aplicación te permite chatear con personajes de forma segura, usando una interfaz pensada para que la experiencia sea rápida, atractiva y fácil de usar.
  </p>
  <p class="home-section-description">
    Podés explorar distintos estilos de conversación, descubrir respuestas creativas y disfrutar de una experiencia interactiva diseñada para fanáticos de los personajes y la tecnología.
  </p>
</section>
  `;

  document.querySelectorAll(".home-card").forEach((card) => {
    card.addEventListener("click", () => {
      const key = card.dataset.character;
      navigateTo(`/chat/${key}`);
    });
  });
}

function renderCard(key) {
  const char = getCharacter(key);
  const theme = THEMES[key];

  return `
    <div class="home-card" data-character="${key}" style="--card-gradient: ${theme.gradient}; --card-accent: ${theme.accent}">
      <div class="home-card__header">
        <span class="home-card__avatar">${char.avatar}</span>
        <h2 class="home-card__name">${char.name}</h2>
      </div>
      <p class="home-card__desc">${char.system.slice(0, 120)}...</p>
      <div class="home-card__action-wrap">
        <button class="home-card__button" type="button">Chatear</button>
      </div>
    </div>
  `;
}
