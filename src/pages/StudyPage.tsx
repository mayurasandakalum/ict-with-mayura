// Study page hosting the Markmap visualization for selected level
import { useParams, useNavigate } from "react-router-dom";
import MarkmapHooks from "../components/MarkmapHooks";
import { useEffect, useState } from "react";
import { loadMarkdown } from "../lib/loadMarkdown";

export function StudyPage() {
  const { level } = useParams<{ level: "ol" | "al-12" }>();
  const navigate = useNavigate();
  const [markdown, setMarkdown] = useState<string>("Loading...");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!level) return;
    const path = `data/${level}.md`;
    loadMarkdown(path)
      .then(setMarkdown)
      .catch((e) => setError(e.message));
  }, [level]);

  return (
    <div className="flex flex-col flex-1 relative">
      <button
        className="absolute top-2 left-2 z-10 px-3 py-1 text-xs bg-gray-200 rounded shadow hover:bg-gray-300"
        onClick={() => navigate("/")}
      >
        ← Back
      </button>
      <div className="flex flex-1 pt-8">
        {error ? (
          <div className="m-auto text-red-600">{error}</div>
        ) : (
          <MarkmapHooks initialValue={markdown} />
        )}
      </div>
    </div>
  );
}
