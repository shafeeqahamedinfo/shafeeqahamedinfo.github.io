import { getPortfolioData, saveContactMessage } from "./dataService.js";

function getEl(id) {
  return document.getElementById(id);
}

function normalizeExternalUrl(url) {
  const value = String(url || "").trim();
  if (!value) return "";
  if (/^https?:\/\//i.test(value)) return value;
  return `https://${value}`;
}

function firstImageUrl(value, fallback) {
  if (Array.isArray(value)) {
    const first = value.find((item) => String(item || "").trim());
    return first ? String(first).trim() : fallback;
  }

  if (typeof value === "string") {
    const cleaned = value.trim();
    if (!cleaned) return fallback;

    if (cleaned.startsWith("[") && cleaned.endsWith("]")) {
      try {
        const parsed = JSON.parse(cleaned);
        if (Array.isArray(parsed)) {
          const first = parsed.find((item) => String(item || "").trim());
          return first ? String(first).trim() : fallback;
        }
      } catch (_error) {
        // Fall through to CSV parsing.
      }
    }

    const csvFirst = cleaned.split(",").map((item) => item.trim()).find(Boolean);
    return csvFirst || fallback;
  }

  return fallback;
}

function setupRevealAnimations() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
}

function renderHome(settings) {
  const heroNameEl = getEl("heroName");
  if (heroNameEl) {
    const name = typeof settings.name === "string" ? settings.name.trim() : "";
    heroNameEl.innerHTML = name
      ? `Hi, I am <span>${name}</span>`
      : "Hi, I am";
  }

  const heroIntroEl = getEl("heroIntro");
  if (heroIntroEl) heroIntroEl.textContent = settings.intro || "";

  const aboutTextEl = getEl("aboutText");
  if (aboutTextEl) aboutTextEl.textContent = settings.about || "";

  const contactEmailEl = getEl("contactEmail");
  if (contactEmailEl) contactEmailEl.textContent = settings.email || "";

  const contactPhoneEl = getEl("contactPhone");
  if (contactPhoneEl) contactPhoneEl.textContent = settings.phone || "";

  const contactLocationEl = getEl("contactLocation");
  if (contactLocationEl) contactLocationEl.textContent = settings.location || "";

  const profileImage = firstImageUrl(settings.profile_image, "assets/images/profile-placeholder.svg");
  const heroImageEl = getEl("profileImageHero");
  if (heroImageEl) heroImageEl.src = profileImage;
  const aboutImageEl = getEl("profileImageAbout");
  if (aboutImageEl) aboutImageEl.src = profileImage;

  const socialContainers = Array.from(
    document.querySelectorAll("#socialLinks, #socialLinksContact")
  ).filter(Boolean);

  const socialLinks = [
    { name: "Instagram", url: settings.instagram_url },
    { name: "GitHub", url: settings.github_url },
    { name: "LinkedIn", url: settings.linkedin_url }
  ]
    .map((item) => {
      const url = normalizeExternalUrl(item.url);
      if (!url) return null;
      const link = document.createElement("a");
      link.href = url;
      link.textContent = item.name;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      return link;
    })
    .filter(Boolean);

  socialContainers.forEach((container) => {
    container.replaceChildren(...socialLinks.map((link) => link.cloneNode(true)));
  });
}

function renderEducation(education) {
  const timeline = getEl("educationTimeline");
  if (!timeline) return;
  timeline.replaceChildren();

  if (!education.length) {
    const li = document.createElement("li");
    const strong = document.createElement("strong");
    strong.textContent = "Add your education timeline from Admin panel.";
    li.appendChild(strong);
    timeline.appendChild(li);
    return;
  }

  const fragment = document.createDocumentFragment();
  education.forEach((entry) => {
    const li = document.createElement("li");
    const imageUrl = firstImageUrl(entry.image_url, "");

    if (imageUrl) {
      const img = document.createElement("img");
      img.className = "timeline-image";
      img.src = imageUrl;
      img.loading = "lazy";
      img.decoding = "async";
      img.alt = entry.institution || "Education";
      li.appendChild(img);
    }

    const strong = document.createElement("strong");
    strong.textContent = entry.degree || "";
    li.appendChild(strong);
    li.appendChild(document.createTextNode(entry.institution || ""));
    li.appendChild(document.createElement("br"));
    li.appendChild(
      document.createTextNode(
        `${entry.year_start || ""} - ${entry.year_end || "Present"}`
      )
    );

    fragment.appendChild(li);
  });
  timeline.appendChild(fragment);
}

function renderExperience(experience) {
  const timeline = getEl("experienceTimeline");
  if (!timeline) return;

  timeline.replaceChildren();

  if (!experience.length) {
    const li = document.createElement("li");
    const strong = document.createElement("strong");
    strong.textContent = "no experience yet";
    li.appendChild(strong);
    timeline.appendChild(li);
    return;
  }

  const fragment = document.createDocumentFragment();
  experience.forEach((entry) => {
    const li = document.createElement("li");
    const logoUrl = firstImageUrl(entry.logo_url, "");

    if (logoUrl) {
      const img = document.createElement("img");
      img.className = "timeline-image";
      img.src = logoUrl;
      img.loading = "lazy";
      img.decoding = "async";
      img.alt = entry.company || "Experience";
      li.appendChild(img);
    }

    const strong = document.createElement("strong");
    strong.textContent = entry.role || "";
    li.appendChild(strong);

    const company = document.createElement("div");
    const companyText = [entry.company, entry.location].filter(Boolean).join(" • ");
    company.textContent = companyText;
    li.appendChild(company);

    const years = document.createElement("div");
    const start = entry.year_start ?? "";
    const end = entry.year_end ?? "Present";
    years.textContent = `${start} - ${end}`;
    li.appendChild(years);

    const description = String(entry.description || "").trim();
    if (description) {
      const p = document.createElement("p");
      p.className = "section-intro";
      p.textContent = description;
      li.appendChild(p);
    }

    fragment.appendChild(li);
  });

  timeline.appendChild(fragment);
}

