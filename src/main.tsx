import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { StudyPage } from "./pages/StudyPage";
import { ThemeProvider } from "./contexts/ThemeContext";
import { initializeAnalytics } from "./lib/analytics";
import "./style.css";

// Initialize analytics system (safe to call in browser environments)
try {
  initializeAnalytics();
} catch (error) {
  // eslint-disable-next-line no-console
  console.error("Failed to initialize analytics:", error);
}

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter basename="/ict-with-mayura">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/study/:level" element={<StudyPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

const container = document.getElementById("root");
if (!container) throw new Error("Root container missing #root");
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
