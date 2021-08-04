export function generateName() {
  const brands = ['VW', 'Mersedes', 'Audi', 'BMW', 'Lexus', 'Skoda', 'Tesla', 'Hyundai', 'Ford', 'Volvo', 'Porsche', 'Tayota'];
  const models = ['Passat', 'S-class', 'A7', '5-series', 'LX', 'Superb', 'ModelS', 'Creta', 'Fusion', 'XC60', 'Panamera', 'Tundra'];
  const brand = brands[Math.floor(Math.random() * brands.length)];
  const model = models[Math.floor(Math.random() * models.length)];
  return `${brand} ${model}`;
}

export function generateColor() {
  const item = '0123456789ABCDEF';
  let color = '#';
  let i = 0;
  while (i !== 6) {
    i++;
    color += item[Math.floor(Math.random() * 16)];
  }
  return color;
}
