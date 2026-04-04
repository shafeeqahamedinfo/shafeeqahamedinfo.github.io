import { IS_SUPABASE_CONFIGURED } from "./config.js";
import { getSupabaseClient } from "./supabaseClient.js";

const supabase = IS_SUPABASE_CONFIGURED ? await getSupabaseClient() : null;

const tabs = document.querySelectorAll(".tab-btn");
const panels = document.querySelectorAll("[data-panel]");

const aboutForm = document.getElementById("aboutForm");
const educationForm = document.getElementById("educationForm");
const experienceForm = document.getElementById("experienceForm");
const skillForm = document.getElementById("skillForm");
const projectForm = document.getElementById("projectForm");
const certificateForm = document.getElementById("certificateForm");

const aboutStatus = document.getElementById("aboutStatus");
const educationStatus = document.getElementById("educationStatus");
const experienceStatus = document.getElementById("experienceStatus");
const skillStatus = document.getElementById("skillStatus");
const projectStatus = document.getElementById("projectStatus");
const certificateStatus = document.getElementById("certificateStatus");

const educationTableBody = document.getElementById("educationTableBody");
const experienceTableBody = document.getElementById("experienceTableBody");
const skillsTableBody = document.getElementById("skillsTableBody");
const projectsTableBody = document.getElementById("projectsTableBody");
const certificatesTableBody = document.getElementById("certificatesTableBody");
const messagesTableBody = document.getElementById("messagesTableBody");

const uploadProjectImageBtn = document.getElementById("uploadProjectImageBtn");
const uploadCertificateImageBtn = document.getElementById("uploadCertificateImageBtn");
const uploadAboutImageBtn = document.getElementById("uploadAboutImageBtn");
const uploadEducationImageBtn = document.getElementById("uploadEducationImageBtn");
const uploadExperienceLogoBtn = document.getElementById("uploadExperienceLogoBtn");
const uploadSkillImageBtn = document.getElementById("uploadSkillImageBtn");
const removeProjectImageBtn = document.getElementById("removeProjectImageBtn");
const removeCertificateImageBtn = document.getElementById("removeCertificateImageBtn");
const removeAboutImageBtn = document.getElementById("removeAboutImageBtn");
const removeEducationImageBtn = document.getElementById("removeEducationImageBtn");
const removeExperienceLogoBtn = document.getElementById("removeExperienceLogoBtn");
const removeSkillImageBtn = document.getElementById("removeSkillImageBtn");
const projectImageUploadInput = document.getElementById("projectImageUpload");
const certificateImageUploadInput = document.getElementById("certificateImageUpload");
const aboutImageUploadInput = document.getElementById("aboutImageUpload");
const educationImageUploadInput = document.getElementById("educationImageUpload");
const experienceLogoUploadInput = document.getElementById("experienceLogoUpload");
const skillImageUploadInput = document.getElementById("skillImageUpload");
const aboutImagePreview = document.getElementById("aboutImagePreview");
const projectImagePreview = document.getElementById("projectImagePreview");
const projectImagesGallery = document.getElementById("projectImagesGallery");
const certificateImagePreview = document.getElementById("certificateImagePreview");
const educationImagePreview = document.getElementById("educationImagePreview");
const experienceLogoPreview = document.getElementById("experienceLogoPreview");
const skillImagePreview = document.getElementById("skillImagePreview");
const logoutBtn = document.getElementById("logoutBtn");
const skillProjectIdsHelp = document.getElementById("skillProjectIdsHelp");

const PORTFOLIO_CACHE_KEY = "portfolio_cache_v2";

// Debug: Log upload element availability
console.log("Upload elements check:", {
  uploadAboutImageBtn: !!uploadAboutImageBtn,
  aboutImageUploadInput: !!aboutImageUploadInput,
  uploadProjectImageBtn: !!uploadProjectImageBtn,
  projectImageUploadInput: !!projectImageUploadInput,
  uploadCertificateImageBtn: !!uploadCertificateImageBtn,
  certificateImageUploadInput: !!certificateImageUploadInput,
  uploadEducationImageBtn: !!uploadEducationImageBtn,
  educationImageUploadInput: !!educationImageUploadInput,
  uploadSkillImageBtn: !!uploadSkillImageBtn,
  skillImageUploadInput: !!skillImageUploadInput
});

let cache = {
  education: [],
  experience: [],
  skills: [],
  projects: [],
  certificates: [],
  messages: [],
  about: null
};

function syncPublicPortfolioCache() {
  if (typeof localStorage === "undefined") return;
  try {
    const data = {
      settings: cache.about || {},
      education: Array.isArray(cache.education) ? cache.education : [],
      experience: Array.isArray(cache.experience) ? cache.experience : [],
      skills: Array.isArray(cache.skills) ? cache.skills : [],
      projects: Array.isArray(cache.projects) ? cache.projects : [],
      certificates: Array.isArray(cache.certificates) ? cache.certificates : []
    };

    localStorage.setItem(
      PORTFOLIO_CACHE_KEY,
      JSON.stringify({ timestamp: Date.now(), data })
    );

    if (typeof window !== "undefined" && typeof window.dispatchEvent === "function") {
      window.dispatchEvent(new CustomEvent("portfolio:data-updated", { detail: data }));
    }
  } catch (_error) {
    // Ignore storage/serialization errors.
  }
}

