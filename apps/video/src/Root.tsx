import { Composition } from 'remotion';
import { loadFont } from '@remotion/google-fonts/Outfit';
loadFont();
import SongSequence from './components/SongSequence';

const fps = 60;
const durationInSeconds = 30;

export const RemotionRoot: React.FC = () => {
	return (
		<>
			<Composition
				id="MyComp"
				component={SongSequence}
				durationInFrames={fps * durationInSeconds}
				fps={fps}
				height={1280}
				width={720}
			/>
		</>
	);
};
