# Personal Portfolio (HTML + CSS + JavaScript + Supabase)

Modern, responsive personal portfolio website with:

- Home, About, Skills, Projects, Certificates, and Contact sections
- Dynamic detail pages for skills, projects, and certificates
- Contact form data storage in Supabase
- Supabase Auth powered admin login
- Admin dashboard for CRUD operations
- Supabase Storage image upload for projects and certificates

## Project Structure

- index.html
- skill.html
- project.html
- certificate.html
- admin-login.html
- admin.html
- assets/css/styles.css
- assets/js/config.js
- assets/js/supabaseClient.js
- assets/js/dataService.js
- assets/js/main.js
- assets/js/skill-details.js
- assets/js/project-details.js
- assets/js/certificate-details.js
- assets/js/admin-login.js
- assets/js/admin.js
- supabase/schema.sql

## 1) Supabase Setup

1. Create a new Supabase project.
2. Open SQL Editor and run supabase/schema.sql.
3. In Authentication, create an admin user (email/password).
4. In Site URL settings, add your local URL (for example http://127.0.0.1:5500).
5. Copy Project URL and anon public key.
6. Update assets/js/config.js:

```js
export const SUPABASE_URL = "https://YOUR_PROJECT_ID.supabase.co";
export const SUPABASE_ANON_KEY = "YOUR_SUPABASE_ANON_KEY";
```

## 2) Run Locally

You can run this project with any static server.

Option A: VS Code Live Server

- Open index.html
- Click "Go Live"

Option B: Python server

```bash
python -m http.server 5500
```

Then open:

- http://127.0.0.1:5500/index.html

## 3) Admin Usage

1. Open admin-login.html
2. Login using Supabase Auth admin credentials
3. Manage:

- About info
- Education timeline
- Skills
- Projects
- Certificates
- Contact submissions

## 4) Notes

- If Supabase is not configured, the frontend shows fallback demo data.
- Contact form uses localStorage fallback only when Supabase config is missing.
- Ensure RLS policies are applied as in supabase/schema.sql.

## 5) SEO and Performance

- Semantic HTML5 structure
- Meta description and keywords
- Lazy loading for images
- Lightweight vanilla JavaScript modules
