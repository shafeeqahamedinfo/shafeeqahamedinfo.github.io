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
        "www.linkedin.com/in/shafeeqahamedinfo"
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
        company: "Freelance | Self-Employed",
        role: "Student Developer",
        employment_type: "Freelance",
        year_start: "Sep 2024",
        year_end: null,
        location: "Tamil Nadu, India · Remote",
        description:
          "Freelance student developer creating web and mobile web experiences.",
        skills: ["Visual Web Development", "Mobile Web Design"],
        company_url: "https://www.linkedin.com/company/1256222/"
      },
      {
        id: 2,
        company: "Danfoss",
        role: "Warehouse Team Member",
        employment_type: "Full-time",
        year_start: "Nov 2023",
        year_end: "Sep 2024",
        location: "India · Hybrid",
        description: "Warehouse team member with experience in SAP Warehouse Management.",
        skills: ["SAP Warehouse Management"],
        company_url: "https://www.linkedin.com/company/3260/"
      },
      {
        id: 3,
        company: "JBM Group",
        role: "Quality Control",
        employment_type: "Full-time",
        year_start: "Jun 2023",
        year_end: "Nov 2023",
        location: "India · Hybrid",
        description: "Worked in quality control at JBM Group.",
        skills: ["Quality Control"],
        company_url: "https://www.linkedin.com/company/132712/"
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
      {
        id: 7,
        title: "Simple Calculator",
        summary: "Mobile calculator application",
        description:
          "A simple and responsive Flutter calculator app for basic arithmetic operations, featuring a clean dark interface and large touch-friendly controls.",
        tech_stack: ["Flutter", "Dart"],
        images: [
          "assets/image porject/flutter & dart/Simple Calculator flutter/Simple Calculator 2.jpeg",
          "assets/image porject/flutter & dart/Simple Calculator flutter/Simple Calculator.jpeg"
          
        ],
        live_url: "https://github.com/shafeeqahamedinfo/flutter-app-file",
        github_url: "https://github.com/shafeeqahamedinfo/flutter-app-file"
      },
      {
        id: 8,
        title: "Text to Voice",
        summary: "Flutter text-to-speech application",
        description:
          "A Flutter text-to-speech application with speed, pitch and volume controls, a speech microphone option, history, replay and clear controls.",
        tech_stack: ["Flutter", "Dart", "Text-to-Speech"],
        images: [
          "assets/image porject/flutter & dart/text to vioce flutter/text to vioce  (1).jpeg",
          "assets/image porject/flutter & dart/text to vioce flutter/text to vioce  (2).jpeg",
          "assets/image porject/flutter & dart/text to vioce flutter/text to vioce  (3).jpeg"
        ],
        live_url: "https://github.com/shafeeqahamedinfo/flutter-app-file",
        github_url: "https://github.com/shafeeqahamedinfo/flutter-app-file"
      },
      {
        id: 9,
        title: "SmartCampus IT Care",
        summary: "MERN campus IT support and ticketing platform",
        description:
          "A role-based MERN stack IT support system for SmartCampus with student ticket creation, IT staff assignment, admin analytics, SLA monitoring, knowledge base articles, departments, categories, reports and activity logs.",
        tech_stack: ["MongoDB", "Express.js", "React", "Node.js", "MERN Stack"],
        images: [
          "assets/image porject/it care support/it support.png",
          "assets/image porject/it care support/it studend (5).png",
          "assets/image porject/it care support/it studend (4).png",
          "assets/image porject/it care support/it studend (3).png",
          "assets/image porject/it care support/it studend (2).png",
          "assets/image porject/it care support/it studend (1).png",
          "assets/image porject/it care support/it support (1).png",
          "assets/image porject/it care support/it support (2).png",
          "assets/image porject/it care support/it support (3).png",
          "assets/image porject/it care support/it support (4).png",
          "assets/image porject/it care support/it support (5).png",
          "assets/image porject/it care support/it support (6).png",
          "assets/image porject/it care support/it support (7).png",
          "assets/image porject/it care support/it support (8).png",
          "assets/image porject/it care support/it support (9).png",
          "assets/image porject/it care support/it support (10).png",
          "assets/image porject/it care support/it staff (1).png",
          "assets/image porject/it care support/it staff (02).png",
          "assets/image porject/it care support/it staff (3).png",
          "assets/image porject/it care support/it staff (04).png"
        ],
        live_url: "https://github.com/shafeeqahamedinfo/IT-Support-Ticket-Management-System",
        github_url: "https://github.com/shafeeqahamedinfo/IT-Support-Ticket-Management-System"
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
      },
      {
        id: 3,
        title: "Full Stack Development Internship",
        summary: "Internship Certificate",
        description:
          "Completed a Summer Internship Training Program in Full Stack Development with Widezo Private Limited from 05 June 2025 to 03 July 2025.",
        image_url: "assets/Certifications/Modern Blue Internship Certificate.png",
        certificate_url: "assets/Certifications/Modern Blue Internship Certificate.png",
        issued_by: "Widezo Private Limited",
        issued_on: "05 JUN - 03 JUL 2025"
      },
      {
        id: 4,
        title: "Spot Recognition Award",
        summary: "Danfoss Recognition Award",
        description:
          "Received the Danfoss Spot Recognition Award for taking ownership of customer needs and demonstrating a customer-centric approach.",
        image_url: "assets/Certifications/Danfoss Spot Recognition Award.png",
        certificate_url: "assets/Certifications/Danfoss Spot Recognition Award.png",
        issued_by: "Danfoss",
        issued_on: "30 APR 2024"
      },
      {
        id: 5,
        title: "COMPSEM'25 - Web Development & Design",
        summary: "Certificate of Appreciation",
        description:
          "Awarded 11th place in the Web Development & Design event at COMPSEM'25, organized by the Department of Computer Science and Engineering, Annamalai University.",
        image_url: "assets/Certifications/Annamalai University Certificate of Appreciation.png",
        certificate_url: "assets/Certifications/Annamalai University Certificate of Appreciation.png",
        issued_by: "Annamalai University",
        issued_on: "19 MAR 2025"
      },
      {
        id: 6,
        title: "FEAT Library Voluntary Service",
        summary: "Certificate of Appreciation",
        description:
          "Recognized for voluntary repair and maintenance work on computers and related infrastructure at the FEAT Library from 17 to 21 August 2026.",
        image_url: "assets/Certifications/Annamalai University Appreciation Certificate.png",
        certificate_url: "assets/Certifications/Annamalai University Appreciation Certificate.png",
        issued_by: "Annamalai University - FEAT Library",
        issued_on: "17 - 21 AUG 2026"
      },
      {
        id: 7,
        title: "COMPSEM'26 - UI/UX Design",
        summary: "Certificate of Appreciation",
        description:
          "Secured 3rd place in the UI/UX Design event at COMPSEM'26, organized by the Department of Computer Science and Engineering, Annamalai University.",
        image_url: "assets/Certifications/Annamalai University Appreciation Certificate (1).png",
        certificate_url: "assets/Certifications/Annamalai University Appreciation Certificate (1).png",
        issued_by: "Annamalai University",
        issued_on: "18 APR 2026"
      }
    ],

    skills: [
      { id: 1, title: "HTML", category: "Web Development", icon: "fa-brands fa-html5", knowledge_percent: 90 },
      { id: 2, title: "CSS", category: "Web Development", icon: "fa-brands fa-css3-alt", knowledge_percent: 75 },
      { id: 3, title: "JavaScript", category: "Web Development", icon: "fa-brands fa-js", knowledge_percent: 60 },
      { id: 4, title: "SQL", category: "Databases & Developer Tools", icon: "fa-solid fa-database", knowledge_percent: 50 },
      { id: 5, title: "Git & GitHub", category: "Databases & Developer Tools", icon: "fa-brands fa-github", knowledge_percent: 80 },
      { id: 6, title: "Python", category: "Programming & Mobile Development", icon: "fa-brands fa-python", knowledge_percent: 70 },
      { id: 7, title: "Bootstrap", category: "Web Development", icon: "fa-brands fa-bootstrap", knowledge_percent: 70 },
      { id: 8, title: "PHP", category: "Web Development", icon: "fa-brands fa-php", knowledge_percent: 70 },
      { id: 9, title: "MySQL", category: "Databases & Developer Tools", icon: "fa-solid fa-server", knowledge_percent: 60 },
      { id: 10, title: "Flutter", category: "Programming & Mobile Development", icon: "fa-solid fa-mobile-screen-button", knowledge_percent: 50 },
      { id: 11, title: "Dart", category: "Programming & Mobile Development", icon: "fa-solid fa-code", knowledge_percent: 50 },
      { id: 12, title: "MERN Stack", category: "Web Development", icon: "fa-brands fa-react", knowledge_percent: 50 },
      { id: 13, title: "IT Support", category: "IT Support & Hardware", full_name: "IT Support & Troubleshooting", icon: "fa-solid fa-headset", knowledge_percent: 50 },
      { id: 14, title: "Windows Install", category: "Operating Systems & Networking", full_name: "Operating System Installation (Windows)", icon: "fa-brands fa-windows", knowledge_percent: 50 },
      { id: 15, title: "MS Office", category: "Office Productivity", full_name: "MS Office (Word, Excel, PowerPoint)", icon: "fa-solid fa-file-word", knowledge_percent: 50 },
      { id: 16, title: "Software Setup", category: "IT Support & Hardware", full_name: "Software Installation & Configuration", icon: "fa-solid fa-gears", knowledge_percent: 50 },
      { id: 17, title: "HW/SW Troubleshooting", category: "IT Support & Hardware", full_name: "Hardware and Software Troubleshooting", icon: "fa-solid fa-screwdriver-wrench", knowledge_percent: 50 },
      { id: 18, title: "Driver Updates", category: "IT Support & Hardware", full_name: "Driver Installation & Updates", icon: "fa-solid fa-download", knowledge_percent: 50 },
      { id: 19, title: "Networking", category: "Operating Systems & Networking", full_name: "Basic Networking & Connectivity Troubleshooting", icon: "fa-solid fa-wifi", knowledge_percent: 50 },
      { id: 20, title: "Windows Setup", category: "Operating Systems & Networking", full_name: "System Formatting and Windows Configuration", icon: "fa-brands fa-windows", knowledge_percent: 50 },
      { id: 21, title: "Linux Install", category: "Operating Systems & Networking", full_name: "Linux Operating System Installation", icon: "fa-brands fa-linux", knowledge_percent: 50 },
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
