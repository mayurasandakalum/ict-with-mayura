import { useTheme } from "../contexts/ThemeContext";

export function ThemeToggle() {
  const { theme, setTheme, currentTheme } = useTheme();

  const handleToggle = () => {
    // Cycle through: auto -> light -> dark -> auto
    if (theme === "auto") {
      setTheme("light");
    } else if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("auto");
    }
  };

  const getIcon = () => {
    if (theme === "auto") {
      return currentTheme === "dark" ? "🌙" : "☀️";
    }
    return theme === "dark" ? "🌙" : "☀️";
  };

  const getTitle = () => {
    if (theme === "auto") {
      return `Auto theme (currently ${currentTheme}). Click to switch to light theme`;
    } else if (theme === "light") {
      return `Light theme. Click to switch to dark theme`;
    } else {
      return `Dark theme. Click to switch to auto theme`;
    }
  };

  return (
    <button
      className={`theme-toggle ${theme === "auto" ? "theme-auto" : ""}`}
      onClick={handleToggle}
      title={getTitle()}
      aria-label={getTitle()}
    >
      {getIcon()}
      {theme === "auto" && <span className="auto-indicator">A</span>}
    </button>
  );
}