function parseCSV(value) {
  return String(value || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function firstValue(value) {
  return String(value || "")
    .split(",")
    .map((item) => item.trim())
    .find(Boolean) || "";
}

function setPreview(previewEl, url, fallback) {
  if (!previewEl) return;
  const next = String(url || "").trim() || fallback;
  previewEl.src = next;
}

function getProjectImageList() {
  return parseCSV(projectForm?.elements?.images?.value || "");
}

function updateProjectImages(images) {
  projectForm.elements.images.value = images.join(", ");
  setPreview(projectImagePreview, images[0] || "", "assets/images/project-placeholder.svg");
  syncImageButtons();
}

function renderProjectImagesGallery() {
  if (!projectImagesGallery) return;

  const images = getProjectImageList();
  projectImagesGallery.innerHTML = "";

  if (!images.length) {
    projectImagesGallery.hidden = true;
    return;
  }

  projectImagesGallery.hidden = false;
  images.forEach((url, index) => {
    const item = document.createElement("div");
    item.className = "upload-gallery-item";

    const img = document.createElement("img");
    img.src = url;
    img.loading = "lazy";
    img.alt = `Project image ${index + 1}`;

    const removeBtn = document.createElement("button");
    removeBtn.type = "button";
    removeBtn.className = "upload-thumb-remove";
    removeBtn.textContent = "x";
    removeBtn.setAttribute("aria-label", `Remove project image ${index + 1}`);
    removeBtn.addEventListener("click", () => {
      const current = getProjectImageList();
      const next = current.filter((_img, idx) => idx !== index);
      updateProjectImages(next);
      setStatus(projectStatus, "Image removed from project list. Click Save Project to apply.");
    });

    item.appendChild(img);
    item.appendChild(removeBtn);
    projectImagesGallery.appendChild(item);
  });
}

function setRemoveButtonVisibility(button, hasImage) {
  if (!button) return;
  button.hidden = !hasImage;
}

function syncImageButtons() {
  setRemoveButtonVisibility(removeAboutImageBtn, !!String(aboutForm.elements.profile_image.value || "").trim());
  setRemoveButtonVisibility(removeEducationImageBtn, !!String(educationForm.elements.image_url.value || "").trim());
  if (experienceForm) {
    setRemoveButtonVisibility(removeExperienceLogoBtn, !!String(experienceForm.elements.logo_url?.value || "").trim());
  }
  setRemoveButtonVisibility(removeSkillImageBtn, !!String(skillForm.elements.image_url.value || "").trim());
  setRemoveButtonVisibility(removeProjectImageBtn, !!firstValue(projectForm.elements.images.value));
  setRemoveButtonVisibility(removeCertificateImageBtn, !!String(certificateForm.elements.image_url.value || "").trim());
  renderProjectImagesGallery();
}

function setStatus(element, text, isError = false) {
  element.textContent = text;
  element.style.color = isError ? "#b91c1c" : "#4b5563";
}

function isMissingColumnError(message, columnName) {
  const text = String(message || "").toLowerCase();
  const col = String(columnName || "").toLowerCase();
  if (!col) return false;

  return (
    (text.includes("does not exist") && text.includes(col)) ||
    (text.includes("could not find") && text.includes(col) && text.includes("schema cache"))
  );
}

async function safeSelectWithOptionalOrder(table, orderColumns) {
  const orders = Array.isArray(orderColumns) ? orderColumns : [];

  for (const order of orders) {
    const column = order?.column;
    if (!column) continue;

    const res = await supabase.from(table).select("*").order(column, {
      ascending: order.ascending !== false
    });

    if (!res.error) return res;
    if (isMissingColumnError(res.error.message, column)) {
      continue;
    }

    return res;
  }

  return supabase.from(table).select("*");
}

function switchTab(tabName) {
  tabs.forEach((tab) => tab.classList.toggle("active", tab.dataset.tab === tabName));
  panels.forEach((panel) => {
    panel.hidden = panel.dataset.panel !== tabName;
  });
}

tabs.forEach((tab) => {
  tab.addEventListener("click", () => switchTab(tab.dataset.tab));
});

async function ensureAuth() {
  if (!IS_SUPABASE_CONFIGURED || !supabase) {
    document.body.innerHTML = '<main class="auth-layout"><section class="auth-card"><h1>Supabase configuration missing</h1><p>Update assets/js/config.js with your project URL and anon key.</p></section></main>';
    return false;
  }

  const { data } = await supabase.auth.getSession();
  if (!data.session) {
    window.location.href = "admin-login.html";
    return false;
  }

  return true;
}

function renderEducationTable() {
  educationTableBody.innerHTML = "";

  if (!cache.education.length) {
    educationTableBody.innerHTML = '<tr><td colspan="4">No education records found.</td></tr>';
    return;
  }

  cache.education.forEach((item) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${item.institution || ""}</td>
      <td>${item.degree || ""}</td>
      <td>${item.year_start || ""} - ${item.year_end || "Present"}</td>
      <td>
        <button class="action-btn edit" data-type="education" data-id="${item.id}">Edit</button>
        <button class="action-btn delete" data-type="education" data-id="${item.id}">Delete</button>
      </td>
    `;
    educationTableBody.appendChild(tr);
  });
}

function renderExperienceTable() {
  if (!experienceTableBody) return;
  experienceTableBody.innerHTML = "";

  if (!cache.experience.length) {
    experienceTableBody.innerHTML = '<tr><td colspan="4">No experience records found.</td></tr>';
    return;
  }

  cache.experience.forEach((item) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${item.company || ""}</td>
      <td>${item.role || ""}</td>
      <td>${item.year_start || ""} - ${item.year_end || "Present"}</td>
      <td>
        <button class="action-btn edit" data-type="experience" data-id="${item.id}">Edit</button>
        <button class="action-btn delete" data-type="experience" data-id="${item.id}">Delete</button>
      </td>
    `;
    experienceTableBody.appendChild(tr);
  });
}

function renderSkillsTable() {
  skillsTableBody.innerHTML = "";

  if (!cache.skills.length) {
    skillsTableBody.innerHTML = '<tr><td colspan="3">No skills found.</td></tr>';
    return;
  }

  cache.skills.forEach((item) => {
    const percentRaw = Number(item.knowledge_percent);
    const percent = Number.isFinite(percentRaw) ? Math.min(100, Math.max(0, Math.round(percentRaw))) : 0;
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${item.title || ""}</td>
      <td>${percent}%</td>
      <td>
        <button class="action-btn edit" data-type="skills" data-id="${item.id}">Edit</button>
        <button class="action-btn delete" data-type="skills" data-id="${item.id}">Delete</button>
      </td>
    `;
    skillsTableBody.appendChild(tr);
  });
}

function renderProjectsTable() {
  projectsTableBody.innerHTML = "";

  if (!cache.projects.length) {
    projectsTableBody.innerHTML = '<tr><td colspan="3">No projects found.</td></tr>';
    return;
  }

  cache.projects.forEach((item) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${item.title || ""}</td>
      <td>${item.summary || ""}</td>
      <td>
        <button class="action-btn edit" data-type="projects" data-id="${item.id}">Edit</button>
        <button class="action-btn delete" data-type="projects" data-id="${item.id}">Delete</button>
      </td>
    `;
    projectsTableBody.appendChild(tr);
  });
}

function renderCertificatesTable() {
  certificatesTableBody.innerHTML = "";

  if (!cache.certificates.length) {
    certificatesTableBody.innerHTML = '<tr><td colspan="3">No certificates found.</td></tr>';
    return;
  }

  cache.certificates.forEach((item) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${item.title || ""}</td>
      <td>${item.issued_by || ""}</td>
      <td>
        <button class="action-btn edit" data-type="certificates" data-id="${item.id}">Edit</button>
        <button class="action-btn delete" data-type="certificates" data-id="${item.id}">Delete</button>
      </td>
    `;
    certificatesTableBody.appendChild(tr);
  });
}

function renderMessagesTable() {
  messagesTableBody.innerHTML = "";

  if (!cache.messages.length) {
    messagesTableBody.innerHTML = '<tr><td colspan="7">No messages yet.</td></tr>';
    return;
  }

  cache.messages.forEach((item) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${item.name || ""}</td>
      <td>${item.email || ""}</td>
      <td>${item.phone || ""}</td>
      <td>${item.subject || ""}</td>
      <td>${item.message || ""}</td>
      <td>${item.created_at ? new Date(item.created_at).toLocaleString() : ""}</td>
      <td>
        <button class="action-btn edit view" data-type="messages" data-id="${item.id}">View</button>
        <button class="action-btn delete" data-type="messages" data-id="${item.id}">Delete</button>
      </td>
    `;
    messagesTableBody.appendChild(tr);
  });
}

