import { loadFont } from '@remotion/google-fonts/Outfit';
import { Composition } from 'remotion';
import { VideoComposition } from './components/VideoComposition';
loadFont();

const fps = 50;
const durationInSeconds = 50;

export const RemotionRoot: React.FC = () => {
	return (
		<Composition
			id="MyComp"
			component={VideoComposition}
			durationInFrames={fps * durationInSeconds}
			fps={fps}
			height={1920}
			width={1080}
		/>
	);
};
