import { getProjectById } from "./dataService.js";

function normalizeExternalUrl(url) {
  const raw = String(url || "").trim();
  if (!raw || raw === "#") return "";

  const hasScheme = /^[a-zA-Z][a-zA-Z\d+\-.]*:/.test(raw);
  const candidate = hasScheme ? raw : `https://${raw}`;

  try {
    const parsed = new URL(candidate);
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") return "";
    return parsed.toString();
  } catch (_error) {
    return "";
  }
}

function applyExternalLink(anchor, url) {
  if (!anchor) return;
  const normalized = normalizeExternalUrl(url);
  if (!normalized) {
    anchor.href = "#";
    anchor.removeAttribute("target");
    return;
  }

  anchor.href = normalized;
  anchor.target = "_blank";
}

function getIdFromQuery() {
  const params = new URLSearchParams(window.location.search);
  return Number(params.get("id") || 0);
}

function setupSlider(images) {
  const track = document.getElementById("sliderTrack");
  const prev = document.getElementById("prevSlide");
  const next = document.getElementById("nextSlide");

  track.replaceChildren();
  images.forEach((image, index) => {
    const img = document.createElement("img");
    img.src = image;
    img.alt = `Project screenshot ${index + 1}`;
    img.loading = index === 0 ? "eager" : "lazy";
    img.decoding = "async";
    track.appendChild(img);
  });

  if (!images.length) {
    const img = document.createElement("img");
    img.src = "assets/images/project-placeholder.svg";
    img.alt = "Project screenshot";
    img.decoding = "async";
    track.appendChild(img);
  }

  let current = 0;

  function update() {
    track.style.transform = `translateX(-${current * 100}%)`;
  }

  prev.addEventListener("click", () => {
    current = current <= 0 ? images.length - 1 : current - 1;
    update();
  });

  next.addEventListener("click", () => {
    current = current >= images.length - 1 ? 0 : current + 1;
    update();
  });

  let touchStartX = 0;
  let touchEndX = 0;

  track.addEventListener(
    "touchstart",
    (event) => {
    touchStartX = event.changedTouches[0].screenX;
    },
    { passive: true }
  );

  track.addEventListener(
    "touchend",
    (event) => {
    touchEndX = event.changedTouches[0].screenX;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) < 30) return;

    if (diff > 0) {
      current = current >= images.length - 1 ? 0 : current + 1;
    } else {
      current = current <= 0 ? images.length - 1 : current - 1;
    }

    update();
    },
    { passive: true }
  );
}

function renderNotFound() {
  document.getElementById("projectTitle").textContent = "Project not found";
  document.getElementById("projectSummary").textContent = "The selected project does not exist.";
  document.getElementById("projectDescription").textContent = "Please go back to the projects page and choose another item.";
}

async function init() {
  const id = getIdFromQuery();
  if (!id) {
    renderNotFound();
    return;
  }

  const project = await getProjectById(id);
  if (!project) {
    renderNotFound();
    return;
  }

  document.title = `${project.title} | Project Details`;
  document.getElementById("projectTitle").textContent = project.title;
  document.getElementById("projectSummary").textContent = project.summary || "";
  document.getElementById("projectDescription").textContent = project.description || "No description available.";

  const techWrap = document.getElementById("projectTech");
  techWrap.replaceChildren();
  (project.tech_stack || []).forEach((tech) => {
    const badge = document.createElement("span");
    badge.className = "badge";
    badge.textContent = tech;
    techWrap.appendChild(badge);
  });

  const liveDemo = document.getElementById("liveDemo");
  const githubRepo = document.getElementById("githubRepo");
  applyExternalLink(liveDemo, project.live_url);
  applyExternalLink(githubRepo, project.github_url);

  setupSlider(project.images || []);
}

init();