function viewMessage(id) {
  const numericId = Number(id);
  const item = cache.messages.find((entry) => Number(entry.id) === numericId);
  if (!item) {
    window.alert("Message not found.");
    return;
  }

  const createdAt = item.created_at ? new Date(item.created_at).toLocaleString() : "";
  window.alert(
    `Name: ${item.name || ""}\n` +
      `Email: ${item.email || ""}\n` +
      `Phone: ${item.phone || ""}\n` +
      `Subject: ${item.subject || ""}\n` +
      `Created At: ${createdAt}\n\n` +
      `Message:\n${item.message || ""}`
  );
}

function fillAboutForm() {
  const data = cache.about || {};
  Object.entries(data).forEach(([key, value]) => {
    const input = aboutForm.elements.namedItem(key);
    if (input) input.value = value ?? "";
  });
  setPreview(aboutImagePreview, aboutForm.elements.profile_image.value, "assets/images/profile-placeholder.svg");
  syncImageButtons();
}

function editRecord(type, id) {
  const numericId = Number(id);

  if (type === "education") {
    const item = cache.education.find((entry) => Number(entry.id) === numericId);
    if (!item) return;
    educationForm.elements.id.value = item.id;
    educationForm.elements.institution.value = item.institution || "";
    educationForm.elements.degree.value = item.degree || "";
    educationForm.elements.year_start.value = item.year_start || "";
    educationForm.elements.year_end.value = item.year_end || "";
    educationForm.elements.image_url.value = item.image_url || "";
    setPreview(educationImagePreview, educationForm.elements.image_url.value, "assets/images/certificate-placeholder.svg");
    syncImageButtons();
    switchTab("education");
  }

  if (type === "experience") {
    const item = cache.experience.find((entry) => Number(entry.id) === numericId);
    if (!item) return;
    experienceForm.elements.id.value = item.id;
    experienceForm.elements.company.value = item.company || "";
    experienceForm.elements.role.value = item.role || "";
    experienceForm.elements.location.value = item.location || "";
    experienceForm.elements.year_start.value = item.year_start || "";
    experienceForm.elements.year_end.value = item.year_end || "";
    experienceForm.elements.description.value = item.description || "";
    experienceForm.elements.logo_url.value = item.logo_url || "";
    setPreview(experienceLogoPreview, experienceForm.elements.logo_url.value, "assets/images/project-placeholder.svg");
    syncImageButtons();
    switchTab("experience");
  }

  if (type === "skills") {
    const item = cache.skills.find((entry) => Number(entry.id) === numericId);
    if (!item) return;
    skillForm.elements.id.value = item.id;
    skillForm.elements.title.value = item.title || "";
    skillForm.elements.icon.value = item.icon || "";
    skillForm.elements.knowledge_percent.value = Number.isFinite(Number(item.knowledge_percent))
      ? Math.min(100, Math.max(0, Math.round(Number(item.knowledge_percent))))
      : 0;
    skillForm.elements.summary.value = item.summary || "";
    skillForm.elements.details.value = item.details || "";
    skillForm.elements.tools.value = Array.isArray(item.tools) ? item.tools.join(", ") : "";
    skillForm.elements.project_ids.value = Array.isArray(item.project_ids) ? item.project_ids.join(", ") : "";
    const displayOrderRaw = Number(item.display_order);
    const displayOrder = Number.isFinite(displayOrderRaw)
      ? Math.min(10, Math.max(1, Math.round(displayOrderRaw)))
      : 1;
    skillForm.elements.display_order.value = displayOrder;
    skillForm.elements.image_url.value = item.image_url || "";
    setPreview(skillImagePreview, skillForm.elements.image_url.value, "assets/images/project-placeholder.svg");
    syncImageButtons();
    switchTab("skills");
  }

  if (type === "projects") {
    const item = cache.projects.find((entry) => Number(entry.id) === numericId);
    if (!item) return;
    projectForm.elements.id.value = item.id;
    projectForm.elements.title.value = item.title || "";
    projectForm.elements.summary.value = item.summary || "";
    projectForm.elements.description.value = item.description || "";
    projectForm.elements.tech_stack.value = Array.isArray(item.tech_stack) ? item.tech_stack.join(", ") : "";
    projectForm.elements.images.value = Array.isArray(item.images) ? item.images.join(", ") : "";
    projectForm.elements.live_url.value = item.live_url || "";
    projectForm.elements.github_url.value = item.github_url || "";
    setPreview(projectImagePreview, firstValue(projectForm.elements.images.value), "assets/images/project-placeholder.svg");
    syncImageButtons();
    switchTab("projects");
  }

  if (type === "certificates") {
    const item = cache.certificates.find((entry) => Number(entry.id) === numericId);
    if (!item) return;
    certificateForm.elements.id.value = item.id;
    certificateForm.elements.title.value = item.title || "";
    certificateForm.elements.summary.value = item.summary || "";
    certificateForm.elements.description.value = item.description || "";
    certificateForm.elements.image_url.value = item.image_url || "";
    certificateForm.elements.certificate_url.value = item.certificate_url || "";
    certificateForm.elements.issued_by.value = item.issued_by || "";
    certificateForm.elements.issued_on.value = item.issued_on || "";
    setPreview(certificateImagePreview, certificateForm.elements.image_url.value, "assets/images/certificate-placeholder.svg");
    syncImageButtons();
    switchTab("certificates");
  }
}

