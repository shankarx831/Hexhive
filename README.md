# HexHive Solutions Experience Platform

![HexHive Logo](public/favicon_transparent.png)

A comprehensive React-based web application for HexHive Solutions, featuring program details, student registration, and automated document generation tools (Certificates & Invoices).

**Live Demo:** [https://shankarx831.github.io/Hexhive](https://shankarx831.github.io/Hexhive)

---

## 🚀 Tech Stack & Architecture

This project was recently migrated from Create React App (Webpack) to **Vite** for improved performance and development experience.

*   **Core Framework:** [React v18](https://reactjs.org/)
*   **Build Tool:** [Vite](https://vitejs.dev/) (Fast HMR & Optimized Builds)
*   **Styling:** [Tailwind CSS v3](https://tailwindcss.com/) (Utility-first styling system)
*   **Routing:** [React Router v6](https://reactrouter.com/) (HashRouter for GitHub Pages compatibility)
*   **PDF Generation:** `@react-pdf/renderer` (Client-side PDF creation)
*   **Deployment:** GitHub Pages (via `gh-pages`)

### Architecture Overview

The application is a **Single Page Application (SPA)** that runs entirely in the browser.

*   **Entry Point:** `src/index.jsx` mounts the React root.
*   **Routing:** `src/App.jsx` handles client-side routing.
*   **State Management:** Local component state (Hooks).
*   **Assets:** Optimized SVG/PNG assets in `public/`.

---

## ✨ Key Features

1.  **Landing Page (`Home.jsx`)**:
    *   Interactive Hero section with gradients.
    *   Animated statistics counters (`IntersectionObserver`).
    *   Responsive Grid layouts for feature showcases.

2.  **Programs (`Programs.jsx`)**:
    *   Detailed course curriculum (DevOps, Full Stack).
    *   Interactive Accordion UI for course details.

3.  **Registration (`Register.jsx`)**:
    *   Comprehensive enrollment form.
    *   Real-time form validation.
    *   Integration with Formspree for submissions.

4.  **Tools**:
    *   **Certificate Generator:** Generates downloadable completion certificates instantly.
    *   **Invoice Generator:** A fully functional invoice creation tool for billing.

---

## 🛠️ Setup & Development

### Prerequisites
*   Node.js (v16+)
*   npm

### Installation

```bash
# Clone the repository
git clone https://github.com/shankarx831/Hexhive.git

# Navigate to project
cd hexhive-app

# Install dependencies
npm install
```

### Development Server

Start the fast Vite development server:

```bash
npm start
# OR
npm run dev
```

Runs on [http://localhost:3000](http://localhost:3000).

### Production Build

Create an optimized build in the `build/` directory:

```bash
npm run build
```

---

## 📦 File Structure

```
hexhive-app/
├── public/              # Static assets (favicons, manifests)
├── src/
│   ├── components/      # Reusable UI components (Navbar, Footer, PDFs)
│   ├── pages/           # Route components (Home, Register, Programs)
│   ├── utils/           # Helper functions
│   ├── App.jsx          # Main routing logic
│   ├── index.jsx        # Entry point
│   ├── index.css        # Global Tailwind directives
│   └── ...
├── vite.config.js       # Vite configuration
├── tailwind.config.js   # Tailwind theme customization
└── package.json         # Dependencies & Scripts
```

---

## 🚀 Deployment

The site is hosted on **GitHub Pages**.

### Automated Deployment Script
We use a custom shell script to handle building, committing, and deploying in one go.

```bash
./deploy.sh
```

**What this script does:**
1.  Prompts for a commit message.
2.  Commits all changes to the `main` branch.
3.  Pushes to GitHub.
4.  Runs `npm run build` (Vite build).
5.  Runs `gh-pages -d build` to publish to the `gh-pages` branch.

### Manual Deployment
If you prefer manual deployment:

```bash
npm run build
npm run deploy
```

---

## 🛡️ Linting & Code Quality

The project enforces code quality using **ESLint**.

```bash
# Check for lint errors
npx eslint src

# Config file
.eslintrc.js
```

---

© 2025 HexHive Solutions.
