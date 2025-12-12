export function parsePositiveInt(value: string): number | null {
  const parsed = parseInt(value, 10);
  if (isNaN(parsed) || parsed < 0) return null;
  return parsed;
}

export function parsePositiveDecimal(value: string): number | null {
  const parsed = parseFloat(value.replace(',', '.'));
  if (isNaN(parsed) || parsed < 0) return null;
  return parsed;
}

export function isValidPositiveNumber(value: number): boolean {
  return !isNaN(value) && value > 0;
}