async function deleteRecord(type, id) {
  const confirmed = window.confirm("Are you sure you want to delete this item?");
  if (!confirmed) return;

  const table = type;
  const { error } = await supabase.from(table).delete().eq("id", Number(id));
  if (error) {
    window.alert(`Delete failed: ${error.message}`);
    return;
  }

  await loadDashboardData();
}

async function uploadImage(file, folder) {
  if (!file) {
    throw new Error("No file selected");
  }

  console.log(`Starting upload: ${file.name} to ${folder}/`);
  
  const fileName = `${Date.now()}-${file.name.replace(/\s+/g, "-")}`;
  const path = `${folder}/${fileName}`;

  console.log(`Upload path: ${path}, File size: ${file.size} bytes`);

  const { error, data: uploadData } = await supabase.storage
    .from("portfolio")
    .upload(path, file, { upsert: true });
  
  if (error) {
    console.error("Upload error:", error);
    throw new Error(`Upload failed: ${error.message}`);
  }

  console.log("✓ File uploaded to storage");

  const { data } = supabase.storage.from("portfolio").getPublicUrl(path);
  console.log(`✓ Public URL: ${data.publicUrl}`);
  
  return data.publicUrl;
}

async function loadDashboardData() {
  const [aboutRes, educationRes, experienceRes, skillsRes, projectsRes, certificatesRes, messagesRes] = await Promise.all([
    supabase.from("site_settings").select("*").limit(1).maybeSingle(),
    safeSelectWithOptionalOrder("education", [
      { column: "year_start", ascending: true },
      { column: "created_at", ascending: false },
      { column: "id", ascending: false }
    ]),
    safeSelectWithOptionalOrder("experience", [
      { column: "year_start", ascending: true },
      { column: "created_at", ascending: false },
      { column: "id", ascending: false }
    ]),
    safeSelectWithOptionalOrder("skills", [
      { column: "display_order", ascending: true },
      { column: "created_at", ascending: false },
      { column: "id", ascending: false }
    ]),
    safeSelectWithOptionalOrder("projects", [
      { column: "created_at", ascending: false },
      { column: "id", ascending: false }
    ]),
    safeSelectWithOptionalOrder("certificates", [
      { column: "issued_on", ascending: false },
      { column: "created_at", ascending: false },
      { column: "id", ascending: false }
    ]),
    safeSelectWithOptionalOrder("messages", [
      { column: "created_at", ascending: false },
      { column: "id", ascending: false }
    ])
  ]);

  const applyResult = (res, { key, statusEl, label, mapFn }) => {
    if (res?.error) {
      if (statusEl) {
        setStatus(statusEl, `${label} load failed: ${res.error.message}`, true);
      }
      return;
    }

    const data = res?.data;
    cache[key] = mapFn ? mapFn(data) : data;
  };

  applyResult(aboutRes, {
    key: "about",
    statusEl: aboutStatus,
    label: "About",
    mapFn: (data) => data || null
  });

  applyResult(educationRes, {
    key: "education",
    statusEl: educationStatus,
    label: "Education",
    mapFn: (data) => data || []
  });

  applyResult(experienceRes, {
    key: "experience",
    statusEl: experienceStatus,
    label: "Experience",
    mapFn: (data) => data || []
  });

  applyResult(skillsRes, {
    key: "skills",
    statusEl: skillStatus,
    label: "Skills",
    mapFn: (data) => (data || []).map((item) => ({
      ...item,
      tools: Array.isArray(item.tools) ? item.tools : [],
      project_ids: Array.isArray(item.project_ids) ? item.project_ids : []
    }))
  });

  applyResult(projectsRes, {
    key: "projects",
    statusEl: projectStatus,
    label: "Projects",
    mapFn: (data) => (data || []).map((item) => ({
      ...item,
      tech_stack: Array.isArray(item.tech_stack) ? item.tech_stack : [],
      images: Array.isArray(item.images) ? item.images : []
    }))
  });

  applyResult(certificatesRes, {
    key: "certificates",
    statusEl: certificateStatus,
    label: "Certificates",
    mapFn: (data) => data || []
  });

  applyResult(messagesRes, {
    key: "messages",
    statusEl: null,
    label: "Messages",
    mapFn: (data) => data || []
  });

  fillAboutForm();
  renderEducationTable();
  renderExperienceTable();
  renderSkillsTable();
  renderProjectsTable();
  renderCertificatesTable();
  renderMessagesTable();

  if (skillProjectIdsHelp) {
    const projects = Array.isArray(cache.projects) ? cache.projects : [];
    skillProjectIdsHelp.textContent = projects.length
      ? `Available projects: ${projects
        .slice(0, 10)
        .map((project) => `${project.id}=${project.title || "(untitled)"}`)
        .join(" | ")}`
      : "No projects loaded yet.";
  }

  syncPublicPortfolioCache();
}

aboutForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  await saveAboutSection("About section updated successfully.");
});

async function saveAboutSection(successMessage = "About section updated successfully.") {
  const formData = new FormData(aboutForm);

  const payload = {
    id: cache.about?.id || 1,
    name: String(formData.get("name") || ""),
    intro: String(formData.get("intro") || ""),
    about: String(formData.get("about") || ""),
    email: String(formData.get("email") || ""),
    phone: String(formData.get("phone") || ""),
    location: String(formData.get("location") || ""),
    profile_image: String(formData.get("profile_image") || ""),
    instagram_url: String(formData.get("instagram_url") || ""),
    github_url: String(formData.get("github_url") || ""),
    linkedin_url: String(formData.get("linkedin_url") || "")
  };

  const { error } = await supabase.from("site_settings").upsert(payload, { onConflict: "id" });
  if (error) {
    setStatus(aboutStatus, `Failed to save about: ${error.message}`, true);
    return false;
  }

  setStatus(aboutStatus, successMessage);
  await loadDashboardData();
  return true;
}

educationForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(educationForm);

  const id = formData.get("id");
  const payload = {
    institution: String(formData.get("institution") || ""),
    degree: String(formData.get("degree") || ""),
    year_start: Number(formData.get("year_start") || 0),
    year_end: formData.get("year_end") ? Number(formData.get("year_end")) : null,
    image_url: String(formData.get("image_url") || "")
  };

  const query = id
    ? supabase.from("education").update(payload).eq("id", Number(id))
    : supabase.from("education").insert(payload);

  const { error } = await query;
  if (error) {
    setStatus(educationStatus, `Failed to save education: ${error.message}`, true);
    return;
  }

  educationForm.reset();
  educationForm.elements.id.value = "";
  educationForm.elements.image_url.value = "";
  setPreview(educationImagePreview, "", "assets/images/certificate-placeholder.svg");
  syncImageButtons();
  setStatus(educationStatus, "Education saved.");
  await loadDashboardData();
});

