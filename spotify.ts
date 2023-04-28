import { env } from "./deps.ts";

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
export const generateUserToken = async (code: string) => {
  const params = new URLSearchParams({
    grant_type: "authorization_code",
    code,
    redirect_uri: "http://localhost:8000/callback",
    client_id: env["SPOTIFY_CLIENT_ID"] || "",
    client_secret: env["SPOTIFY_CLIENT_SECRET"] || "",
  });

  const token = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params.toString(),
  });

  return await token.json();
};

/**
 * Get the current user's profile
 */
export const getCurrentUser = async (token: string) => {
  const user = await fetch("https://api.spotify.com/v1/me", {
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  return await user.json();
};
