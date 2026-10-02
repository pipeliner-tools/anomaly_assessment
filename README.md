# Pipeline Metal Loss & Dent Integrity Assessment Tool (PWA)

[![Standards](https://img.shields.io/badge/Standards-ASME%20B31G%20%7C%20RSTRENG%20%7C%20POF%20100-00A5A8.svg)](#standards-implemented)
[![PWA Ready](https://img.shields.io/badge/PWA-100%25%20Offline%20Capable-00c853.svg)](#offline--pwa-capabilities)

A modern Progressive Web Application (PWA) for pipeline integrity assessment platform. Designed for pipeline integrity engineers, this tool provides deterministic engineering calculations for metal loss corrosion anomalies and geometric plain/kinked dents with zero external runtime dependencies.

---

## Key Highlights

- **100% Offline Ready**: All libraries are locally bundled to run without internet after initialization.
- **Progressive Web App (PWA)**: Installable as a native desktop or mobile application with offline pre-caching.
- **Comprehensive Standards Support**: Compliant with ASME B31G (Original & Modified 0.85dL), RSTRENG Effective Area, ASME B31.8 / API 1156 Dent Criteria, and POF 100 (Nov 2021) ILI Pipe Tally ingestion.

---

## Standards Implemented

| Standard / Code | Methodology / Scope |
| :--- | :--- |
| **ASME B31G (Original)** | Parabolic ($d/t \le 0.175$) & rectangular ($d/t > 0.175$) Folias factor $M = \sqrt{1 + 0.8\left(\frac{L^2}{Dt}\right)}$ |
| **ASME B31G (Modified)** | 0.85dL Effective Area, modified 2-term Folias factor $M = \sqrt{1 + 0.6275\left(\frac{L^2}{Dt}\right) - 0.003375\left(\frac{L^2}{Dt}\right)^2}$ |
| **RSTRENG (0.85dL)** | Effective Area Level 1 with Flow Stress $\sigma_{flow} = \text{SMYS} + 68.95\text{ MPa}$ ($+10\text{ ksi}$) |
| **ASME B31.8 / API 1156** | Plain & kinked dent strain criteria, depth threshold ($6\% \text{OD}$), and cyclic fatigue limits |
| **POF 100 (Nov 2021)** | Pipeline Operator Forum specification for In-Line Inspection (ILI) Pipe Tally anomaly reporting |

---

## License & Attribution

Designed and maintained for pipeline integrity management.
Developed in adherence with ASME, API, and POF guidelines.
