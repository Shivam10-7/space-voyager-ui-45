
# 🌌 Space Dashboard

A web-based dashboard that visualizes live or simulated space mission data, including satellite telemetry, ISS location, Mars weather updates, and asteroid tracking. This project is designed to be a frontend-only, interactive, and educational space data explorer.

---

## 🚀 Project Overview

This dashboard brings together multiple types of space-related data into one clean, modular interface. It provides visual insights using maps, charts, and data cards—ideal for researchers, students, or anyone interested in space missions.

---

## 🛰️ Features

- 📡 **Satellite Telemetry** – Simulated data for speed, altitude, battery, and orbit time.  
- 🗺️ **ISS Tracker** – Live tracking of the International Space Station using real-time coordinates.  
- 🌌 **Mars Weather** – Simulated Martian temperature, pressure, and wind data.  
- ☄️ **Asteroid Watch** – Close-approach object list with size, distance, and approach date.  
- 📊 **Interactive Visuals** – Charts, gauges, and maps for engaging user experience.  
- 🔄 **Live + Simulated Modes** – Easily switch between real and mock data for demos or offline use.

---

## 🧰 Tech Stack

| Category           | Tools Used                                   |
|--------------------|----------------------------------------------|
| **Frontend**        | React (with TypeScript)                      |
| **Build Tool**      | Vite                                         |
| **Styling**         | Tailwind CSS, PostCSS                        |
| **UI Components**   | Custom + third-party (in `components/ui/`)  |
| **Visualization**   | Recharts, Leaflet / Three.js (if needed)     |
| **Linting**         | ESLint                                       |
| **Package Manager** | npm / yarn / bun                             |
| **Typing**          | TypeScript                                   |

---

## ⚙️ Setup Instructions

```bash
# 1. Clone the repo
git clone https://github.com/your-username/space-dashboard.git

# 2. Navigate to the project folder
cd space-dashboard

# 3. Install dependencies
npm install

# 4. Start development server
npm run dev
```

---

## 📁 Project Structure (Sample)

```
src/
│
├── components/
│   ├── Navbar.tsx
│   ├── ISSMap.tsx
│   ├── TelemetryPanel.tsx
│   └── MarsWeatherCard.tsx
│
├── data/
│   └── simulatedData.json
│
├── App.tsx
└── main.tsx
```

---

## ✅ Feasibility Summary

- **Technical:** Uses popular tools like React, Tailwind, and chart libraries; all well-supported.  
- **Operational:** Clean UI, no technical knowledge required to use.  
- **Economic:** Free and open-source tools, no backend/server costs.  
- **Schedule:** Modular structure supports quick development and testing.

---

## 📜 License

This project is open-source and free to use under the [MIT License](LICENSE).

---

## ✨ Credits

Developed as part of a hackathon project. Powered by curiosity and caffeine.
