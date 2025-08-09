// Utility to fetch static markdown files packaged by Vite.
export async function loadMarkdown(path: string): Promise<string> {
  const res = await fetch(path);
  if (!res.ok) throw new Error(`Failed to load markdown: ${path}`);
  return await res.text();
}
