import { getPortfolioData, getSkillById } from "./dataService.js";

function parseRelatedProjectSelectors(value) {
  if (Array.isArray(value)) {
    const rawTokens = value.map((entry) => String(entry ?? "").trim()).filter(Boolean);

    const numericIds = rawTokens
      .map((entry) => Number(entry))
      .filter((entry) => Number.isFinite(entry));

    const idStrings = rawTokens
      .map((entry) => {
        const num = Number(entry);
        return Number.isFinite(num) ? String(Math.trunc(num)) : "";
      })
      .filter(Boolean);

    const titleTokens = rawTokens
      .filter((entry) => !Number.isFinite(Number(entry)))
      .map((entry) => entry.toLowerCase());

    return { numericIds, idStrings, titleTokens, rawTokens };
  }

  const raw = String(value || "").trim();
  if (!raw) return { numericIds: [], idStrings: [], titleTokens: [], rawTokens: [] };

  // Supports: "1,2", "1, 2", and Postgres array-ish "{1,2}".
  const normalized = raw.replace(/^\{/, "").replace(/\}$/, "");
  const rawTokens = normalized
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean);

  const numericIds = rawTokens
    .map((part) => Number(part))
    .filter((entry) => Number.isFinite(entry));

  const idStrings = numericIds.map((entry) => String(Math.trunc(entry)));

  const titleTokens = rawTokens
    .filter((part) => !Number.isFinite(Number(part)))
    .map((part) => part.toLowerCase());

  return { numericIds, idStrings, titleTokens, rawTokens };
}

function extractIdFromToken(token) {
  const raw = String(token || "").trim();
  if (!raw) return "";

  // If user pasted a link like "project.html?id=3".
  const match = raw.match(/[?&]id=(\d+)/i);
  if (match?.[1]) return match[1];

  // If token is just a number string.
  const n = Number(raw);
  if (Number.isFinite(n)) return String(Math.trunc(n));

  return "";
}

function titleMatchesToken(titleLower, tokenLower) {
  if (!titleLower || !tokenLower) return false;
  if (titleLower === tokenLower) return true;
  // Allow partial match to reduce input friction.
  return titleLower.includes(tokenLower) || tokenLower.includes(titleLower);
}

function getIdFromQuery() {
  const params = new URLSearchParams(window.location.search);
  return Number(params.get("id") || 0);
}

function renderNotFound() {
  document.getElementById("skillTitle").textContent = "Skill not found";
  document.getElementById("skillPercent").textContent = "Knowledge: 0%";

  const summary = document.getElementById("skillSummaryText");
  if (summary) summary.textContent = "This skill was not found.";

  const details = document.getElementById("skillDetailsText");
  if (details) details.textContent = "Please go back and select another skill.";

  const tools = document.getElementById("skillTools");
  if (tools) tools.replaceChildren();

  const related = document.getElementById("relatedProjects");
  if (related) related.replaceChildren();

  const header = document.querySelector(".page-header");
  if (!header) return;

  let hint = document.getElementById("skillNotFoundHint");
  if (!hint) {
    hint = document.createElement("p");
    hint.id = "skillNotFoundHint";
    hint.className = "section-intro";
    header.appendChild(hint);
  }
  hint.textContent = "This skill was not found (or you have no skills yet). Go back and pick another one.";
}

async function init() {
  const id = getIdFromQuery();
  if (!id) {
    renderNotFound();
    return;
  }

  const skill = await getSkillById(id);
  if (!skill) {
    renderNotFound();
    return;
  }

  document.title = `${skill.title} | Skill Details`;
  document.getElementById("skillTitle").textContent = skill.title;

  const percentRaw = Number(skill.knowledge_percent);
  const percent = Number.isFinite(percentRaw) ? Math.min(100, Math.max(0, Math.round(percentRaw))) : 0;
  document.getElementById("skillPercent").textContent = `Knowledge: ${percent}%`;

  const skillImage = document.getElementById("skillImage");
  if (skillImage) {
    skillImage.src = skill.image_url || "assets/images/project-placeholder.svg";
    skillImage.decoding = "async";
  }

  const summary = document.getElementById("skillSummaryText");
  if (summary) summary.textContent = skill.summary || "-";

  const details = document.getElementById("skillDetailsText");
  if (details) details.textContent = skill.details || "-";

  const toolsWrap = document.getElementById("skillTools");
  if (toolsWrap) {
    toolsWrap.replaceChildren();
    const tools = Array.isArray(skill.tools) ? skill.tools : [];
    if (!tools.length) {
      const empty = document.createElement("span");
      empty.className = "badge";
      empty.textContent = "No tools listed";
      toolsWrap.appendChild(empty);
    } else {
      tools.forEach((tool) => {
        const badge = document.createElement("span");
        badge.className = "badge";
        badge.textContent = String(tool || "").trim();
        if (badge.textContent) toolsWrap.appendChild(badge);
      });
    }
  }

  const relatedWrap = document.getElementById("relatedProjects");
  if (relatedWrap) {
    relatedWrap.replaceChildren();
    const data = await getPortfolioData();
    const allProjects = Array.isArray(data.projects) ? data.projects : [];
    const selectors = parseRelatedProjectSelectors(skill.project_ids);

    const inferredIdsFromTokens = selectors.titleTokens
      .map(extractIdFromToken)
      .filter(Boolean);
    const idStrings = new Set([...(selectors.idStrings || []), ...inferredIdsFromTokens]);

    const related = allProjects.filter((project) => {
      const projectId = Number(project.id);
      const projectIdString = String(project.id ?? "").trim();
      if (Number.isFinite(projectId) && (selectors.numericIds || []).includes(projectId)) return true;
      if (projectIdString && idStrings.has(projectIdString)) return true;

      const title = String(project.title || "").trim().toLowerCase();
      if (title) {
        for (const token of selectors.titleTokens || []) {
          if (titleMatchesToken(title, token)) return true;
        }
      }
      return false;
    });

    if (!related.length) {
      const hasSelectors =
        (selectors.numericIds || []).length > 0 ||
        (selectors.titleTokens || []).length > 0 ||
        (selectors.rawTokens || []).length > 0;
      const p = document.createElement("p");
      p.className = "section-intro";
      p.textContent = hasSelectors
        ? "No related projects found. Check the Project IDs (or exact project titles) you entered in Admin → Skills."
        : "No related projects.";
      relatedWrap.appendChild(p);

      if (hasSelectors && allProjects.length) {
        const hint = document.createElement("p");
        hint.className = "section-intro";
        hint.textContent = `Available projects: ${allProjects
          .slice(0, 8)
          .map((project) => `${project.id}=${project.title || "(untitled)"}`)
          .join(" | ")}`;
        relatedWrap.appendChild(hint);
      }
    } else {
      related.forEach((project) => {
        const link = document.createElement("a");
        link.className = "btn btn-secondary";
        link.href = `project.html?id=${project.id}`;
        link.textContent = project.title || "Open project";
        relatedWrap.appendChild(link);
      });
    }
  }
}

init();
