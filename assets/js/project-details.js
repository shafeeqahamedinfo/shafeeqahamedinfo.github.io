(function () {
  const getProjectById = window.PortfolioData ? window.PortfolioData.getProjectById : async () => null;

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

    if (!track) return;

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

    if (prev) {
      prev.addEventListener("click", () => {
        current = current <= 0 ? images.length - 1 : current - 1;
        update();
      });
    }

    if (next) {
      next.addEventListener("click", () => {
        current = current >= images.length - 1 ? 0 : current + 1;
        update();
      });
    }
  }

  function renderNotFound() {
    const titleEl = document.getElementById("projectTitle");
    if (titleEl) titleEl.textContent = "Project not found";
    const sumEl = document.getElementById("projectSummary");
    if (sumEl) sumEl.textContent = "The selected project does not exist.";
    const descEl = document.getElementById("projectDescription");
    if (descEl) descEl.textContent = "Please go back to the projects page and choose another item.";
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
    const titleEl = document.getElementById("projectTitle");
    if (titleEl) titleEl.textContent = project.title;
    const sumEl = document.getElementById("projectSummary");
    if (sumEl) sumEl.textContent = project.summary || "";
    const descEl = document.getElementById("projectDescription");
    if (descEl) descEl.textContent = project.description || "No description available.";

    const techWrap = document.getElementById("projectTech");
    if (techWrap) {
      techWrap.replaceChildren();
      (project.tech_stack || []).forEach((tech) => {
        const badge = document.createElement("span");
        badge.className = "badge";
        badge.textContent = tech;
        techWrap.appendChild(badge);
      });
    }

    const liveDemo = document.getElementById("liveDemo");
    const githubRepo = document.getElementById("githubRepo");
    applyExternalLink(liveDemo, project.live_url);
    applyExternalLink(githubRepo, project.github_url);

    setupSlider(project.images || []);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
