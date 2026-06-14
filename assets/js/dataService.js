import { IS_SUPABASE_CONFIGURED } from "./config.js";
import { getSupabaseClient } from "./supabaseClient.js";

const PORTFOLIO_CACHE_KEY = "portfolio_cache_v2";
const PORTFOLIO_CACHE_TTL_MS = 5 * 60 * 1000;
const PORTFOLIO_REVALIDATE_AFTER_MS = 30 * 1000;

let inMemoryPortfolioData = null;
let inFlightFetch = null;

const EMPTY_PORTFOLIO = {
  settings: {},
  education: [],
  experience: [],
  projects: [],
  certificates: [],
  skills: []
};

const fallback = {
  settings: {
    name: "SHAFEEQAHAMED M",
    intro:
      "Creating beautiful, functional websites and applications with passion and precision.",
    about:
      "I'm a passionate Web Developer and Computer Science student with a background in Mechanical Engineering. My journey from mechanical design to web development has given me a unique perspective on problem-solving and design thinking. I completed my Diploma in Mechanical Engineering at MRK Polytechnic College and am currently pursuing a B.E. in Computer Science and Engineering at Annamalai University. I enjoy building modern web applications, portfolio websites, cloud-based systems, and innovative digital solutions.",
    email: "m.shafeeqahamed2004@gmail.com",
    phone: "+91 8489481039",
    location: "Tamil Nadu, India",

    instagram_url:
      "https://www.instagram.com/m_shafeeqahamed_sad/profilecard/",
    github_url: "https://github.com/shafeeqahamedinfo",
    linkedin_url:
      "https://www.linkedin.com/in/shafeeqahamed-m-40b72a309/"
  },

  education: [
    {
      id: 1,
      degree: "Diploma in Mechanical Engineering",
      institution: "MRK Polytechnic College",
      year_start: 2020,
      year_end: 2023,
      description:
        "Completed Diploma in Mechanical Engineering with strong fundamentals in design, manufacturing and engineering concepts.",
      image_url: ""
    },
    {
      id: 2,
      degree: "B.E. Computer Science and Engineering",
      institution: "Annamalai University",
      year_start: 2024,
      year_end: 2027,
      description:
        "Currently pursuing Computer Science and Engineering with interests in Web Development, Cloud Computing, Databases and Software Engineering.",
      image_url: ""
    }
  ],

  experience: [
    {
      id: 1,
      company: "Fresher",
      role: "Student Developer",
      year_start: 2024,
      year_end: null,
      location: "Tamil Nadu, India",
      description:
        "No professional experience yet. Actively developing projects, participating in technical events, and earning certifications through NPTEL and self-learning.",
      logo_url: ""
    }
  ],

  projects: [
    {
      id: 1,
      title: "Cloud Store",
      summary: "Cloud storage management platform",
      description:
        "A cloud-based storage platform that allows users to securely upload, store and access files from anywhere.",
      tech_stack: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
      images: [
        "https://images.unsplash.com/photo-1451187580459-43490279c0fa"
      ],
      live_url: "#",
      github_url: "#"
    },

    {
      id: 2,
      title: "Social Media Hub",
      summary: "Social networking platform",
      description:
        "A social networking platform that helps users connect, communicate and share content globally.",
      tech_stack: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
      images: [
        "https://images.unsplash.com/photo-1611162616475-46b635cb6868"
      ],
      live_url: "#",
      github_url: "#"
    },

    {
      id: 3,
      title: "Billing Software",
      summary: "GST billing and inventory system",
      description:
        "Billing software with product management, GST calculation, inventory tracking and multiple payment methods.",
      tech_stack: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
      images: [
        "https://images.unsplash.com/photo-1556740749-887f6717d7e4"
      ],
      live_url: "#",
      github_url: "#"
    },

    {
      id: 4,
      title: "COMPSEM '26",
      summary: "University Symposium Management Platform",
      description:
        "Official symposium website for the Department of Computer Science and Engineering, Annamalai University, including event registration and dashboard access.",
      tech_stack: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
      images: [
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3"
      ],
      live_url: "#",
      github_url: "#"
    },

    {
      id: 5,
      title: "Portfolio Website",
      summary: "Personal portfolio with dynamic content",
      description:
        "Modern portfolio website showcasing education, projects, certifications, skills and contact information.",
      tech_stack: ["HTML", "CSS", "JavaScript", "Supabase"],
      images: [
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085"
      ],
      live_url: "#",
      github_url: "#"
    }
  ],

  certificates: [
    {
      id: 1,
      title: "Cloud Computing",
      summary: "NPTEL Certification",
      description:
        "Successfully completed the Cloud Computing course offered through the NPTEL Online Certification program funded by the Ministry of Education, Government of India.",
      image_url: "",
      certificate_url: "#",
      issued_by: "NPTEL",
      issued_on: "2025"
    },

    {
      id: 2,
      title: "Social Networks",
      summary: "NPTEL Certification",
      description:
        "Successfully completed the Social Networks course during the Jul–Oct 2025 session under the NPTEL Online Certification Program.",
      image_url: "",
      certificate_url: "#",
      issued_by: "NPTEL",
      issued_on: "2025"
    }
  ],

  skills: [
    { id: 1, name: "HTML", knowledge_percent: 90 },
    { id: 2, name: "CSS", knowledge_percent: 75 },
    { id: 3, name: "JavaScript", knowledge_percent: 60 },
    { id: 4, name: "SQL", knowledge_percent: 50 },
    { id: 5, name: "Git & GitHub", knowledge_percent: 80 },
    { id: 6, name: "Python", knowledge_percent: 70 },
    { id: 7, name: "Bootstrap", knowledge_percent: 70 },
    { id: 8, name: "PHP", knowledge_percent: 70 },
    { id: 9, name: "MySQL", knowledge_percent: 60 }
  ]
};
function normalizeArray(value) {
  if (Array.isArray(value)) return value;
  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value);
      if (Array.isArray(parsed)) return parsed;
    } catch (_error) {
      return value.split(",").map((item) => item.trim()).filter(Boolean);
    }
  }
  return [];
}

