import { env, oak } from "./deps.ts";
import {
  generateAuthUrl,
  generateUserToken,
  getCurrentUser,
} from "./spotify.ts";

const router = new oak.Router();

// / -> redirect to auth url
// /callback -> get token and redirect to /me

router.get("/", (ctx) => {
  ctx.response.redirect(generateAuthUrl());
});

router.get("/callback", async (ctx) => {
  const code = ctx.request.url.searchParams.get("code");
  const token = await generateUserToken(code || "");
  const user = await getCurrentUser(token.access_token);

  ctx.response.body = user;
});


const app = new oak.Application();

app.use(router.routes());

app.listen({ port: 8000})