function renderSkills(skills) {
  const grid = getEl("skillsGrid");
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
    const card = document.createElement("a");
    card.href = `skill.html?id=${skill.id}`;
    card.className = "card";

    const percent = Number.isFinite(Number(skill.knowledge_percent))
      ? Math.min(100, Math.max(0, Math.round(Number(skill.knowledge_percent))))
      : 0;

    const title = document.createElement("h3");
    title.textContent = skill.title || "";
    const small = document.createElement("small");
    small.textContent = `Knowledge: ${percent}%`;
    card.appendChild(title);
    card.appendChild(small);

    fragment.appendChild(card);
  });

  grid.appendChild(fragment);
}

function renderProjects(projects) {
  const grid = getEl("projectsGrid");
  if (!grid) return;
  grid.replaceChildren();

  if (!projects.length) {
    const empty = document.createElement("div");
    empty.className = "empty";
    empty.textContent = "No projects available yet.";
    grid.appendChild(empty);
    return;
  }

  const fragment = document.createDocumentFragment();
  projects.forEach((project) => {
    const imageUrl = firstImageUrl(project.images, "assets/images/project-placeholder.svg");
    const card = document.createElement("a");
    card.href = `project.html?id=${project.id}`;
    card.className = "card";

    const img = document.createElement("img");
    img.src = imageUrl;
    img.loading = "lazy";
    img.decoding = "async";
    img.alt = project.title || "Project";

    const title = document.createElement("h3");
    title.textContent = project.title || "";

    const summary = document.createElement("p");
    summary.textContent = project.summary || "";

    const small = document.createElement("small");
    small.textContent = "Open project details";

    card.appendChild(img);
    card.appendChild(title);
    card.appendChild(summary);
    card.appendChild(small);

    fragment.appendChild(card);
  });

  grid.appendChild(fragment);
}

function renderCertificates(certificates) {
  const grid = getEl("certificatesGrid");
  if (!grid) return;
  grid.replaceChildren();

  if (!certificates.length) {
    const empty = document.createElement("div");
    empty.className = "empty";
    empty.textContent = "No certificates available yet.";
    grid.appendChild(empty);
    return;
  }

  const fragment = document.createDocumentFragment();
  certificates.forEach((certificate) => {
    const imageUrl = firstImageUrl(certificate.image_url, "assets/images/certificate-placeholder.svg");
    const card = document.createElement("a");
    card.href = `certificate.html?id=${certificate.id}`;
    card.className = "card";

    const img = document.createElement("img");
    img.src = imageUrl;
    img.loading = "lazy";
    img.decoding = "async";
    img.alt = certificate.title || "Certificate";

    const title = document.createElement("h3");
    title.textContent = certificate.title || "";

    const summary = document.createElement("p");
    summary.textContent = certificate.summary || "";

    const small = document.createElement("small");
    small.textContent = "Open certificate details";

    card.appendChild(img);
    card.appendChild(title);
    card.appendChild(summary);
    card.appendChild(small);

    fragment.appendChild(card);
  });

  grid.appendChild(fragment);
}

function setupContactForm() {
  const form = document.getElementById("contactForm");
  const status = document.getElementById("formStatus");

  if (!form || !status) return;

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const payload = {
      name: String(formData.get("name") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      phone: String(formData.get("phone") || "").trim(),
      subject: String(formData.get("subject") || "").trim(),
      message: String(formData.get("message") || "").trim()
    };

    const hasEmpty = Object.values(payload).some((value) => !value);
    if (hasEmpty) {
      status.textContent = "Please fill all fields before submitting.";
      return;
    }

    status.textContent = "Submitting your message...";
    const result = await saveContactMessage(payload);

    if (!result.success) {
      status.textContent = `Could not submit message: ${result.error || "unknown error"}`;
      return;
    }

    form.reset();
    status.textContent = result.offline
      ? "Message saved locally (configure Supabase to store online)."
      : "Message sent successfully.";
  });
}

async function init() {
  setupRevealAnimations();
  setupContactForm();

  const data = await getPortfolioData();
  renderHome(data.settings || {});
  renderEducation(data.education || []);
  renderExperience(data.experience || []);

  const renderRest = () => {
    renderSkills(data.skills || []);
    renderProjects(data.projects || []);
    renderCertificates(data.certificates || []);
  };

  if ("requestIdleCallback" in window) {
    requestIdleCallback(renderRest, { timeout: 1500 });
  } else {
    setTimeout(renderRest, 0);
  }
}

init();

window.addEventListener("portfolio:data-updated", (event) => {
  const data = event?.detail;
  if (!data) return;
  renderHome(data.settings || {});
  renderEducation(data.education || []);
  renderExperience(data.experience || []);

  const renderRest = () => {
    renderSkills(data.skills || []);
    renderProjects(data.projects || []);
    renderCertificates(data.certificates || []);
  };

  if ("requestIdleCallback" in window) {
    requestIdleCallback(renderRest, { timeout: 1500 });
  } else {
    setTimeout(renderRest, 0);
  }
});
