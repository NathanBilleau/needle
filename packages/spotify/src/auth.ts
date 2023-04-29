import { TokenResponse, UserProfile } from "./interfaces/auth";

export class Spotify {
  client_id = "";
  client_secret = "";

  token = "";
  refreshToken = "";
  expires_in = 0;

  constructor(client_id: string, client_secret: string) {
    this.client_id = client_id;
    this.client_secret = client_secret;
  }

  /**
   * Generate auth url to get Authorization Code
   */
  generateAuthUrl = () => {
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
  generateUserToken = async (
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
  autoRefreshUserToken = async (
    code: string,
  ) => {
    setTimeout(async () => {
      await this.generateUserToken(code);
    }, this.expires_in * 1000 - 60 * 1000);
  };

  // /**
  //  * Refresh user token
  //  */
  // refreshUserToken = async (
  //   refreshToken: string,
  // ): Promise<TokenResponse> => {
  //   const params = new URLSearchParams({
  //     grant_type: "refresh_token",
  //     refresh_token: refreshToken,
  //     client_id: process.env.SPOTIFY_CLIENT_ID || "",
  //     client_secret: process.env.SPOTIFY_CLIENT_SECRET || "",
  //   });

  //   const token = await fetch("https://accounts.spotify.com/api/token", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/x-www-form-urlencoded",
  //     },
  //     body: params.toString(),
  //   });

  //   return await token.json();
  // };

  /**
   * Get the current user's profile
   */
  getCurrentUser = async (): Promise<UserProfile> => {
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
  getCurrentUserPlaylists = async () => {
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
  getCurrentUserPlaylistTracks = async (playlistId: string) => {
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
  getTrack = async (trackId: string) => {
    const track = await fetch(`https://api.spotify.com/v1/tracks/${trackId}`, {
      headers: {
        Authorization: "Bearer " + this.token,
      },
    });

    return await track.json();
  }
}
