export const $ = (selector) => document.querySelector(selector);

export const randInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const getDistance = (x1, y1, x2, y2) => {
  const x = x2 - x1;
  const y = y2 - y1;

  return Math.sqrt(x * x + y * y);
};
