// Study page hosting the Markmap visualization for selected level
import { useParams, useNavigate } from "react-router-dom";
import MarkmapHooks from "../components/MarkmapHooks";
import { useEffect, useState } from "react";
import { loadMarkdown } from "../lib/loadMarkdown";
import { ThemeToggle } from "../components/ThemeToggle";

export function StudyPage() {
  const { level } = useParams<{ level?: string }>();
  const navigate = useNavigate();
  const [markdown, setMarkdown] = useState<string>("පූරණය වෙමින්...");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!level) return;
    const path = `data/${level}.md`;
    loadMarkdown(path)
      .then(setMarkdown)
      .catch((e) => setError(e.message));
  }, [level]);

  return (
    <div className="mindmap-container">
      <div className="study-header">
        <button className="btn back-button" onClick={() => navigate("/")}>
          ← මුල් පිටුවට
        </button>
        <ThemeToggle />
      </div>
      {error ? (
        <div className="container" style={{ paddingTop: "64px" }}>
          <div
            className="card"
            style={{ textAlign: "center", color: "var(--danger)" }}
          >
            {error}
          </div>
        </div>
      ) : (
        <MarkmapHooks initialValue={markdown} />
      )}
    </div>
  );
}
