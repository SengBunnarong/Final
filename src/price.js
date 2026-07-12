export function generatePrice(id) {
  const seed = id.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const base = 9.99 + (seed % 5000) / 100;
  return Math.round(base * 100) / 100;
}
