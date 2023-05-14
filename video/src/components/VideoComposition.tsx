import { loadFont } from '@remotion/google-fonts/Outfit';
import SongSequence from '../components/SongSequence';
import { ColorProvider } from '../contexts/ColorContext';
loadFont();

// Const songs = [
//   {
//     name: "Space train",
//     artists: "Spiral Drive",
//     duration: 3 * 60 + 28,
//     previewUrl: 'bimbom.mp3',
//     image: 'https://picsum.photos/id/237/700/700',
//   },
//   {
//     name: "Bohemian Rhapsody",
//     artists: "Queen",
//     duration: 5 * 60 + 55,
//     previewUrl: 'lalala.wav',
//     image: 'https://picsum.photos/id/238/700/700',
//   },
//   {
//     name: "Wish you were here",
//     artists: "Pink Floyd",
//     duration: 5 * 60 + 40,
//     previewUrl: 'summer.wav',
//     image: 'https://picsum.photos/id/239/700/700',
//   },
//   {
//     name: "The Wall",
//     artists: "Pink Floyd",
//     duration: 5 * 60 + 40,
//     previewUrl: 'canoe.mp3',
//     image: 'https://picsum.photos/id/240/700/700',
//   }
// ];

export const VideoComposition = ({ tracks = [] }) => {
  console.log(tracks);

  return (
    <ColorProvider>
      <SongSequence tracks={tracks} />
    </ColorProvider>
  );
};
