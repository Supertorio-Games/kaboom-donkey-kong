export const clamp = (min, max, value) => {
  if (value <= min) return min;
  else if (value >= max) return max;
  return value;
};
