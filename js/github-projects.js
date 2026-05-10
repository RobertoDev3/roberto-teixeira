const GITHUB_USERNAME = "RobertoDev3";
const FEATURED_PROJECTS = [];

const featuredContainer = document.querySelector("#featuredProjects");
const allProjectsContainer = document.querySelector("#allProjects");

function formatDate(dateValue) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  }).format(new Date(dateValue));
}

function sortProjects(projects) {
  return [...projects].sort((projectA, projectB) => {
    return new Date(projectB.pushed_at) - new Date(projectA.pushed_at);
  });
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function getFeaturedProjects(projects) {
  const orderedProjects = sortProjects(projects);

  if (!FEATURED_PROJECTS.length) {
    return orderedProjects.slice(0, 3);
  }

  return FEATURED_PROJECTS
    .map((projectName) => orderedProjects.find((project) => project.name === projectName))
    .filter(Boolean)
    .slice(0, 3);
}

function createProjectCard(project) {
  const name = escapeHtml(project.name);
  const description = escapeHtml(project.description || "Projeto público disponível no GitHub.");
  const language = escapeHtml(project.language || "Código");
  const repositoryUrl = escapeHtml(project.html_url);
  const homepageLink = project.homepage
    ? `<a href="${escapeHtml(project.homepage)}" target="_blank" rel="noopener noreferrer">Ver site</a>`
    : "";

  return `
    <article class="project-card github-card">
      <div class="project-card-body">
        <div class="project-meta">
          <span>${language}</span>
          <span>Atualizado em ${formatDate(project.pushed_at)}</span>
        </div>
        <h3>${name}</h3>
        <p>${description}</p>
      </div>
      <div class="project-links">
        <a href="${repositoryUrl}" target="_blank" rel="noopener noreferrer">Ver repositório</a>
        ${homepageLink}
      </div>
    </article>
  `;
}

function showStatus(container, message) {
  if (!container) return;
  container.innerHTML = `<p class="project-status">${message}</p>`;
}

function renderProjects(container, projects, emptyMessage) {
  if (!container) return;

  if (!projects.length) {
    showStatus(container, emptyMessage);
    return;
  }

  container.innerHTML = projects.map(createProjectCard).join("");
}

async function loadGithubProjects() {
  if (!featuredContainer && !allProjectsContainer) return;

  try {
    const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`, {
      headers: {
        Accept: "application/vnd.github+json"
      }
    });

    if (!response.ok) {
      throw new Error("Não foi possível carregar os projetos.");
    }

    const repositories = await response.json();
    const publicProjects = repositories.filter((project) => !project.fork);
    const projects = publicProjects.length ? publicProjects : repositories;

    renderProjects(
      featuredContainer,
      getFeaturedProjects(projects),
      "Nenhum projeto encontrado para destacar."
    );

    renderProjects(
      allProjectsContainer,
      sortProjects(projects),
      "Nenhum projeto público encontrado."
    );
  } catch (error) {
    showStatus(featuredContainer, "Não foi possível carregar os projetos agora. Acesse meu GitHub pelo botão Ver todos.");
    showStatus(allProjectsContainer, "Não foi possível carregar a lista de projetos. Tente novamente em instantes.");
  }
}

loadGithubProjects();
