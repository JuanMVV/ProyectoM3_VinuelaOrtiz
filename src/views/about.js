export function renderAbout() {
  const $app = document.querySelector("#app");
  $app.className = "view-about";

  $app.innerHTML = `
    <div class="about">
      <h1 class="about__title">Sobre este Proyecto</h1>
      <p class="about__desc">
        Este SPA te invita a interactuar con tres personajes impulsados por IA. 
        Cada uno tiene su propia identidad, estilo y forma de responder para que vivas una experiencia más dinámica e inmersiva.
      </p>

      <div class="about__features">
  <div class="about__feature">
    <span class="about__feature-icon">🧩</span>
    <span>Interfaz construida con JavaScript puro</span>
  </div>

  <div class="about__feature">
    <span class="about__feature-icon">🛡️</span>
    <span>Las credenciales permanecen fuera del frontend</span>
  </div>

  <div class="about__feature">
    <span class="about__feature-icon">🧠</span>
    <span>Tres identidades, tres formas de conversar</span>
  </div>

  <div class="about__feature">
    <span class="about__feature-icon">🚀</span>
    <span>Respuestas procesadas mediante una función serverless</span>
  </div>
</div>
      <a href="/" class="about__back">← Volver al inicio</a>
    </div>
  `;
}
