const menuToggle = document.querySelector(".menu-toggle");
const menu = document.querySelector("#menu");
const themeToggle = document.querySelector(".theme-toggle");
const navLinks = document.querySelectorAll(".menu a");
const form = document.querySelector("#contactForm");
const feedback = document.querySelector("#formFeedback");
let feedbackTimeout;

const savedTheme = localStorage.getItem("portfolio-theme");

if (savedTheme === "dark") {
  document.body.classList.add("dark-theme");
}

function updateThemeButtonLabel() {
  if (!themeToggle) return;

  const isDark = document.body.classList.contains("dark-theme");
  themeToggle.setAttribute("aria-label", isDark ? "Mudar para tema claro" : "Mudar para tema escuro");
  themeToggle.dataset.tooltip = isDark ? "Mudar para tema claro" : "Mudar para tema escuro";
}

updateThemeButtonLabel();

if (menuToggle && menu) {
  menuToggle.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (!menu || !menuToggle) return;

    menu.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");
    const theme = document.body.classList.contains("dark-theme") ? "dark" : "light";
    localStorage.setItem("portfolio-theme", theme);
    updateThemeButtonLabel();
  });
}

// Destaca no menu a seção que está aparecendo na tela.
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      navLinks.forEach((link) => {
        const isCurrent = link.getAttribute("href") === `#${entry.target.id}`;
        link.classList.toggle("active", isCurrent);
      });
    });
  },
  { rootMargin: "-35% 0px -55% 0px" }
);

document.querySelectorAll("main section[id]").forEach((section) => observer.observe(section));

function setError(fieldId, message) {
  document.querySelector(`#${fieldId}Error`).textContent = message;
}

function clearErrors() {
  ["nome", "email", "mensagem"].forEach((field) => setError(field, ""));
  clearTimeout(feedbackTimeout);
  feedback.textContent = "";
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
}

if (form && feedback) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    clearErrors();

    const nome = form.nome.value.trim();
    const email = form.email.value.trim();
    const mensagem = form.mensagem.value.trim();
    let valid = true;

    if (!nome) {
      setError("nome", "Informe seu nome.");
      valid = false;
    }

    if (!email) {
      setError("email", "Informe seu e-mail.");
      valid = false;
    } else if (!isValidEmail(email)) {
      setError("email", "Digite um e-mail válido.");
      valid = false;
    }

    if (!mensagem) {
      setError("mensagem", "Escreva uma mensagem.");
      valid = false;
    }

    if (!valid) {
      feedback.textContent = "Revise os campos destacados antes de enviar.";
      return;
    }

    form.reset();
    feedback.textContent = "Mensagem enviada com sucesso!";
    feedbackTimeout = setTimeout(() => {
      feedback.textContent = "";
    }, 4000);
  });
}
