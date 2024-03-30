import express from "express";
import { TokenResponse } from "./interfaces/auth";

export class SpotifyAuth {
  static clientId = "";
  static clientSecret = "";

  /**
   * Set client id and client secret
   */
  static setClient = (clientId: string, clientSecret: string) => {
    this.clientId = clientId;
    this.clientSecret = clientSecret;
  };

  /**
   * Start auth process (express api)
   */
  static auth = async () => new Promise<void>((resolve, reject) => {

    const app = express();
    const port = 8000;

    app.get('/test', (_req, res) => {
      res.send('test');
    });

    app.get("/", (_req, res) => {
      const authUrl = SpotifyAuth.generateAuthUrl();
      res.redirect(authUrl);
    });

    app.get("/callback", async (req, res) => {
      const code = req.query.code?.toString();
      await SpotifyAuth.generateUserToken(code || "");
      res.send('ok');
      resolve();
    });

    app.listen(port, () => {
      console.log(`Example app listening at http://localhost:${port}`);
    });
  });

  /**
   * Generate auth url to get Authorization Code
   */
  static generateAuthUrl = () => {
    const state = Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);

    const params = new URLSearchParams({
      response_type: "code",
      client_id: this.clientId,
      client_secret: this.clientSecret,
      scope: "user-read-private user-read-email",
      redirect_uri: "http://localhost:8000/callback",
      state,
    });

    return "https://accounts.spotify.com/authorize?" + params.toString();
  };

  /**
   * Generate user token
   */
  static generateUserToken = async (
    code: string,
  ) => {
    const params = new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: "http://localhost:8000/callback",
      client_id: this.clientId,
      client_secret: this.clientSecret,
    });

    const token = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
    });

    const response = await token.json() as TokenResponse;

    console.log(`token: ${response.access_token}`);
  };

}
