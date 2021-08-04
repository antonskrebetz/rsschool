export function setResponsiveCards(x: number) {
  const matrix = (100 / Math.sqrt(x)) - 2;
  document.documentElement.style.setProperty('--sizeCard', `${matrix}%`);
}
