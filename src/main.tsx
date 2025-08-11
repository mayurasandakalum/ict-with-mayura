import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { StudyPage } from "./pages/StudyPage";
import "./style.css";

function App() {
  return (
    <BrowserRouter basename="/ict-with-mayura">
      <div className="flex flex-col h-screen p-2">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/study/:level" element={<StudyPage />} />
        </Routes>
      </div>
    </BrowserRouter>
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
