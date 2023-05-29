import * as dotenv from "dotenv";
import { Spotify } from "./spotify";

dotenv.config({
  path: "../.env",
});

Spotify.setClient(
  process.env.SPOTIFY_CLIENT_ID as string,
  process.env.SPOTIFY_CLIENT_SECRET as string,
);

Spotify.auth();
