import { FC } from 'react';
import { Img, spring, useCurrentFrame, useVideoConfig } from 'remotion';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import styles from './Player.module.scss';

interface Props {
  cover: string;
  title: string;
  artist: string;
  duration: number;
  previewUrl: string;
}

const Player: FC<Props> = ({ cover, title, artist, duration, previewUrl }) => {

  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const parsedDuration = new Date(duration * 1000).toISOString().substr(14, 5);

  const scaleCover = spring({
    fps,
    frame,
    durationInFrames: .3 * fps,
    config: {
      mass: 1,
      stiffness: 10
    }
  });

  const scalePlayer = spring({
    fps,
    frame: frame - .2 * fps,
    durationInFrames: .3 * fps,
    config: {
      mass: 1,
      stiffness: 10
    }
  });

  return (
    <div className={styles.playerContainer}>
      <Img
        src={cover}
        className={styles.cover}
        style={{
          transform: `scale(${scaleCover})`
        }}
        alt="" />

      <div className={styles.playerContainer}>
        <div
          className={styles.player}
          style={{
            transform: `scale(${scalePlayer})`
          }}
        >
          <div className={styles.songInformation}>
            <span className={styles.title}>
              {title}
            </span>
            <span className={styles.artist}>
              {artist}
            </span>
          </div>

          <div className={styles.visualisationContainer}>
            visualisation
          </div>

          <div className={styles.duration}>
            {parsedDuration}
          </div>
        </div>
      </div>

    </div>
  );
};

export default Player;

