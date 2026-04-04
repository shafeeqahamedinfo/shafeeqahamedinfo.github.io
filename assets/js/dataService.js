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
  skills: [],
  projects: [],
  certificates: []
};

const fallback = {
  settings: {
    name: "shafeeqahamed m",
    intro: "Creating beautiful, functional websites and applications with passion and precision.",
    about: "I'm a passionate web developer and Computer Science student with a background in mechanical engineering. My journey from mechanical design to web development has given me a unique perspective on problem-solving and design thinking. I completed my diploma at the Mechanical Department of MRK Polytechnic College and am currently pursuing a B.E. in Computer Science and Engineering at Annamalai University. I'm passionate about creating intuitive and engaging web experiences that solve real-world problems.",
    email: "m.shafeeqahamed2044@gmail.com",
    phone: "+91 8489481039",
    location: "Tamil Nadu, India",
    
    instagram_url: "https://www.instagram.com/m_shafeeqahamed_sad/profilecard/",
    github_url: "https://github.com/shafeeqahamedinfo",
    linkedin_url: "https://www.linkedin.com/in/shafeeqahamed-m-40b72a309/"
  },
  education: [
    { institution: null },
    { institution: null }
  ],
  experience: [
    {
      company: null,
      role: null,
      year_start: null,
      year_end: null,
      location: null,
      description: null,
      logo_url: ""
    }
  ],
  skills: [
    {
      id: 1,
      title: "HTML5",
      icon: "🌐",
      knowledge_percent: 85,
      summary: "Semantic and accessible page structures.",
      details: "Builds SEO-friendly and accessible foundation for web apps.",
      image_url: "",
      tools: ["Semantic tags", "ARIA", "SEO meta"],
      project_ids: [1]
    },
    {
      id: 2,
      title: "CSS3",
      icon: "🎨",
      knowledge_percent: 80,
      summary: "Responsive layouts and modern visual systems.",
      details: "Creates componentized styles with motion, hierarchy, and strong readability.",
      image_url: "",
      tools: ["Flexbox", "Grid", "Animations"],
      project_ids: [1, 2]
    },
    {
      id: 3,
      title: "JavaScript",
      icon: "⚡",
      knowledge_percent: 75,
      summary: "Interactive behavior and data-driven interfaces.",
      details: "Handles dynamic rendering, API integration, and form logic.",
      image_url: "",
      tools: ["DOM", "Fetch", "ES Modules"],
      project_ids: [2]
    }
  ],
  projects: [
    {
      id: 1,
      title: "Portfolio Site",
      summary: "Personal portfolio with Supabase backend.",
      description: "A modern portfolio with responsive sections, admin CMS, and dynamic data management.",
      tech_stack: ["HTML", "CSS", "JavaScript", "Supabase"],
      images: [
        "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80"
      ],
      live_url: "#",
      github_url: "#"
    },
    {
      id: 2,
      title: "Task Manager",
      summary: "Productivity web app with analytics.",
      description: "A project management app that tracks progress, deadlines, and productivity trends.",
      tech_stack: ["JavaScript", "Supabase", "Charts"],
      images: [
        "https://images.unsplash.com/photo-1611224923853-80b023f02d71?auto=format&fit=crop&w=1200&q=80"
      ],
      live_url: "#",
      github_url: "#"
    }
  ],
  certificates: [
    {
      id: 1,
      title: "Frontend Development",
      summary: "Certification in frontend engineering fundamentals.",
      description: "Covers modern frontend architecture, accessibility, and performance optimization.",
      image_url: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1200&q=80",
      certificate_url: "#",
      issued_by: "Example Academy",
      issued_on: "2025-07-10"
    }
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

function normalizeSkill(skill) {
  const percentRaw = Number(skill.knowledge_percent);
  const knowledgePercent = Number.isFinite(percentRaw)
    ? Math.min(100, Math.max(0, Math.round(percentRaw)))
    : 0;

  return {
    ...skill,
    image_url: typeof skill.image_url === "string" ? skill.image_url : "",
    knowledge_percent: knowledgePercent,
    tools: normalizeArray(skill.tools),
    project_ids: normalizeArray(skill.project_ids).map((id) => Number(id))
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

  const [settingsRes, educationRes, experienceRes, skillsRes, projectsRes, certificatesRes] = await Promise.all([
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
    safeSelectRows(supabase, "skills", [
      { column: "display_order", ascending: true },
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
    ])
  ]);

  return {
    settings: normalizeSettings(settingsRes.data),
    education: safeRows(educationRes.data).map(normalizeEducation),
    experience: safeRows(experienceRes.data).map(normalizeExperience),
    skills: safeRows(skillsRes.data).map(normalizeSkill),
    projects: safeRows(projectsRes.data).map(normalizeProject),
    certificates: safeRows(certificatesRes.data)
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

export async function getSkillById(id) {
  const data = await getPortfolioData();
  return data.skills.find((skill) => Number(skill.id) === Number(id));
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
