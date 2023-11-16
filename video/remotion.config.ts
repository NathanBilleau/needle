import { Config } from '@remotion/cli/config';
import { enableSass } from "./src/enable-sass";

Config.setVideoImageFormat("jpeg");
Config.setOverwriteOutput(true);
Config.overrideWebpackConfig(enableSass);
Config.setJpegQuality(100);