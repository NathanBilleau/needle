import { Config } from "remotion";
import { enableSass } from "./src/enable-sass";

Config.setImageFormat("jpeg");
Config.setOverwriteOutput(true);
Config.overrideWebpackConfig(enableSass);
