# Shafeeq Ahamed M - Personal Portfolio Website

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![FontAwesome](https://img.shields.io/badge/Font__Awesome-339AF0?style=for-the-badge&logo=fontawesome&logoColor=white)
![Status](https://img.shields.io/badge/Status-Active%20%26%20Complete-brightgreen?style=for-the-badge)

A modern, high-performance static portfolio website built for **Shafeeq Ahamed M** — Web Developer & Computer Science Student at Annamalai University. Designed with a dark glassmorphism aesthetic, metallic gold accents, ambient background glows, interactive matrix canvas animations, and full mobile responsiveness.

---

## 🌟 Key Features

* **Dark Glassmorphism Design System**: Ultra-modern frosted glass containers with backdrop blur, metallic gold accent borders, and dynamic hover animations.
* **Hero Section**: 2-column split layout featuring a framed profile avatar (`shafeeq.jpeg`), pulse availability indicator, quick action CTAs, and social links.
* **About & Education Journey**: Detailed academic timeline showcasing transition from Diploma in Mechanical Engineering (MRK Polytechnic College) to B.E. in Computer Science & Engineering (Annamalai University).
* **Interactive Skills Grid**: Curated technical skills featuring FontAwesome brand icons (`HTML5`, `CSS3`, `JavaScript`, `SQL`, `Git & GitHub`, `Python`, `Bootstrap`, `PHP`, `MySQL`) with animated golden shimmer progress bars.
* **Featured Projects Showcase**: Project gallery with uncropped screenshots, tech stack tags, live preview links, source code links, and dedicated detail pages (`project.html?id=X`).
* **Verified Certifications**: NPTEL course certifications (Cloud Computing, Social Networks) with credential metadata and verification links (`certificate.html?id=X`).
* **Contact Section**: Interactive form with local storage persistence and quick contact channels (Email, Phone, Location).
* **Zero Dependencies**: 100% frontend static site — runs natively under both `file://` protocol (local disk) and `http://` / `https://` web servers.

---

## 📁 Project Structure

```text
├── index.html                  # Main portfolio homepage
├── project.html                # Dynamic project details page
├── certificate.html            # Dynamic certificate details page
├── shafeeq.jpeg                # Profile picture asset
├── hero-profile.png            # Hero executive avatar image
├── about-profile.png           # About section workspace portrait
├── RECYCLEZONE.png             # Project screenshot asset
├── assets/
│   ├── css/
│   │   └── styles.css          # Comprehensive CSS design system & responsive rules
│   ├── js/
│   │   ├── dataService.js      # Portfolio data service namespace (window.PortfolioData)
│   │   ├── main.js             # Matrix rain effect, scroll reveal & contact form logic
│   │   ├── skillRenderer.js    # Skills grid renderer namespace (window.renderSkills)
│   │   ├── project-details.js  # Project gallery slider & details renderer
│   │   └── certificate-details.js # Certificate details renderer
│   └── image porject/          # Project screenshot image folders
│       ├── billing/            # Billing software screenshots
│       ├── compsem/            # COMPSEM symposium screenshots
│       └── pwms/               # Cloud Store screenshots
└── README.md                   # Documentation file
```

---

## 🚀 How to Run Locally

### Option 1: Direct File Explorer (No Installation Required)
Simply double-click `index.html` in your file explorer to open the website directly in any browser (`file:///.../index.html`).

### Option 2: Live Server (VS Code Extension)
1. Open the project folder in **VS Code**.
2. Install the **Live Server** extension.
3. Open `index.html` and click **"Go Live"** in the status bar.

### Option 3: Local Python HTTP Server
Run the following command in your terminal inside the project directory:

```bash
python -m http.server 5500
```

Then visit: `http://localhost:5500/index.html`

---

## 🌐 Deploying to GitHub Pages

This website is pre-configured for instant hosting on **GitHub Pages**:

1. Push your code to your GitHub repository:
   ```bash
   git add .
   git commit -m "Deploy portfolio website"
   git push origin main
   ```
2. Navigate to your repository on GitHub.
3. Go to **Settings** -> **Pages**.
4. Set **Source** to `Deploy from a branch` and select `main` / `/ (root)`.
5. Click **Save**. Your site will be live at `https://shafeeqahamedinfo.github.io/`.

---

## 👤 Author & Contact

**Shafeeq Ahamed M**
* **Degree**: B.E. Computer Science and Engineering, Annamalai University (2024–2027)
* **Diploma**: Diploma in Mechanical Engineering, MRK Polytechnic College (2020–2023)
* **Email**: [m.shafeeqahamed2004@gmail.com](mailto:m.shafeeqahamed2004@gmail.com)
* **Phone**: [+91 8489481039](tel:+918489481039)
* **Location**: Tamil Nadu, India
* **GitHub**: [github.com/shafeeqahamedinfo](https://github.com/shafeeqahamedinfo)
* **LinkedIn**: [linkedin.com/in/shafeeqahamed-m-40b72a309](https://www.linkedin.com/in/shafeeqahamed-m-40b72a309/)
* **Instagram**: [@m_shafeeqahamed_sad](https://www.instagram.com/m_shafeeqahamed_sad/profilecard/)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