if (experienceForm) {
  experienceForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(experienceForm);

    const id = formData.get("id");
    const payload = {
      company: String(formData.get("company") || "").trim(),
      role: String(formData.get("role") || "").trim(),
      year_start: Number(formData.get("year_start") || 0)
    };

    const yearEndRaw = String(formData.get("year_end") || "").trim();
    if (yearEndRaw) payload.year_end = Number(yearEndRaw);

    const locationRaw = String(formData.get("location") || "").trim();
    if (locationRaw) payload.location = locationRaw;

    const descriptionRaw = String(formData.get("description") || "").trim();
    if (descriptionRaw) payload.description = descriptionRaw;

    const logoUrlRaw = String(formData.get("logo_url") || "").trim();
    if (logoUrlRaw) payload.logo_url = logoUrlRaw;

    const runSave = async (nextPayload) => {
      const query = id
        ? supabase.from("experience").update(nextPayload).eq("id", Number(id))
        : supabase.from("experience").insert(nextPayload);
      return query;
    };

    const getMissingColumnFromError = (message) => {
      const text = String(message || "");
      const match = text.match(/Could not find the '([^']+)' column/i);
      if (match?.[1]) return match[1];
      const match2 = text.match(/column\s+"([^"]+)"\s+does\s+not\s+exist/i);
      if (match2?.[1]) return match2[1];
      return "";
    };

    let nextPayload = { ...payload };
    let lastError = null;
    let removedAny = false;

    for (let attempt = 0; attempt < 4; attempt += 1) {
      const { error } = await runSave(nextPayload);
      if (!error) {
        lastError = null;
        break;
      }

      lastError = error;
      const missingColumn = getMissingColumnFromError(error.message);

      if (!missingColumn || !(missingColumn in nextPayload)) {
        break;
      }

      delete nextPayload[missingColumn];
      removedAny = true;
    }

    if (lastError) {
      setStatus(experienceStatus, `Failed to save experience: ${lastError.message}`, true);
      return;
    }

    experienceForm.reset();
    experienceForm.elements.id.value = "";
    experienceForm.elements.logo_url.value = "";
    setPreview(experienceLogoPreview, "", "assets/images/project-placeholder.svg");
    syncImageButtons();
    setStatus(
      experienceStatus,
      removedAny
        ? "Experience saved (some optional fields were skipped because your Supabase table is missing columns)."
        : "Experience saved."
    );
    await loadDashboardData();
    const hasLoadErrorMessage = String(experienceStatus?.textContent || "").toLowerCase().includes("load failed");
    if (!cache.experience.length && !hasLoadErrorMessage) {
      setStatus(
        experienceStatus,
        "Experience saved, but records are not loading. This usually means SELECT is blocked by RLS/policies for the experience table.",
        true
      );
    }
  });
}

skillForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(skillForm);

  const id = formData.get("id");
  const title = String(formData.get("title") || "").trim();
  const percentRaw = Number(formData.get("knowledge_percent"));
  const knowledgePercent = Number.isFinite(percentRaw) ? Math.min(100, Math.max(0, Math.round(percentRaw))) : 0;

  const displayOrderRaw = Number(formData.get("display_order"));
  const displayOrder = Number.isFinite(displayOrderRaw)
    ? Math.min(10, Math.max(1, Math.round(displayOrderRaw)))
    : 1;

  // Keep DB compatibility by auto-filling missing fields when left blank.
  const summaryValue = String(formData.get("summary") || "").trim() || title;
  const detailsValue = String(formData.get("details") || "").trim() || `Knowledge: ${knowledgePercent}%`;

  const payload = {
    title,
    icon: String(formData.get("icon") || ""),
    knowledge_percent: knowledgePercent,
    summary: summaryValue,
    details: detailsValue,
    tools: parseCSV(formData.get("tools")),
    project_ids: parseCSV(formData.get("project_ids")).map((item) => Number(item)),
    display_order: displayOrder,
    image_url: String(formData.get("image_url") || "")
  };

  const query = id
    ? supabase.from("skills").update(payload).eq("id", Number(id))
    : supabase.from("skills").insert(payload);

  const { error } = await query;
  if (error) {
    setStatus(skillStatus, `Failed to save skill: ${error.message}`, true);
    return;
  }

  skillForm.reset();
  skillForm.elements.id.value = "";
  skillForm.elements.display_order.value = 1;
  skillForm.elements.knowledge_percent.value = 0;
  skillForm.elements.image_url.value = "";
  setPreview(skillImagePreview, "", "assets/images/project-placeholder.svg");
  syncImageButtons();
  setStatus(skillStatus, "Skill saved.");
  await loadDashboardData();
});

