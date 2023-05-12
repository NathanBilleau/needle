import { loadFont } from '@remotion/google-fonts/Outfit';
import SongSequence from '../components/SongSequence';
import { ColorProvider } from '../contexts/ColorContext';
loadFont();

export const VideoComposition = ({ tracks = [] }) => {
  return (
    <ColorProvider>
      <SongSequence tracks={tracks} />
    </ColorProvider>
  );
};
