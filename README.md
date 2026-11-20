# GramaGlow — Digital Gram Panchayat Governance Portal (Pipri)

![HTML5](https://img.shields.io/badge/HTML5-Semantic-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-Liquid_Glass-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?logo=javascript&logoColor=black)
![Bilingual](https://img.shields.io/badge/Language-English%20%7C%20%E0%A4%B9%E0%A4%BF%E0%A4%82%E0%A4%A6%E0%A5%80-059669)
![Zero Dependencies](https://img.shields.io/badge/Dependencies-Zero-0066CC)

**GramaGlow** is a transparent, mobile-first rural e-governance and citizen services web portal designed for **Pipri Gram Panchayat** (Population: `3,420` across `8` electoral wards). Built with a high-contrast, accessible **Liquid Glass** interface in both **English** and **Hindi (`हिंदी`)**, it bridges the information gap between village administration and rural citizens.

---

## Key Features

- **Bilingual Rural-Accessible UI (`अ / A` Toggle):** Instant switching between **English** and **Hindi (`हिंदी`)** across all navigation tabs, category filters, status badges, leadership rosters, and budget cards using `Noto Sans Devanagari` and `Mukta` typography (`14px` minimum badges, `16px–18px` body text).
- **Village Overview & Governance Roster:** Highlights the upcoming Gram Sabha meeting, Panchayat Seva Kendra operating hours (`9:00 AM – 5:00 PM`), key demographic KPIs (`3,420` population, `8` wards, `₹18.5L` sanctioned funds, `92%` issue resolution rate), elected Sarpanch contact card, and a collapsible 8-ward council roster.
- **Official Notices & Audio Broadcaster:** Categorized village circulars (`Gram Sabha`, `Agriculture`, `Health`, `Education`) paired with a spoken Hindi script reader powered by the browser's native Web Speech API (`window.speechSynthesis`) for non-literate community elders.
- **Dual-Bar Public Budget & Work Tracker:** Transparently compares **Physical Work Completed** (Emerald Green) against **Funds Utilized** (Warm Amber) for every public infrastructure project, automatically flagging projects where expenditure exceeds physical completion.
- **Public Grievance & 48-Hour SLA Board:** Tracks ward complaints sorted by SLA priority (overdue tickets pinned first) with a connected 4-step progress tracker (`Submitted` → `Assigned` → `In Progress` → `Resolved`) and field photo evidence modal.
- **Village Assets Geo-Directory:** Interactive SVG village map and filterable directory locating Pipri's Primary Health Sub-Center, Zilla Parishad School, Anganwadi Center, and Community Solar Borewell.

---

## Project Structure

```text
gramaglow-digital-panchayat/
├── index.html      # Semantic HTML5 layout, SVG village map, and responsive navigation
├── styles.css      # Liquid glass design system, ambient orbs, and accessible typography
├── app.js          # Bilingual dictionary (EN/HI), Pipri village dataset, Web Speech API & controllers
└── README.md       # Project documentation and setup instructions
