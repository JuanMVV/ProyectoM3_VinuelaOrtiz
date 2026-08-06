import { renderHome } from "./views/home.js";
import { renderChat } from "./views/chat.js";
import { renderAbout } from "./views/about.js";
import { renderNotFound } from "./views/notFound.js";

const routes = [
  { pattern: /^\/$/, render: renderHome },
  { pattern: /^\/home$/, render: renderHome },
  { pattern: /^\/chat(?:\/(\w+))?$/, render: renderChat },
  { pattern: /^\/about$/, render: renderAbout },
];

export function router() {
  const path = window.location.pathname;

  for (const route of routes) {
    const match = path.match(route.pattern);
    if (match) {
      route.render(match[1] || null);
      updateActiveLink();
      return;
    }
  }

  renderNotFound();
  updateActiveLink();
}

export function navigateTo(path) {
  if (window.location.pathname === path) return;
  history.pushState(null, "", path);
  router();
}

function updateActiveLink() {
  const current = window.location.pathname;
  const isHomeRoute = current === "/" || current === "/home";
  const isChatRoute = current === "/chat" || current.startsWith("/chat/");

  document.querySelectorAll(".navbar__links a").forEach((link) => {
    const href = link.getAttribute("href");
    if (!href || href.startsWith("http")) return;

    const isHomeLink = href === "/" || href === "/home";
    const isChatLink = href === "/chat";
    const isActive = isHomeLink
      ? isHomeRoute
      : isChatLink
        ? isChatRoute
        : href === current;
    link.classList.toggle("active", isActive);
  });
}
