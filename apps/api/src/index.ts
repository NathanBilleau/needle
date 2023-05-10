import * as dotenv from "dotenv";
import express from "express";
import { Spotify } from "spotify";
import { getVideoTracks, renderVideo, transformTrack } from "./needle";
import { renderMedia, getCompositions } from '@remotion/renderer';
import { bundle } from '@remotion/bundler';
import path from "path";

dotenv.config({
  path: "../../.env",
});

const app = express();
const port = 8000;

Spotify.setClient(
  process.env.SPOTIFY_CLIENT_ID,
  process.env.SPOTIFY_CLIENT_SECRET,
);

app.get("/", (req, res) => {
  res.redirect(Spotify.generateAuthUrl());
});

app.get("/callback", async (req, res) => {
  const code = req.query.code?.toString();
  await Spotify.generateUserToken(code || "");

  res.redirect("/me");
});

app.get("/me", async (req, res) => {
  // const user = await Spotify.getCurrentUser();
  // const tracks = (await getVideoTracks()).map(transformTrack);
  renderVideo();
  res.send({});
});

// app.get("/playlists", async (req, res) => {
//   const playlists = await Spotify.getCurrentUserPlaylists();
//   res.send(playlists);
// });

// app.get("/playlists/:id", async (req, res) => {
//   const playlistId = req.params.id;

//   const playlist = await Spotify.getCurrentUserPlaylistTracks(playlistId);

//   res.send(playlist);
// });

// app.get("/tracks/:id", async (req, res) => {
//   const trackId = req.params.id;

//   const track = await Spotify.getTrack(trackId);
//   res.send(track);
// });

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
