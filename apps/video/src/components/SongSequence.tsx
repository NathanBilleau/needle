import Player from "../components/Player";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Series, useVideoConfig } from "remotion";
import { useColor } from "../contexts/ColorContext";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import styles from "./SongSequence.module.scss";

const songs = [
  {
    title: "Space train",
    artist: "Spiral Drive",
    duration: 3 * 60 + 28,
    previewUrl: 'bimbom.mp3',
    cover: 'https://picsum.photos/id/237/700/700',
  },
  {
    title: "Bohemian Rhapsody",
    artist: "Queen",
    duration: 5 * 60 + 55,
    previewUrl: 'lalala.wav',
    cover: 'https://picsum.photos/id/238/700/700',
  },
  {
    title: "Wish you were here",
    artist: "Pink Floyd",
    duration: 5 * 60 + 40,
    previewUrl: 'summer.wav',
    cover: 'https://picsum.photos/id/239/700/700',
  },
  {
    title: "The Wall",
    artist: "Pink Floyd",
    duration: 5 * 60 + 40,
    previewUrl: 'canoe.mp3',
    cover: 'https://picsum.photos/id/240/700/700',
  }
];

const maxDuration = 20;
const minDuration = 5;

const SongSequence = () => {
  const { durationInFrames, fps } = useVideoConfig();
  const songsDurationInFrames = Math.min(maxDuration * fps, Math.max(minDuration * fps, durationInFrames / songs.length));
  const { currentColor } = useColor();

  return (
    <div className={styles.songSequenceContainer} style={{
      backgroundColor: currentColor,
    }}>
      <h1 className={styles.weekTitle}>week <span className={styles.weekNumber}>#18</span></h1>

      <div className={styles.playersContainer}>
        <Series>
          {
            songs.map((song, index) => (
              <Series.Sequence
                key={index}
                layout="none"
                durationInFrames={songsDurationInFrames}>
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