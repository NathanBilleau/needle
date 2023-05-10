import { TokenResponse, UserProfile } from "./interfaces/auth";
import { Playlist, Track } from "./interfaces/music";
import { Response } from "./interfaces/response";

export class Spotify {
  static client_id = "";
  static client_secret = "";

  static token = "";
  static refreshToken = "";
  static expires_in = 0;

  // constructor(client_id: string, client_secret: string) {
  //   this.client_id = client_id;
  //   this.client_secret = client_secret;
  // }

  /**
   * Set client id and client secret
   */
  static setClient = (client_id: string, client_secret: string) => {
    this.client_id = client_id;
    this.client_secret = client_secret;
  };

  /**
   * Generate auth url to get Authorization Code
   */
  static generateAuthUrl = () => {
    const state = Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);

    const params = new URLSearchParams({
      response_type: "code",
      client_id: this.client_id,
      client_secret: this.client_secret,
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
      client_id: this.client_id,
      client_secret: this.client_secret,
    });

    const token = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
    });

    const response: TokenResponse = await token.json();

    this.token = response.access_token;
    this.refreshToken = response.refresh_token;
    this.expires_in = response.expires_in;

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
    }, this.expires_in * 1000 - 60 * 1000);
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

    return await user.json();
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

    return await playlists.json();
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

    return await playlists.json();
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
  }
}
