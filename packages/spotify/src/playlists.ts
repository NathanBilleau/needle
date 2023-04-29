/**
 * Get the current user's playlists
 */
export const getCurrentUserPlaylists = async (token: string) => {
  const playlists = await fetch("https://api.spotify.com/v1/me/playlists", {
    headers: {
      Authorization: "Bearer " + token,
    }
  });

  return await playlists.json();
}

/**
 * Get the current user playlist tracks
 */
export const getCurrentUserPlaylistTracks = async (token: string, playlistId: string) => {
  const playlists = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
    headers: {
      Authorization: "Bearer " + token,
    }
  });
  
  return await playlists.json();
}