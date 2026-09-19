<div align="center">

  <h1>🚀 Neyamul Islam — Portfolio</h1>
  <p>A sleek, interactive, and fully responsive dark-mode portfolio website built with modern web technologies.</p>

  <p>
    <a href="https://nextjs.org"><img src="https://img.shields.io/badge/Next.js-14+-black?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js"></a>
    <a href="https://tailwindcss.com"><img src="https://img.shields.io/badge/Tailwind_CSS-3.4+-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS"></a>
    <a href="https://vercel.com"><img src="https://img.shields.io/badge/Vercel-Deployment-black?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel"></a>
  </p>

  <p>
    <a href="#-features">Features</a> •
    <a href="#-project-structure">Project Structure</a> •
    <a href="#️-getting-started">Getting Started</a> •
    <a href="#-customization">Customization</a> •
    <a href="#-deployment">Deployment</a>
  </p>

</div>

---

## ✨ Features

- **⚡ Modern Tech Stack:** Built with Next.js App Router and styled with Tailwind CSS.
- **🌙 Immersive Dark Mode:** Custom dark aesthetic complemented by dynamic glowing orbs, interactive particles, and smooth CSS animations.
- **✍️ Dynamic Typewriter Effect:** Highlights multiple developer roles and core competencies seamlessly.
- **📊 Interactive Skill Bars & Stats:** Displays technical proficiencies alongside milestone metrics.
- **💻 GitHub Project Integration:** Clean grid layout showcasing featured development work with direct source links.
- **✉️ Functional Contact Section:** Direct communication layout allowing visitors to reach out instantly.
- **📱 Fully Responsive:** Optimized layout providing a seamless experience across mobile, tablet, and desktop viewports.

---

## 📁 Project Structure

```text
portfolio/
├── src/
│   ├── app/
│   │   ├── globals.css         ← Global styles, custom utilities & keyframe animations
│   │   ├── layout.js           ← Root layout (fonts, metadata, HTML structure)
│   │   └── page.js             ← Main entry point combining all portfolio sections
│   └── components/
│       ├── AnimatedBackground.js  ← Dynamic background orbs, grid & particle effects
│       ├── Navbar.js              ← Sticky responsive navigation bar
│       ├── Hero.js                ← Hero section featuring typewriter role animations
│       ├── About.js               ← Bio, background overview, and professional stats
│       ├── Skills.js              ← Skill proficiency bars and tooling stack grid
│       ├── Projects.js            ← Featured GitHub projects showcase
│       ├── Contact.js             ← Direct contact form & social links
│       └── Footer.js              ← Site footer with copyright and credits
├── public/
│   └── profile.png             ← Personal profile photograph
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── next.config.js
