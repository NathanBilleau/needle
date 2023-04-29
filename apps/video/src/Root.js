"use strict";
exports.__esModule = true;
exports.RemotionRoot = void 0;
var remotion_1 = require("remotion");
var Composition_1 = require("./Composition");
var RemotionRoot = function () {
    return (<>
			<remotion_1.Composition id="MyComp" component={Composition_1.MyComposition} durationInFrames={60} fps={30} width={1280} height={720}/>
		</>);
};
exports.RemotionRoot = RemotionRoot;
