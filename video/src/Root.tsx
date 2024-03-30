import { loadFont } from '@remotion/google-fonts/Outfit';
import { Composition } from 'remotion';
import { VideoComposition } from './components/VideoComposition';
loadFont();

const fps = 30;
const durationInSeconds = 60;

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
