// Helper function to calculate the difference between two HSL colors
const colorDifference = (color1: string, color2: string): number => {
  const [h1, s1, l1] = color1.match(/\d+/g)!.map(Number);
  const [h2, s2, l2] = color2.match(/\d+/g)!.map(Number);

  return Math.sqrt(
    Math.pow(h1 - h2, 2) + Math.pow(s1 - s2, 2) + Math.pow(l1 - l2, 2)
  );
};

const generateRandomColor = (existingColors: string[] = []): string => {
  const hue = Math.floor(Math.random() * 360);
  const saturation = 60 + Math.random() * 20;
  const lightness = 20 + Math.random() * 20;

  const newColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`;

  const isSimilar = existingColors.some(
    (color) => colorDifference(color, newColor) < 50 // Adjust the threshold as needed
  );

  if (isSimilar) {
    return generateRandomColor(existingColors); // Recursively generate a new color
  }

  return newColor;
};

export default generateRandomColor;
