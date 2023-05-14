import * as dotenv from "dotenv";
import { Spotify } from "./spotify";

dotenv.config({
  path: "../.env",
});

Spotify.setClient(
  process.env.SPOTIFY_CLIENT_ID,
  process.env.SPOTIFY_CLIENT_SECRET,
);

Spotify.auth();
