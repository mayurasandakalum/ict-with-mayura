// Utility to fetch static markdown files packaged by Vite.
export async function loadMarkdown(path: string): Promise<string> {
  // Handle base URL for GitHub Pages deployment
  const baseUrl = import.meta.env.BASE_URL || "/";
  const fullPath = `${baseUrl}${path.startsWith("/") ? path.slice(1) : path}`;

  const res = await fetch(fullPath);

  if (!res.ok) throw new Error(`Failed to load markdown: ${path}`);

  return await res.text();
}
