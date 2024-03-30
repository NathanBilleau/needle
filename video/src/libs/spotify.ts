import { UserProfile } from "./interfaces/auth";
import { Playlist, Track } from "./interfaces/music";
import { Response } from "./interfaces/response";

const token = process.env.TOKEN;

/**
 * Get the current user's profile
 */
export const getCurrentUser = async (): Promise<UserProfile> => {
  const user = await fetch("https://api.spotify.com/v1/me", {
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  return await user.json() as UserProfile;
};

/**
 * Get the current user's playlists
 */
export const getCurrentUserPlaylists = async (): Promise<Response<Playlist>> => {
  console.log(token);

  const playlists = await fetch("https://api.spotify.com/v1/me/playlists", {
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  return await playlists.json() as Response<Playlist>;
};

/**
 * Get the current user playlist tracks
 */
export const getPlaylistTracks = async (playlistId: string): Promise<Response<Track>> => {
  const playlists = await fetch(
    `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    },
  );

  return await playlists.json() as Response<Track>;
};

/**
 * Get track details
 */
export const getTrack = async (trackId: string) => {
  const track = await fetch(`https://api.spotify.com/v1/tracks/${trackId}`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  return track.json();
};