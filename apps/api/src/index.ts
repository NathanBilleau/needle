import * as dotenv from "dotenv";
dotenv.config({
  path: "../../.env",
});

import express from "express";

import {
  generateAuthUrl,
  generateUserToken,
  getCurrentUser,
  getCurrentUserPlaylists,
  getCurrentUserPlaylistTracks,
  TokenResponse,
} from "spotify";

const app = express();
const port = 8000;

let responseToken: TokenResponse;

app.get("/", (req, res) => {
  res.redirect(generateAuthUrl());
});

app.get("/callback", async (req, res) => {
  const code = req.query.code?.toString();
  responseToken = await generateUserToken(code || "");

  res.redirect("/me");
});

app.get("/me", async (req, res) => {
  console.log(responseToken?.access_token);
  const user = await getCurrentUser(responseToken?.access_token);

  res.send(user);
});

app.get("/playlists", async (req, res) => {
  const playlists = await getCurrentUserPlaylists(responseToken?.access_token);
  res.send(playlists);
});

app.get("/playlists/:id", async (req, res) => {
  const playlistId = req.params.id;

  const playlist = await getCurrentUserPlaylistTracks(
    responseToken?.access_token,
    playlistId,
  );

  res.send(playlist);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
