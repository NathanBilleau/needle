import * as dotenv from "dotenv";
import express from "express";
import { renderVideo } from "./needle";
import { Spotify } from "./spotify";

dotenv.config({
  path: "../.env",
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

  renderVideo();
  res.send('generating video');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
