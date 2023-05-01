import { useEffect, useState } from "react";
import Player from "./components/Player";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import styles from "./Composition.module.scss";
import { getMainColor } from "./utils/colors";

export const MyComposition = () => {
	const image = "https://images.unsplash.com/photo-1682821891381-0a2722d95693?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80";
	const [dominantColor, setDominantColor] = useState<string>();
	
	useEffect(() => {
		getMainColor(image).then((color) => {
			setDominantColor(color);
		});
	}, [])

	return (
		<div className={styles.compositionContainer} style={{
			backgroundColor: dominantColor,
		}}>
			<span>week</span>
			<Player
				cover={image}
				title="Space train"
				artist="Spiral Drive"
				duration={3 * 60 + 28}
				previewUrl={image}
			/>
			<span>
				list of songs
			</span>
		</div>
	);
};
