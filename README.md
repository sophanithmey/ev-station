# ⚡ Cambodia EV Charging Stations Directory & Live Map

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Leaflet](https://img.shields.io/badge/Leaflet-1.9-199900?logo=leaflet&logoColor=white)](https://leafletjs.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

An interactive, responsive directory and live map of **104+ electric vehicle (EV) charging stations** across Cambodia. Designed to empower clean-energy travel with real-time GPS navigation, plug type filtering, operating hours, and seamless mobile support.

---

## 🌟 Features

- **🗺️ Interactive Cambodia Map**: Built with Leaflet, locked to Cambodia geographic bounds with custom pins by connector type.
- **📍 Real-Time GPS & Distance**: Locate yourself with live GPS and compute exact driving distances (`km away`) to all nearby stations.
- **🔌 Multi-Connector Filtering**: Filter effortlessly by plug types (`GB-T`, `CCS2`, `CCS/SAE`) and identify stations operating 24/7.
- **🧭 One-Click Google Maps Navigation**: Direct link to turn-by-turn directions and quick coordinate copying (`lat, lng`).
- **📱 Mobile-First Experience**: Floating map/list switcher and slide-up station preview drawer optimized for on-the-road EV drivers.
- **🌱 Eco-Friendly Aesthetic**: Botanical clean-energy design system with micro-animations, animated eco-highway cards, and zero emissions encouragement.
- **⚡ 100% Serverless & Static**: Zero backend dependencies, no private API keys required, and instant worldwide CDN caching.

---

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/) with [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) (modern CSS-first engine)
- **Mapping**: [Leaflet](https://leafletjs.com/) & [OpenStreetMap](https://www.openstreetmap.org/)
- **Typography**: [Bricolage Grotesque](https://fonts.google.com/specimen/Bricolage+Grotesque) & [Inter](https://fonts.google.com/specimen/Inter)
- **Code Quality**: [Oxlint](https://oxc.rs/) (high-performance Rust linter)

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18.0.0 or higher, v22 recommended)
- [Yarn](https://yarnpkg.com/) or [npm](https://www.npmjs.com/)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/msophanith/ev-station.git
   cd ev-station
   ```

2. **Install dependencies**:
   ```bash
   yarn install
   # or
   npm install
   ```

3. **Start the local development server**:
   ```bash
   yarn dev
   # or
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📦 Available Scripts

| Command | Description |
|---|---|
| `yarn dev` | Starts the Vite development server with HMR |
| `yarn build` | Type-checks with `tsc` and builds the production bundle in `dist/` |
| `yarn preview` | Locally previews the production build |
| `yarn lint` | Runs `oxlint` for fast Rust-powered linting |
| `yarn clean` | Cleans build cache, removes `node_modules`, and reinstalls |

---

## 📁 Project Structure

```text
ev-station/
├── public/                 # Static assets (favicons, Open Graph banner)
├── src/
│   ├── assets/             # Vector icons and illustrations
│   ├── components/         # Modular UI components (< 200 lines each)
│   │   ├── map/            # Leaflet map controls, markers, popups, and HUD
│   │   ├── card-road-animation.tsx  # Animated eco-highway micro-interaction
│   │   ├── station-card.tsx         # Station item card with actions
│   │   ├── station-filters.tsx      # Plug and 24/7 filter bar
│   │   ├── header.tsx               # Top navigation bar
│   │   ├── app-footer.tsx           # Desktop disclaimer footer
│   │   └── disclaimer-modal.tsx     # Full legal & data source modal
│   ├── data/
│   │   └── charging-stations.ts     # 104 verified EV station records
│   ├── hooks/
│   │   ├── use-station-filters.ts   # Search & filter business logic
│   │   └── use-user-location.ts     # Geolocation & haversine distance
│   ├── index.css           # Tailwind v4 theme, fonts & animations
│   ├── App.tsx             # Root layout orchestrator
│   └── main.tsx            # Application entrypoint
├── index.html              # HTML shell with SEO & Open Graph meta tags
├── package.json
└── vite.config.ts
```

---

## 📋 Data Source & Disclaimer

The charging station directory data is based on public open data published by the **Ministry of Economy and Finance (MEF) Open Data Portal**:
- [MEF Open Data Dataset](https://data.mef.gov.kh/datasets/pd_67b6d073cb47dc00012464a6)

> **Disclaimer**: This website is an independent community project and is not affiliated with or endorsed by the Ministry of Economy and Finance or any charging network operators. Information such as real-time charger availability, pricing, and operating status may change. EV drivers are advised to verify details with station operators prior to travel.

---

## 👤 Author

**Sophanith Mey**
- GitHub: [@msophanith](https://github.com/msophanith)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
