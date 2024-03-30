import { FC, createContext, useContext, useState } from 'react';
import { interpolateColors, useCurrentFrame, useVideoConfig } from 'remotion';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import ColorThief from 'colorthief';

interface IColorContext {
  pushColor: (color: string) => void;
  currentColor: string;
  getDominantColor: (image: string) => Promise<string>;
}

const ColorContext = createContext<IColorContext>({
  currentColor: '#000',
  pushColor: () => undefined,
  getDominantColor: () => Promise.resolve('#000'),
});

export const useColor = () => useContext(ColorContext);

interface Props {
  children: React.ReactNode;
}

export const ColorProvider: FC<Props> = ({ children }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const [colors, setColors] = useState({
    prev: '#fff',
    current: '#000',
  });

  const transitionDuration = .3 * fps;
  const [transitionFrame, setTransitionFrame] = useState(0);
  const currentColor = interpolateColors(frame, [transitionFrame, transitionFrame + transitionDuration], [colors.prev, colors.current]);

  /**
   * Push color
   */
  const pushColor = (color: string) => {
    setColors({
      prev: colors.current,
      current: color,
    });

    setTransitionFrame(frame);
  };

  /**
   * Get dominant color from image
   */
  const getDominantColor = async (image: string): Promise<string> => {
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

  return (
    <ColorContext.Provider value={{ pushColor, currentColor, getDominantColor }}>
      {children}
    </ColorContext.Provider>
  );
};