if (uploadEducationImageBtn && educationImageUploadInput) {
  uploadEducationImageBtn.addEventListener("click", async () => {
    const file = educationImageUploadInput.files?.[0];
    if (!file) {
      setStatus(educationStatus, "Choose an image before uploading.", true);
      return;
    }

    try {
      setStatus(educationStatus, "Uploading education image...");
      const publicUrl = await uploadImage(file, "education");
      educationForm.elements.image_url.value = publicUrl;
      setPreview(educationImagePreview, publicUrl, "assets/images/certificate-placeholder.svg");
      syncImageButtons();
      setStatus(educationStatus, "Image uploaded and education updated.");
      educationImageUploadInput.value = "";
    } catch (error) {
      setStatus(educationStatus, `Image upload failed: ${error.message}`, true);
    }
  });
}

if (removeEducationImageBtn) {
  removeEducationImageBtn.addEventListener("click", () => {
    educationForm.elements.image_url.value = "";
    educationImageUploadInput.value = "";
    setPreview(educationImagePreview, "", "assets/images/certificate-placeholder.svg");
    syncImageButtons();
    setStatus(educationStatus, "Education image removed. Click Save Education to apply.");
  });
}

if (uploadExperienceLogoBtn && experienceLogoUploadInput && experienceForm) {
  uploadExperienceLogoBtn.addEventListener("click", async () => {
    const file = experienceLogoUploadInput.files?.[0];
    if (!file) {
      setStatus(experienceStatus, "No logo selected (optional).", false);
      return;
    }

    try {
      setStatus(experienceStatus, "Uploading experience logo...");
      const publicUrl = await uploadImage(file, "experience");
      experienceForm.elements.logo_url.value = publicUrl;
      setPreview(experienceLogoPreview, publicUrl, "assets/images/project-placeholder.svg");
      syncImageButtons();
      setStatus(experienceStatus, "Logo uploaded and experience updated.");
      experienceLogoUploadInput.value = "";
    } catch (error) {
      setStatus(experienceStatus, `Image upload failed: ${error.message}`, true);
    }
  });
}

if (removeExperienceLogoBtn && experienceForm) {
  removeExperienceLogoBtn.addEventListener("click", () => {
    experienceForm.elements.logo_url.value = "";
    if (experienceLogoUploadInput) experienceLogoUploadInput.value = "";
    setPreview(experienceLogoPreview, "", "assets/images/project-placeholder.svg");
    syncImageButtons();
    setStatus(experienceStatus, "Experience logo removed. Click Save Experience to apply.");
  });
}

if (uploadSkillImageBtn && skillImageUploadInput) {
  uploadSkillImageBtn.addEventListener("click", async () => {
    const file = skillImageUploadInput.files?.[0];
    if (!file) {
      setStatus(skillStatus, "Choose an image before uploading.", true);
      return;
    }

    try {
      setStatus(skillStatus, "Uploading skill image...");
      const publicUrl = await uploadImage(file, "skills");
      skillForm.elements.image_url.value = publicUrl;
      setPreview(skillImagePreview, publicUrl, "assets/images/project-placeholder.svg");
      syncImageButtons();
      setStatus(skillStatus, "Image uploaded and skill updated.");
      skillImageUploadInput.value = "";
    } catch (error) {
      setStatus(skillStatus, `Image upload failed: ${error.message}`, true);
    }
  });
}

if (removeSkillImageBtn) {
  removeSkillImageBtn.addEventListener("click", () => {
    skillForm.elements.image_url.value = "";
    skillImageUploadInput.value = "";
    setPreview(skillImagePreview, "", "assets/images/project-placeholder.svg");
    syncImageButtons();
    setStatus(skillStatus, "Skill image removed. Click Save Skill to apply.");
  });
}

projectForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(projectForm);

  const id = formData.get("id");
  const payload = {
    title: String(formData.get("title") || ""),
    summary: String(formData.get("summary") || ""),
    description: String(formData.get("description") || ""),
    tech_stack: parseCSV(formData.get("tech_stack")),
    images: parseCSV(formData.get("images")),
    live_url: String(formData.get("live_url") || ""),
    github_url: String(formData.get("github_url") || "")
  };

  const query = id
    ? supabase.from("projects").update(payload).eq("id", Number(id))
    : supabase.from("projects").insert(payload);

  const { error } = await query;
  if (error) {
    setStatus(projectStatus, `Failed to save project: ${error.message}`, true);
    return;
  }

  projectForm.reset();
  projectForm.elements.id.value = "";
  projectForm.elements.images.value = "";
  setPreview(projectImagePreview, "", "assets/images/project-placeholder.svg");
  syncImageButtons();
  setStatus(projectStatus, "Project saved.");
  await loadDashboardData();
});

certificateForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(certificateForm);

  const id = formData.get("id");
  const payload = {
    title: String(formData.get("title") || ""),
    summary: String(formData.get("summary") || ""),
    description: String(formData.get("description") || ""),
    image_url: String(formData.get("image_url") || ""),
    certificate_url: String(formData.get("certificate_url") || ""),
    issued_by: String(formData.get("issued_by") || ""),
    issued_on: formData.get("issued_on") || null
  };

  const query = id
    ? supabase.from("certificates").update(payload).eq("id", Number(id))
    : supabase.from("certificates").insert(payload);

  const { error } = await query;
  if (error) {
    setStatus(certificateStatus, `Failed to save certificate: ${error.message}`, true);
    return;
  }

  certificateForm.reset();
  certificateForm.elements.id.value = "";
  setStatus(certificateStatus, "Certificate saved.");
  await loadDashboardData();
});

