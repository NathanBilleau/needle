import { oak } from "./deps.ts";
import { TokenResponse } from "./interfaces/spotify.ts";
import {
  generateAuthUrl,
  generateUserToken,
  getCurrentUser,
} from "./spotify/auth.ts";
import {
  getCurrentUserPlaylists,
  getCurrentUserPlaylistTracks,
} from "./spotify/playlists.ts";

const router = new oak.Router();
let responseToken: TokenResponse;

router.get("/", (ctx) => {
  ctx.response.redirect(generateAuthUrl());
});

router.get("/callback", async (ctx) => {
  const code = ctx.request.url.searchParams.get("code");
  responseToken = await generateUserToken(code || "");

  ctx.response.redirect("/me");
});

router.get("/me", async (ctx) => {
  const user = await getCurrentUser(responseToken.access_token);

  ctx.response.body = user;
});

router.get("/playlists", async (ctx) => {
  const playlists = await getCurrentUserPlaylists(responseToken.access_token);
  ctx.response.body = JSON.stringify(playlists, null, 2);
});

router.get("/playlists/:id", async (ctx) => {
  const playlist = await getCurrentUserPlaylistTracks(
    responseToken.access_token,
    ctx.params.id,
  );

  ctx.response.body = JSON.stringify(playlist, null, 2);
});

const app = new oak.Application();

app.use(router.routes());

app.listen({ port: 8000 });
