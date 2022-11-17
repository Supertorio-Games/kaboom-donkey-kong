/**
 * Returns the value supplied clamped within a minimum and maximum range
 */
export const clamp = (min: number, max: number, value: number) => {
  if (value <= min) return min;
  else if (value >= max) return max;
  return value;
};