if (uploadProjectImageBtn && projectImageUploadInput) {
  uploadProjectImageBtn.addEventListener("click", async () => {
    const files = Array.from(projectImageUploadInput.files || []);
    if (!files.length) {
      setStatus(projectStatus, "Choose one or more images before uploading.", true);
      return;
    }

    try {
      setStatus(projectStatus, `Uploading ${files.length} project image(s)...`);
      const current = getProjectImageList();
      const uploadedUrls = [];

      for (const file of files) {
        const publicUrl = await uploadImage(file, "projects");
        uploadedUrls.push(publicUrl);
      }

      updateProjectImages([...current, ...uploadedUrls]);
      setStatus(projectStatus, `${uploadedUrls.length} image(s) uploaded and added to project.`);
      projectImageUploadInput.value = "";
    } catch (error) {
      setStatus(projectStatus, `Image upload failed: ${error.message}`, true);
    }
  });
}

if (removeProjectImageBtn) {
  removeProjectImageBtn.addEventListener("click", () => {
    updateProjectImages([]);
    projectImageUploadInput.value = "";
    setStatus(projectStatus, "Project image removed. Click Save Project to apply.");
  });
}

if (uploadCertificateImageBtn && certificateImageUploadInput) {
  uploadCertificateImageBtn.addEventListener("click", async () => {
    const file = certificateImageUploadInput.files?.[0];
    if (!file) {
      setStatus(certificateStatus, "Choose an image before uploading.", true);
      return;
    }

    try {
      setStatus(certificateStatus, "Uploading certificate image...");
      const publicUrl = await uploadImage(file, "certificates");
      certificateForm.elements.image_url.value = publicUrl;
      setPreview(certificateImagePreview, publicUrl, "assets/images/certificate-placeholder.svg");
      syncImageButtons();
      setStatus(certificateStatus, "Image uploaded and certificate updated.");
      certificateImageUploadInput.value = "";
    } catch (error) {
      setStatus(certificateStatus, `Image upload failed: ${error.message}`, true);
    }
  });
}

if (removeCertificateImageBtn) {
  removeCertificateImageBtn.addEventListener("click", () => {
    certificateForm.elements.image_url.value = "";
    certificateImageUploadInput.value = "";
    setPreview(certificateImagePreview, "", "assets/images/certificate-placeholder.svg");
    syncImageButtons();
    setStatus(certificateStatus, "Certificate image removed. Click Save Certificate to apply.");
  });
}

if (uploadAboutImageBtn && aboutImageUploadInput) {
  uploadAboutImageBtn.addEventListener("click", async () => {
    const file = aboutImageUploadInput.files?.[0];
    if (!file) {
      setStatus(aboutStatus, "Choose a profile image before uploading.", true);
      return;
    }

    try {
      setStatus(aboutStatus, "Uploading profile image...");
      const publicUrl = await uploadImage(file, "profile");
      aboutForm.elements.profile_image.value = publicUrl;
      setPreview(aboutImagePreview, publicUrl, "assets/images/profile-placeholder.svg");
      syncImageButtons();
      setStatus(aboutStatus, "Saving profile image...");
      const saved = await saveAboutSection("Profile image uploaded and saved.");
      if (saved) {
        aboutImageUploadInput.value = "";
      }
    } catch (error) {
      setStatus(aboutStatus, `Image upload failed: ${error.message}`, true);
    }
  });
}

if (removeAboutImageBtn) {
  removeAboutImageBtn.addEventListener("click", async () => {
    try {
      aboutForm.elements.profile_image.value = "";
      aboutImageUploadInput.value = "";
      setPreview(aboutImagePreview, "", "assets/images/profile-placeholder.svg");
      syncImageButtons();
      setStatus(aboutStatus, "Removing profile image...");
      await saveAboutSection("Profile image removed and saved.");
    } catch (error) {
      setStatus(aboutStatus, `Failed to remove profile image: ${error.message}`, true);
    }
  });
}

[educationTableBody, experienceTableBody, skillsTableBody, projectsTableBody, certificatesTableBody, messagesTableBody]
  .filter(Boolean)
  .forEach((body) => {
  body.addEventListener("click", async (event) => {
    const target = event.target;
    if (!(target instanceof HTMLButtonElement)) return;

    const type = target.dataset.type;
    const id = target.dataset.id;
    if (!type || !id) return;

    if (target.classList.contains("view") && type === "messages") {
      viewMessage(id);
      const shouldDelete = window.confirm("Delete this message now?");
      if (shouldDelete) {
        await deleteRecord(type, id);
      }
      return;
    }

    if (target.classList.contains("edit")) {
      editRecord(type, id);
      return;
    }

    if (target.classList.contains("delete")) {
      await deleteRecord(type, id);
    }
  });
});

logoutBtn.addEventListener("click", async () => {
  await supabase.auth.signOut();
  window.location.href = "admin-login.html";
});

async function init() {
  const ok = await ensureAuth();
  if (!ok) return;
  
  console.log("✓ Auth verified, loading dashboard data...");
  try {
    await loadDashboardData();
    syncImageButtons();
    console.log("✓ Dashboard loaded successfully");
  } catch (error) {
    console.error("✗ Dashboard load error:", error);
  }
}

init();

