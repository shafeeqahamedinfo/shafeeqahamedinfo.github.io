export function renderSkills(skills) {
  const grid = document.getElementById("skillsGrid");
  if (!grid) return;
  grid.replaceChildren();

  if (!skills.length) {
    const empty = document.createElement("div");
    empty.className = "empty";
    empty.textContent = "No skills available yet.";
    grid.appendChild(empty);
    return;
  }

  const fragment = document.createDocumentFragment();
  skills.forEach((skill) => {
    const card = document.createElement("article");
    card.className = "card skill-card";

    const title = document.createElement("h3");
    title.textContent = skill.title || "Untitled skill";
    card.appendChild(title);

    if (skill.knowledge_percent !== undefined && skill.knowledge_percent !== null) {
      const progressWrapper = document.createElement("div");
      progressWrapper.className = "skill-progress";

      const progress = document.createElement("div");
      progress.className = "skill-progress__bar";
      progress.style.setProperty("--fill", `${Math.min(100, Math.max(0, Number(skill.knowledge_percent)))}%`);

      const label = document.createElement("small");
      label.textContent = `${Math.min(100, Math.max(0, Number(skill.knowledge_percent)))}%`;

      progressWrapper.appendChild(progress);
      progressWrapper.appendChild(label);
      card.appendChild(progressWrapper);
    }

    fragment.appendChild(card);
  });

  grid.appendChild(fragment);
}
