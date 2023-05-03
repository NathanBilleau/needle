
import { FC, useEffect } from 'react';
import { Audio, Img, spring, useCurrentFrame, useVideoConfig, staticFile, interpolateColors } from 'remotion';
import { useAudioData, visualizeAudio } from "@remotion/media-utils";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import styles from './Player.module.scss';

interface Props {
  cover: string;
  title: string;
  artist: string;
  duration: number;
  previewUrl: string;
  color: string;

  isPlaying?: (color: string) => void
  previousColor: string
}

const Player: FC<Props> = ({ cover, title, artist, duration, previewUrl, color, isPlaying, previousColor }) => {

  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const parsedDuration = new Date(duration * 1000).toISOString().substr(14, 5);

  const audioData = useAudioData(staticFile(previewUrl));

  const colorTransition = interpolateColors(frame, [0, .3 * fps], [previousColor, color]);
  isPlaying?.(colorTransition);

  if (!audioData) {
    return null;
  }

  const visualization = visualizeAudio({
    fps,
    frame,
    audioData,
    numberOfSamples: 16,
    smoothing: true,
  });

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
    <div className={styles.container}>
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

          <Audio src={staticFile(previewUrl)} />

          <div className={styles.visualisationContainer}>
            {
              visualization.map((v, index) => (
                <div
                  key={index}
                  className={styles.visualisation}
                  style={{
                    height: `${v * 200}%`,
                  }}
                />
              ))
            }
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

