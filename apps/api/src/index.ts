import * as dotenv from "dotenv";
dotenv.config({
  path: "../../.env",
});

import express from "express";

import {
  getCurrentUserPlaylists,
  getCurrentUserPlaylistTracks,
  Spotify,
  TokenResponse,
} from "spotify";

const app = express();
const port = 8000;

const spotify = new Spotify(
  process.env.SPOTIFY_CLIENT_ID,
  process.env.SPOTIFY_CLIENT_SECRET,
);

app.get("/", (req, res) => {
  res.redirect(spotify.generateAuthUrl());
});

app.get("/callback", async (req, res) => {
  const code = req.query.code?.toString();
  await spotify.generateUserToken(code || "");

  res.redirect("/me");
});

app.get("/me", async (req, res) => {
  const user = await spotify.getCurrentUser();

  res.send(user);
});

app.get("/playlists", async (req, res) => {
  const playlists = await spotify.getCurrentUserPlaylists();
  res.send(playlists);
});

app.get("/playlists/:id", async (req, res) => {
  const playlistId = req.params.id;

  const playlist = await spotify.getCurrentUserPlaylistTracks(playlistId);

  res.send(playlist);
});

app.get('/tracks/:id', async (req, res) => {
  const trackId = req.params.id;

  const track = await spotify.getTrack(trackId);
  res.send(track);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
