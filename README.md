# Pipeline Metal Loss & Dent Integrity Assessment Tool (PWA)

[![Standards](https://img.shields.io/badge/Standards-ASME%20B31G%20%7C%20RSTRENG%20%7C%20API%20579%20%7C%20POF%20100-00A5A8.svg)](#standards-implemented)
[![PWA Ready](https://img.shields.io/badge/PWA-100%25%20Offline%20Capable-00c853.svg)](#offline--pwa-capabilities)
[![GitHub Pages](https://img.shields.io/badge/Deployment-GitHub%20Pages%20Ready-blue.svg)](#hosting-on-github-pages)

A modern, production-grade Progressive Web Application (PWA) and Fitness-For-Service (FFS) pipeline integrity assessment platform. Designed for pipeline integrity engineers, field inspectors, and cathodic protection specialists, this tool provides deterministic engineering calculations for metal loss corrosion anomalies and geometric plain/kinked dents with zero external runtime dependencies.

---

## Key Highlights

- **100% Air-Gapped & Offline Ready**: All libraries (`Chart.js`, `SheetJS`, `pdfMake`, `vfs_fonts`) are locally bundled in `./lib/`. Runs without internet connection in field inspection tablets and secure corporate intranets.
- **Progressive Web App (PWA)**: Installable as a native desktop or mobile application with offline precaching via Service Worker (`sw.js`).
- **GitHub Pages Ready**: Out-of-the-box configuration with `.nojekyll`, strict relative paths (`./`), and dual entry points (`index.html` and `MLA.html`).
- **Comprehensive Standards Support**: Compliant with ASME B31G (Original & Modified 0.85dL), RSTRENG Effective Area, API 579-1 / ASME FFS-1 Level 1/2, ASME B31.8 / API 1156 Dent Criteria, and POF 100 (Nov 2021) ILI Pipe Tally ingestion.

---

## Hosting on GitHub Pages

This repository is pre-configured for instant one-click deployment to GitHub Pages.

### Setup Instructions

1. **Push Repository to GitHub**:
   Ensure all files (including `.nojekyll`, `manifest.json`, `sw.js`, `lib/`, `icons/`, and `index.html`) are committed and pushed to your GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "Deploy Pipeline Metal Loss Assessment PWA"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-repo-name>.git
   git push -u origin main
   ```

2. **Configure GitHub Pages in Settings**:
   - In your GitHub repository, navigate to **Settings** (tab at top).
   - In the left sidebar, click **Pages** (under the "Code and automation" section).
   - Under **Build and deployment** > **Source**, select **Deploy from a branch**.
   - Under **Branch**:
     - Choose `main` (or `master`).
     - Choose folder: `/ (root)`.
   - Click **Save**.

3. **Access Your Live App**:
   - Within 1–2 minutes, GitHub Actions will publish your site.
   - Your application will be live at:
     ```
     https://<your-username>.github.io/<your-repo-name>/
     ```
   - Both `https://<your-username>.github.io/<your-repo-name>/` and `https://<your-username>.github.io/<your-repo-name>/MLA.html` will load identically.

> [!NOTE]
> The included `.nojekyll` file in the root directory instructs GitHub Pages to bypass the default Jekyll build engine. This guarantees that all local scripts in `./lib/` and static resources are served directly with the correct MIME types.

---

## Offline & PWA Capabilities

### Installing the PWA
- **Desktop (Google Chrome, Microsoft Edge, Brave)**:
  - When you visit the site, click the **"Install App"** button in the top navigation bar or click the install icon in the browser address bar.
  - The app installs as a standalone desktop program with its own window, taskbar icon, and offline access.
- **Mobile & Tablet (Android / iOS)**:
  - **Android (Chrome)**: Tap the banner prompt or browser menu (⋮) > **"Add to Home screen"** / **"Install app"**.
  - **iOS (Safari)**: Tap the Share button (square with arrow) > scroll down and tap **"Add to Home Screen"**.

### Offline Mode & Field Use
- The application utilizes a Service Worker (`sw.js`) that automatically caches the entire application shell, stylesheets, icons, and calculation libraries upon first load.
- In field conditions with no cellular/Wi-Fi coverage, the tool automatically switches to **Offline Mode** (indicated by the amber `● Offline Mode` badge in the header).
- All calculations, interactive charts, Excel imports/exports, and PDF generation remain fully operational offline.

---

## Local Development & Testing

You can also run the tool locally without web hosting.

### Option 1: Direct File Access
Simply double-click `index.html` or `MLA.html` in your file explorer to open it directly in any modern browser. All computational features, exports, and charts will function normally via the local `./lib/` files.

### Option 2: Local HTTP Server (Recommended for PWA Testing)
Browsers require an `http://localhost` or `https://` context to register Service Workers and test PWA installation:

```bash
# Using Python 3:
python -m http.server 8000

# Using Node.js npx:
npx serve .
```
Then navigate to `http://localhost:8000`.

### Option 3: Running Automated Test Suites
The project includes automated regression and verification test suites:
```bash
node "scratch/run_all_suites.js"
```
Verifies math models, CGR logic, POF 100 auto-mapping, unit conversions, and benchmark comparisons against ASME B31G formulas.

---

## Directory Structure

```
├── .nojekyll                 # Disables Jekyll on GitHub Pages to serve all static assets
├── index.html                # GitHub Pages default entry point (PWA enabled)
├── MLA.html                  # Standalone mirror entry point
├── manifest.json             # Web App Manifest (display: standalone, theme colors, shortcuts)
├── sw.js                     # PWA Service Worker (offline caching & app shell precache)
├── README.md                 # Project documentation and deployment guide
├── favicon.ico / .png / .svg # App favicons
├── icons/                    # High-resolution PWA icons (192px, 512px, maskable, SVG)
│   ├── icon-192.png
│   ├── icon-512.png
│   ├── icon-maskable.png
│   └── icon.svg
└── lib/                      # Offline vendored JavaScript dependencies
    ├── chart.umd.min.js      # Interactive charts (Pressure vs MAOP, defect profiles)
    ├── xlsx.full.min.js      # SheetJS for Excel/ILI pipe tally import & export
    ├── pdfmake.min.js        # Client-side PDF reporting engine
    └── vfs_fonts.js          # Standard Roboto font bundle for PDF generation
```

---

## Standards Implemented

| Standard / Code | Methodology / Scope |
| :--- | :--- |
| **ASME B31G (Original)** | Parabolic ($d/t \le 0.175$) & rectangular ($d/t > 0.175$) Folias factor $M = \sqrt{1 + 0.8\left(\frac{L^2}{Dt}\right)}$ |
| **ASME B31G (Modified)** | 0.85dL Effective Area, modified 2-term Folias factor $M = \sqrt{1 + 0.6275\left(\frac{L^2}{Dt}\right) - 0.003375\left(\frac{L^2}{Dt}\right)^2}$ |
| **RSTRENG (0.85dL)** | Effective Area Level 1 with Flow Stress $\sigma_{flow} = \text{SMYS} + 68.95\text{ MPa}$ ($+10\text{ ksi}$) |
| **API 579-1 / ASME FFS-1** | Part 5 Metal Loss Assessment (Level 1 / Level 2 Screening Criteria) |
| **ASME B31.8 / API 1156** | Plain & kinked dent strain criteria, depth threshold ($6\% \text{OD}$), and cyclic fatigue limits |
| **POF 100 (Nov 2021)** | Pipeline Operator Forum specification for In-Line Inspection (ILI) Pipe Tally anomaly reporting |

---

## License & Attribution

Designed and maintained for pipeline integrity management and regulatory compliance.
Developed in adherence with ASME, API, and POF guidelines.
