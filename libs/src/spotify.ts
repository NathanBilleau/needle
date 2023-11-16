import { TokenResponse, UserProfile } from "./interfaces/auth";
import { Playlist, Track } from "./interfaces/music";
import { Response } from "./interfaces/response";
import express from "express";

export class Spotify {
  static clientId = "";
  static clientSecret = "";
  
  static token = "";
  static refreshToken = "";
  static expiresIn = 0;
  
  /**
   * Set the user token
   * 
   * It can be pulled from env, then set through this method
   */
  static setToken(token: string) {
    console.log(`token: ${token}`);
    this.token = token;
  }

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

    /**
     * Middleware to refuse access if token is already set
     */
    app.use((req, res, next) => {
      if (this.token) {
        res.send('token already set');
      } else {
        next();
      }
    });

    app.get('/test', (_req, res) => {
      res.send('test');
    });

    app.get("/", (_req, res) => {
      console.log(this.token);
      const authUrl = Spotify.generateAuthUrl();
      res.redirect(authUrl);
    });

    app.get("/callback", async (req, res) => {
      const code = req.query.code?.toString();
      await Spotify.generateUserToken(code || "");
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

    this.setToken(response.access_token);
    this.refreshToken = response.refresh_token;
    this.expiresIn = response.expires_in;

    this.autoRefreshUserToken(code);
  };

  /**
   * Automatically refresh user token
   */
  static autoRefreshUserToken = async (
    code: string,
  ) => {
    setTimeout(async () => {
      await this.generateUserToken(code);
    }, this.expiresIn * 1000 - 60 * 1000);
  };

  /**
   * Get the current user's profile
   */
  static getCurrentUser = async (): Promise<UserProfile> => {
    const user = await fetch("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: "Bearer " + this.token,
      },
    });

    return await user.json() as UserProfile;
  };

  /**
   * Get the current user's playlists
   */
  static getCurrentUserPlaylists = async (): Promise<Response<Playlist>> => {
    const playlists = await fetch("https://api.spotify.com/v1/me/playlists", {
      headers: {
        Authorization: "Bearer " + this.token,
      },
    });

    return await playlists.json() as Response<Playlist>;
  };

  /**
   * Get the current user playlist tracks
   */
  static getPlaylistTracks = async (playlistId: string): Promise<Response<Track>> => {
    const playlists = await fetch(
      `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
      {
        headers: {
          Authorization: "Bearer " + this.token,
        },
      },
    );

    return await playlists.json() as Response<Track>;
  };

  /**
   * Get track details
   */
  static getTrack = async (trackId: string) => {
    const track = await fetch(`https://api.spotify.com/v1/tracks/${trackId}`, {
      headers: {
        Authorization: "Bearer " + this.token,
      },
    });

    return await track.json();
  };
}
