
import { useAudioData, visualizeAudio } from "@remotion/media-utils";
import { FC, useEffect, useState } from 'react';
import { Audio, Img, spring, useCurrentFrame, useVideoConfig, delayRender, continueRender } from 'remotion';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import styles from './Player.module.scss';
import { useColor } from "../contexts/ColorContext";

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
  const { pushColor, getDominantColor } = useColor();

  const audioData = useAudioData(previewUrl);

  const [handle] = useState(() => delayRender('get image color'));

  useEffect(() => {
    getDominantColor(cover).then(color => {
      pushColor(color);
      continueRender(handle);
    }).catch(err => console.error(err));
  }, [cover]);


  if (!audioData) {
    return null;
  }

  const visualization = visualizeAudio({
    fps,
    frame,
    audioData,
    numberOfSamples: 32,
    smoothing: true,
  });

  const scaleCover = spring({
    fps,
    frame,
    durationInFrames: .5 * fps,
    config: {
      mass: 1,
      stiffness: 10
    }
  });

  const scalePlayer = spring({
    fps,
    frame: frame - .2 * fps,
    durationInFrames: .5 * fps,
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

          <Audio src={previewUrl} />

          <div className={styles.visualisationContainer}>
            {
              visualization.map((v, index) => (
                <div
                  key={index}
                  className={styles.visualisation}
                  style={{
                    height: `${v * 100}%`,
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

