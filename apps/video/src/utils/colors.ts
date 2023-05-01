import ColorThief from 'colorthief';

/**
 * Get main color from image
 */
export const getMainColor = async (image: string): Promise<string> => {
  const colorThief = new ColorThief();
  const img = new Image();
  img.crossOrigin = 'Anonymous';
  img.src = image;
  const color = await new Promise((resolve, reject) => {
    img.onload = () => {
      const rgb = colorThief.getColor(img);
      resolve(`rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`);
    };
    img.onerror = reject;
  });
  return color as string;
}