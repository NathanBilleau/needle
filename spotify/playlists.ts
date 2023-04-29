import { get } from "../utils/fetch.ts";

/**
 * Get the current user's playlists
 */
export const getCurrentUserPlaylists = async (token: string) => {
  const playlists = await get("https://api.spotify.com/v1/me/playlists", token);

  return await playlists.json();
}

/**
 * Get the current user playlist tracks
 */
export const getCurrentUserPlaylistTracks = async (token: string, playlistId: string) => {
  const playlists = await get(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, token);

  return await playlists.json();
}