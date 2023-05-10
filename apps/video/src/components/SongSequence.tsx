import Player from "../components/Player";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Series, useVideoConfig } from "remotion";
import { useColor } from "../contexts/ColorContext";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import styles from "./SongSequence.module.scss";

const maxDuration = 20;
const minDuration = 5;

const SongSequence = ({ tracks }: { tracks : any}) => {
  const { durationInFrames, fps } = useVideoConfig();
  const songsDurationInFrames = Math.min(maxDuration * fps, Math.max(minDuration * fps, durationInFrames / tracks.length));
  const { currentColor } = useColor();

  return (
    <div className={styles.songSequenceContainer} style={{
      backgroundColor: currentColor,
    }}>
      <h1 className={styles.weekTitle}>week <span className={styles.weekNumber}>#18</span></h1>

      <div className={styles.playersContainer}>
        <Series>
          {
            tracks.map((song: any) => (
              <Series.Sequence
                key={song.id}
                layout="none"
                durationInFrames={songsDurationInFrames}>
                <Player
                  cover={song.image}
                  title={song.name}
                  artist={song.artists}
                  duration={0}
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