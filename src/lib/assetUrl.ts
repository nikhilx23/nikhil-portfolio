/** public/ paths must respect the Vite base for GitHub project Pages. */
export function assetUrl(path: string): string {
  return `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`;
}
