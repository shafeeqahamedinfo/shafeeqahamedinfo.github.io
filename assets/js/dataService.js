window.PortfolioData = (function () {
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
          "assets/image porject/clone/clone (1).png",
          "assets/image porject/clone/clone (2).png",
          "assets/image porject/clone/clone (3).png",
          "assets/image porject/clone/clone (4).png",
          "assets/image porject/clone/clone (5).png",
          "assets/image porject/clone/clone (6).png"
        ],
        live_url: "https://recyclezonecloud.free.nf",
        github_url: "https://github.com/shafeeqahamedinfo/recyclezone-cloud-php-mysql"
      },
      {
        id: 2,
        title: "Social Media Hub",
        summary: "Social networking platform",
        description:
          "A social networking platform that helps users connect, communicate and share content globally.",
        tech_stack: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
        images: [
          "assets/image porject/social/hub (7).png",
          "assets/image porject/social/hub (1).png",
          "assets/image porject/social/hub (6).png",
          "assets/image porject/social/hub (5).png",
           "assets/image porject/social/hub (4).png",
           "assets/image porject/social/hub (3).png",
          "assets/image porject/social/hub (2).png"
        ],
        live_url: "#",
        github_url: "https://github.com/shafeeqahamedinfo/recycle-zone-hub-social-media"
      },
      {
        id: 3,
        title: "Billing Software",
        summary: "GST billing and inventory system",
        description:
          "Billing software with product management, GST calculation, inventory tracking and multiple payment methods.",
        tech_stack: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
        images: [
            "assets/image porject/billing/billing project (4).png",
            "assets/image porject/billing/billing project (3).png",
          "assets/image porject/billing/billing project (1).png",
          "assets/image porject/billing/billing project (2).png",
        ],
        live_url: "https://github.com/shafeeqahamedinfo/billing-website-in-php-mysql",
        github_url: "https://github.com/shafeeqahamedinfo/billing-website-in-php-mysql"
      },
      {
        id: 4,
        title: "COMPSEM '26",
        summary: "University Symposium Management Platform",
        description:
          "Official symposium website for the Department of Computer Science and Engineering, Annamalai University, including event registration and dashboard access.",
        tech_stack: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
        images: [

          "assets/image porject/compsem/compsem (19).png",
          "assets/image porject/compsem/compsem (18).png",
          "assets/image porject/compsem/compsem (17).png",
          "assets/image porject/compsem/compsem (16).png",
          "assets/image porject/compsem/compsem (15).png",
          "assets/image porject/compsem/compsem (14).png",
          "assets/image porject/compsem/compsem (13).png",
          "assets/image porject/compsem/compsem (12).png",
          "assets/image porject/compsem/compsem (11).png",
          "assets/image porject/compsem/compsem (10).png",
          "assets/image porject/compsem/compsem (8).png",
          "assets/image porject/compsem/compsem (9).png",
          "assets/image porject/compsem/compsem (6).png",
          "assets/image porject/compsem/compsem (7).png",
          "assets/image porject/compsem/compsem (4).png",
          "assets/image porject/compsem/compsem (5).png",
          "assets/image porject/compsem/compsem (1).png",
          "assets/image porject/compsem/compsem (2).png",
          "assets/image porject/compsem/compsem (3).png",
        ],
        live_url: "https://compsem26.wuaze.com",
        github_url: "https://github.com/shafeeqahamedinfo/compsem26"
      },
      {
        id: 5,
        title: "Product & Warehouse Management System",
        summary: "Efficient management solution for products and inventory",
        description:
          "Comprehensive system for managing products, inventory, and warehouse operations with real-time tracking and reporting.",
        tech_stack: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
        images: [
          "assets/image porject/pwms/pwms (2).png",
          "assets/image porject/pwms/pwms (3).png",
          "assets/image porject/pwms/pwms (1).png",
          "assets/image porject/pwms/pwms (4).png",
          "assets/image porject/pwms/pwms (32).png" ,
          "assets/image porject/pwms/pwms (31).png" ,
          "assets/image porject/pwms/pwms (30).png" ,
          "assets/image porject/pwms/pwms (29).png" ,
          "assets/image porject/pwms/pwms (28).png" ,
          "assets/image porject/pwms/pwms (27).png" ,
          "assets/image porject/pwms/pwms (26).png" ,
          "assets/image porject/pwms/pwms (25).png" ,
          "assets/image porject/pwms/pwms (24).png" ,
          "assets/image porject/pwms/pwms (23).png" ,
          "assets/image porject/pwms/pwms (22).png" ,
          "assets/image porject/pwms/pwms (21).png" ,
          "assets/image porject/pwms/pwms (20).png" ,
          "assets/image porject/pwms/pwms (19).png"  ,
          "assets/image porject/pwms/pwms (18).png",
           "assets/image porject/pwms/pwms (17).png" ,
           "assets/image porject/pwms/pwms (16).png" ,
           "assets/image porject/pwms/pwms (15).png" ,
           "assets/image porject/pwms/pwms (14).png" ,
           "assets/image porject/pwms/pwms (13).png" ,
           "assets/image porject/pwms/pwms (12).png" ,
           "assets/image porject/pw ms(pwm s (11).png", 
           "assets/image porject/pw ms(pwm s (10).png" ,
           "assets/image porject/p w ms(pwm s (9).png",
            "assets/image porject/p w ms(pwm s (8).png", 
            "assets/image porject/p w ms(pwm s (7).png" ,
            "assets/image porject/p w ms(pwm s (6).png" ,
            "assets/image porject	p w ms(pwm s (5).png" 
            
        ],
        live_url: "https://pwmserp.freedev.app",
        github_url: "https://github.com/shafeeqahamedinfo/Product-Warehouse-Management-System"
      },      {
        id: 6,
        title: "shoe store",
        summary: "E-commerce platform for shoe sales",
        description:
          "An e-commerce platform for selling shoes online, featuring a user-friendly interface and seamless checkout process.",
        tech_stack: ["HTML", "CSS", "JavaScript"],
        images: [
          "assets/image porject/shoe shop/shoe (1).png",
          "assets/image porject/shoe shop/shoe (2).png",
          "assets/image porject/shoe shop/shoe (3).png",
          "assets/image porject/shoe shop/shoe (4).png",
          "assets/image porject/shoe shop/shoe (5).png",
          "assets/image porject/shoe shop/shoe (6).png"
        ],
        live_url: "https://recyclezone.neocities.org/haniffa%20footwear/",
        github_url: "https://github.com/shafeeqahamedinfo/neocities-project/tree/main/footwear"
      },
    ],

    certificates: [
      {
        id: 1,
        title: "Cloud Computing",
        summary: "NPTEL Certification",
        description:
          "Successfully completed the Cloud Computing course offered through the NPTEL Online Certification program funded by the Ministry of Education, Government of India.",
        image_url: "assets/Certifications/NPTEL26CS55S95310080204640062_page-0001.jpg",
        certificate_url: "assets/Certifications/NPTEL26CS55S95310080204640062.pdf",
        issued_by: "NPTEL",
        issued_on: "JAN-APR 2026"
      },
      {
        id: 2,
        title: "Social Networks",
        summary: "NPTEL Certification",
        description:
          "Successfully completed the Social Networks course during the Jul–Oct 2025 session under the NPTEL Online Certification Program.",
        image_url: "assets/Certifications/Social Networks (1)_page-0001.jpg",
        certificate_url: "assets/Certifications/Social Networks (1).pdf",
        issued_by: "NPTEL",
        issued_on: "JUL-OCT 2025"
      }
    ],

    skills: [
      { id: 1, title: "HTML", icon: "fa-brands fa-html5", knowledge_percent: 90 },
      { id: 2, title: "CSS", icon: "fa-brands fa-css3-alt", knowledge_percent: 75 },
      { id: 3, title: "JavaScript", icon: "fa-brands fa-js", knowledge_percent: 60 },
      { id: 4, title: "SQL", icon: "fa-solid fa-database", knowledge_percent: 50 },
      { id: 5, title: "Git & GitHub", icon: "fa-brands fa-github", knowledge_percent: 80 },
      { id: 6, title: "Python", icon: "fa-brands fa-python", knowledge_percent: 70 },
      { id: 7, title: "Bootstrap", icon: "fa-brands fa-bootstrap", knowledge_percent: 70 },
      { id: 8, title: "PHP", icon: "fa-brands fa-php", knowledge_percent: 70 },
      { id: 9, title: "MySQL", icon: "fa-solid fa-server", knowledge_percent: 60 }
    ]
  };

  return {
    getPortfolioData: async function () {
      return fallback;
    },
    getProjectById: async function (id) {
      return fallback.projects.find((project) => Number(project.id) === Number(id));
    },
    getCertificateById: async function (id) {
      return fallback.certificates.find((certificate) => Number(certificate.id) === Number(id));
    },
    saveContactMessage: async function (payload) {
      try {
        const key = "portfolio_messages";
        const messages = JSON.parse(localStorage.getItem(key) || "[]");
        messages.push({ ...payload, created_at: new Date().toISOString() });
        localStorage.setItem(key, JSON.stringify(messages));
        return { success: true, offline: true };
      } catch (error) {
        return { success: false, error: error.message };
      }
    }
  };
})();