function normalizeProject(project) {
  return {
    ...project,
    tech_stack: normalizeArray(project.tech_stack),
    images: normalizeArray(project.images)
  };
}

function normalizeSkill(entry) {
  return {
    ...entry,
    icon: typeof entry.icon === "string" ? entry.icon : "",
    summary: typeof entry.summary === "string" ? entry.summary : "",
    details: typeof entry.details === "string" ? entry.details : "",
    tools: normalizeArray(entry.tools),
    project_ids: normalizeArray(entry.project_ids),
    knowledge_percent: Number.isFinite(Number(entry.knowledge_percent)) ? Number(entry.knowledge_percent) : null,
    display_order: Number.isFinite(Number(entry.display_order)) ? Number(entry.display_order) : null,
    image_url: typeof entry.image_url === "string" ? entry.image_url : ""
  };
}

function normalizeEducation(entry) {
  return {
    ...entry,
    image_url: typeof entry.image_url === "string" ? entry.image_url : ""
  };
}

function normalizeExperience(entry) {
  return {
    ...entry,
    logo_url: typeof entry.logo_url === "string" ? entry.logo_url : "",
    location: typeof entry.location === "string" ? entry.location : "",
    description: typeof entry.description === "string" ? entry.description : ""
  };
}

function normalizeSettings(settings) {
  if (!settings || typeof settings !== "object") return {};
  const trimmed = {};
  Object.entries(settings).forEach(([key, value]) => {
    trimmed[key] = typeof value === "string" ? value.trim() : value;
  });
  return trimmed;
}

function safeRows(value) {
  return Array.isArray(value) ? value : [];
}

function safeJsonParse(value, fallbackValue) {
  try {
    return JSON.parse(value);
  } catch (_error) {
    return fallbackValue;
  }
}

function readPortfolioCache() {
  if (typeof localStorage === "undefined") return null;
  const raw = localStorage.getItem(PORTFOLIO_CACHE_KEY);
  if (!raw) return null;

  const parsed = safeJsonParse(raw, null);
  if (!parsed || typeof parsed !== "object") return null;
  if (!parsed.timestamp || !parsed.data) return null;

  const timestamp = Number(parsed.timestamp);
  if (!Number.isFinite(timestamp)) return null;

  return {
    timestamp,
    ageMs: Date.now() - timestamp,
    data: parsed.data
  };
}

function writePortfolioCache(data) {
  if (typeof localStorage === "undefined") return;
  try {
    localStorage.setItem(
      PORTFOLIO_CACHE_KEY,
      JSON.stringify({ timestamp: Date.now(), data })
    );
  } catch (_error) {
    // Ignore storage quota errors.
  }
}

function dispatchPortfolioUpdate(data) {
  if (typeof window === "undefined" || typeof window.dispatchEvent !== "function") return;
  try {
    window.dispatchEvent(
      new CustomEvent("portfolio:data-updated", {
        detail: data
      })
    );
  } catch (_error) {
    // Ignore if CustomEvent is not supported.
  }
}

