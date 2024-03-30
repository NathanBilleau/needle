// import {  } from "@needle/libs";
import * as dotenv from "dotenv";
import { SpotifyAuth } from "./spotifyAuth";

dotenv.config({
  path: "../.env",
});

SpotifyAuth.setClient(
  process.env.SPOTIFY_CLIENT_ID as string,
  process.env.SPOTIFY_CLIENT_SECRET as string,
);

SpotifyAuth.auth();
