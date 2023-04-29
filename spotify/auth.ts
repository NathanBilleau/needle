import { env } from "../deps.ts";
import { TokenResponse, UserProfile } from "../interfaces/spotify.ts";
import { get, post } from "../utils/fetch.ts";

/**
 * Generate auth url to get Authorization Code
 */
export const generateAuthUrl = () => {
  const state = Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15);

  const params = new URLSearchParams({
    response_type: "code",
    client_id: env["SPOTIFY_CLIENT_ID"] || "",
    client_secret: env["SPOTIFY_CLIENT_SECRET"] || "",
    scope: "user-read-private user-read-email",
    redirect_uri: "http://localhost:8000/callback",
    state,
  });

  return "https://accounts.spotify.com/authorize?" + params.toString();
};

/**
 * Generate user token
 */
export const generateUserToken = async (
  code: string,
): Promise<TokenResponse> => {
  const params = new URLSearchParams({
    grant_type: "authorization_code",
    code,
    redirect_uri: "http://localhost:8000/callback",
    client_id: env["SPOTIFY_CLIENT_ID"] || "",
    client_secret: env["SPOTIFY_CLIENT_SECRET"] || "",
  });

  const token = await post(
    "https://accounts.spotify.com/api/token",
    "",
    params.toString(),
  );

  return token;
};

/**
 * Refresh user token
 */
export const refreshUserToken = async (
  refreshToken: string,
): Promise<TokenResponse> => {
  const params = new URLSearchParams({
    grant_type: "refresh_token",
    refresh_token: refreshToken,
    client_id: env["SPOTIFY_CLIENT_ID"] || "",
    client_secret: env["SPOTIFY_CLIENT_SECRET"] || "",
  });

  const token = await post("https://accounts.spotify.com/api/token", '', params.toString());
  return token;
};

/**
 * Get the current user's profile
 */
export const getCurrentUser = async (token: string): Promise<UserProfile> => {
  const user = await get("https://api.spotify.com/v1/me", token);
  return user;
};
