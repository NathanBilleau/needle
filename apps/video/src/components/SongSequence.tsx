import { useEffect, useState } from "react";
import Player from "../components/Player";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import styles from "./SongSequence.module.scss";
import { Series, useCurrentFrame, useVideoConfig } from "remotion";

const songs = [
  {
    title: "Space train",
    artist: "Spiral Drive",
    duration: 3 * 60 + 28,
    previewUrl: 'bimbom.mp3',
    cover: 'https://images.unsplash.com/photo-1682821891381-0a2722d95693?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80',
    color: '#be7b19',
  },
  {
    title: "Bohemian Rhapsody",
    artist: "Queen",
    duration: 5 * 60 + 55,
    previewUrl: 'lalala.wav',
    cover: 'https://images.unsplash.com/photo-1681906374707-40c5f2c7c8d6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1439&q=80',
    color: '#939da6'
  },
  {
    title: "Wish you were here",
    artist: "Pink Floyd",
    duration: 5 * 60 + 40,
    previewUrl: 'bimbom.mp3',
    cover: 'https://plus.unsplash.com/premium_photo-1680040211019-29a8dbb250d5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=927&q=80',
    color: '#4e761b'
  },
];

const maxDuration = 20;
const minDuration = 10;

const SongSequence = () => {
  const [currentSongIndex, setCurrentSongIndex] = useState<number>(0);
  const frame = useCurrentFrame();
  const { durationInFrames, fps } = useVideoConfig();
  const songsDurationInFrames = Math.min(maxDuration * fps, Math.max(minDuration * fps, durationInFrames / songs.length));

  const currentSong = songs[currentSongIndex];

  // FIXME: causes flickering
  useEffect(() => {
    if (frame % songsDurationInFrames === 0) {
      setCurrentSongIndex((currentSongIndex + 1) % (songs.length));
    }
  }, [frame, currentSongIndex]);

  return (
    <div className={styles.songSequenceContainer} style={{
      backgroundColor: currentSong?.color,
    }}>
      <span>week</span>

      <div className={styles.playersContainer}>
        <Series>
          {
            songs.map((song, index) => (
              <Series.Sequence key={index} layout="none" durationInFrames={songsDurationInFrames}>
                <Player
                  key={index}
                  cover={song.cover}
                  title={song.title}
                  artist={song.artist}
                  duration={song.duration}
                  previewUrl={song.previewUrl}
                />
              </Series.Sequence>
            ))
          }
        </Series>
      </div>

      <span>
        list of songs
      </span>
    </div>
  );
};

export default SongSequence;