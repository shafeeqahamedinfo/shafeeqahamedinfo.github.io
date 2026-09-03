window.renderSkills = function (skills) {
  const grid = document.getElementById("skillsGrid");
  if (!grid || !Array.isArray(skills)) return;

  if (!skills.length) return;

  const getIconClass = function (title) {
    const t = String(title || "").toLowerCase();
    if (t.includes("html")) return "fa-brands fa-html5";
    if (t.includes("css")) return "fa-brands fa-css3-alt";
    if (t.includes("javascript") || t.includes("js")) return "fa-brands fa-js";
    if (t.includes("github") || t.includes("git")) return "fa-brands fa-github";
    if (t.includes("python")) return "fa-brands fa-python";
    if (t.includes("bootstrap")) return "fa-brands fa-bootstrap";
    if (t.includes("php")) return "fa-brands fa-php";
    if (t.includes("mysql")) return "fa-solid fa-server";
    if (t.includes("sql")) return "fa-solid fa-database";
    return "fa-solid fa-code";
  };

  grid.replaceChildren();

  const fragment = document.createDocumentFragment();
  skills.forEach((skill) => {
    const card = document.createElement("article");
    card.className = "card skill-card";

    const topRow = document.createElement("div");
    topRow.className = "skill-card-top";

    const iconClass = skill.icon || getIconClass(skill.title || skill.name);
    const iconContainer = document.createElement("div");
    iconContainer.className = "skill-icon";
    const iconEl = document.createElement("i");
    iconEl.className = iconClass;
    iconContainer.appendChild(iconEl);
    topRow.appendChild(iconContainer);

    const metaBox = document.createElement("div");
    metaBox.className = "skill-meta";

    const title = document.createElement("h3");
    title.textContent = skill.title || skill.name || "Untitled skill";
    metaBox.appendChild(title);

    if (skill.knowledge_percent !== undefined && skill.knowledge_percent !== null) {
      const pct = Math.min(100, Math.max(0, Number(skill.knowledge_percent)));
      const badge = document.createElement("span");
      badge.className = "skill-badge";
      badge.textContent = `${pct}%`;
      metaBox.appendChild(badge);
    }

    topRow.appendChild(metaBox);
    card.appendChild(topRow);

    if (skill.knowledge_percent !== undefined && skill.knowledge_percent !== null) {
      const pct = Math.min(100, Math.max(0, Number(skill.knowledge_percent)));
      const progressWrapper = document.createElement("div");
      progressWrapper.className = "skill-progress";

      const progress = document.createElement("div");
      progress.className = "skill-progress__bar";
      progress.style.setProperty("--fill", `${pct}%`);

      progressWrapper.appendChild(progress);
      card.appendChild(progressWrapper);
    }

    fragment.appendChild(card);
  });

  grid.appendChild(fragment);
};
