import {Composition} from 'remotion';
import { loadFont } from '@remotion/google-fonts/Outfit';
loadFont();
import {MyComposition} from './Composition';

const fps = 30;
const durationInSeconds = 60;

export const RemotionRoot: React.FC = () => {
	return (
		<>
			<Composition
				id="MyComp"
				component={MyComposition}
				durationInFrames={fps * durationInSeconds}
				fps={fps}
				height={1280}
				width={720}
			/>
		</>
	);
};
