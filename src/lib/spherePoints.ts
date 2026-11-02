/** Deterministic Fibonacci sphere: evenly distribute a finite number of labels. */
export function spherePoints(count: number, radius = 4): [number, number, number][] {
  if (count <= 0) return [];
  return Array.from({ length: count }, (_, index) => {
    const y = 1 - 2 * (index + 0.5) / count;
    const ring = Math.sqrt(1 - y * y);
    const angle = index * Math.PI * (3 - Math.sqrt(5));
    return [Math.cos(angle) * ring * radius, y * radius, Math.sin(angle) * ring * radius];
  });
}
