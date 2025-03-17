export function between(min: number, max: number) {
  const diff = max - min;
  const random = Math.round(Math.random() * diff);

  return min + random;
}