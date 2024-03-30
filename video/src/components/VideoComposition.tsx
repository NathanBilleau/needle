import { loadFont } from '@remotion/google-fonts/Outfit';
import { useEffect, useState } from 'react';
import { continueRender, delayRender, random } from 'remotion';
import SongSequence from '../components/SongSequence';
import { ColorProvider } from '../contexts/ColorContext';
import { ISimpleTrack } from '../libs/interfaces/music';
import { getCurrentWeekTracks } from '../libs/needle';

loadFont();

export const VideoComposition = () => {
  const [tracks, setTracks] = useState<ISimpleTrack[]>([]);

  useEffect(() => {
    const handle = delayRender('get tracks');

    getCurrentWeekTracks().then(videoTracks => {
      const randomTracks = [];

      // Randomize the tracks
      for (let i = videoTracks.length; i > 0; i--) {
        const randomIndex = Math.floor(random(i) * i);
        randomTracks.push(videoTracks.splice(randomIndex, 1)[0]);
      }
      setTracks(randomTracks);
      continueRender(handle);
    });
  }, []);

  return (
    <ColorProvider>
      <SongSequence tracks={tracks} />
    </ColorProvider>
  );
};