if (typeof window !== "undefined" && typeof window.addEventListener === "function") {
  window.addEventListener("storage", (event) => {
    if (!event || event.key !== PORTFOLIO_CACHE_KEY) return;
    const next = safeJsonParse(event.newValue, null);
    if (!next || typeof next !== "object" || !next.data) return;

    inMemoryPortfolioData = next.data;
    dispatchPortfolioUpdate(next.data);
  });
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

async function safeSelectRows(supabase, table, orderColumns) {
  const orders = Array.isArray(orderColumns) ? orderColumns : [];

  for (const order of orders) {
    const column = order?.column;
    if (!column) continue;

    const res = await supabase.from(table).select("*").order(column, {
      ascending: order.ascending !== false
    });

    if (!res.error) return res;
    if (isMissingColumnError(res.error.message, column)) continue;
    return res;
  }

  return supabase.from(table).select("*");
}

async function fetchPortfolioDataFromSupabase() {
  const supabase = await getSupabaseClient();
  if (!supabase) {
    throw new Error("Supabase client unavailable");
  }

  const [settingsRes, educationRes, experienceRes, projectsRes, certificatesRes, skillsRes] = await Promise.all([
    supabase.from("site_settings").select("*").limit(1).maybeSingle(),
    safeSelectRows(supabase, "education", [
      { column: "year_start", ascending: true },
      { column: "created_at", ascending: false },
      { column: "id", ascending: false }
    ]),
    safeSelectRows(supabase, "experience", [
      { column: "year_start", ascending: true },
      { column: "created_at", ascending: false },
      { column: "id", ascending: false }
    ]),
    safeSelectRows(supabase, "projects", [
      { column: "created_at", ascending: false },
      { column: "id", ascending: false }
    ]),
    safeSelectRows(supabase, "certificates", [
      { column: "issued_on", ascending: false },
      { column: "created_at", ascending: false },
      { column: "id", ascending: false }
    ]),
    safeSelectRows(supabase, "skills", [
      { column: "display_order", ascending: true },
      { column: "created_at", ascending: false },
      { column: "id", ascending: false }
    ])
  ]);

  return {
    settings: normalizeSettings(settingsRes.data),
    education: safeRows(educationRes.data).map(normalizeEducation),
    experience: safeRows(experienceRes.data).map(normalizeExperience),
    projects: safeRows(projectsRes.data).map(normalizeProject),
    certificates: safeRows(certificatesRes.data),
    skills: safeRows(skillsRes.data).map(normalizeSkill)
  };
}

async function refreshPortfolioData() {
  if (inFlightFetch) return inFlightFetch;

  inFlightFetch = (async () => {
    try {
      const fresh = await fetchPortfolioDataFromSupabase();
      inMemoryPortfolioData = fresh;
      writePortfolioCache(fresh);
      dispatchPortfolioUpdate(fresh);
      return fresh;
    } catch (_error) {
      const cached = readPortfolioCache();
      if (cached?.data) {
        inMemoryPortfolioData = cached.data;
        return cached.data;
      }

      inMemoryPortfolioData = EMPTY_PORTFOLIO;
      return EMPTY_PORTFOLIO;
    } finally {
      inFlightFetch = null;
    }
  })();

  return inFlightFetch;
}

export async function getPortfolioData() {
  if (!IS_SUPABASE_CONFIGURED) {
    inMemoryPortfolioData = fallback;
    return fallback;
  }

  if (inMemoryPortfolioData) {
    return inMemoryPortfolioData;
  }

  const cached = readPortfolioCache();
  if (cached?.data) {
    inMemoryPortfolioData = cached.data;

    const isExpired = cached.ageMs > PORTFOLIO_CACHE_TTL_MS;
    const shouldRevalidate = cached.ageMs > PORTFOLIO_REVALIDATE_AFTER_MS;
    if (isExpired || shouldRevalidate) {
      void refreshPortfolioData();
    }

    return cached.data;
  }

  return refreshPortfolioData();
}

export async function getProjectById(id) {
  const data = await getPortfolioData();
  return data.projects.find((project) => Number(project.id) === Number(id));
}

export async function getCertificateById(id) {
  const data = await getPortfolioData();
  return data.certificates.find((certificate) => Number(certificate.id) === Number(id));
}

export async function saveContactMessage(payload) {
  if (!IS_SUPABASE_CONFIGURED) {
    const key = "portfolio_messages";
    const messages = JSON.parse(localStorage.getItem(key) || "[]");
    messages.push({ ...payload, created_at: new Date().toISOString() });
    localStorage.setItem(key, JSON.stringify(messages));
    return { success: true, offline: true };
  }

  const supabase = await getSupabaseClient();
  if (!supabase) {
    return { success: false, error: "Supabase client unavailable" };
  }

  const { error } = await supabase.from("messages").insert(payload);
  if (error) return { success: false, error: error.message };
  return { success: true, offline: false };
}
