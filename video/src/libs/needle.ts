import { ISimpleTrack, Track } from "./interfaces/music";
import { getCurrentUserPlaylists, getPlaylistTracks } from "./spotify";

/**
 * Get current month Spotify playlist
 */
const getCurrentMonthPlaylist = async () => {
  const currentMonth = (new Date().getMonth() + 1).toString().padStart(2, "0").toString();
  const currentYear = new Date().getFullYear().toString().slice(-2).toString();
  const currentPlaylistName = `${currentMonth}${currentYear}`;

  const playlists = await getCurrentUserPlaylists();
  const currentPlaylist = playlists?.items?.find(playlist => playlist.name === currentPlaylistName);

  return currentPlaylist;
};

/**
 * Get current month Spotify playlist tracks
 */
const getCurrentMonthPlaylistTracks = async () => {
  const playlist = await getCurrentMonthPlaylist();
  const tracks = await getPlaylistTracks(playlist?.id || "");

  return tracks?.items;
};

/**
 * Get tracks from the current week
 */
export const getCurrentWeekTracks = async () => {
  console.log('getCurrentWeekTracks');
  const tracks = await getCurrentMonthPlaylistTracks();
  const weekTracks = tracks.filter((track) => {
    return track.added_at >= new Date(new Date().setDate(new Date().getDate() - 7)).toISOString();
  });

  return weekTracks.map(transformTrack);
};

/**
 * Transform track to simple track
 */
const transformTrack = (track: Track): ISimpleTrack => {
  return {
    id: track.track?.id,
    name: track.track.name,
    artists: track.track.artists.map((artist) => artist.name).join(", "),
    album: track.track.album.name,
    image: track.track.album.images[0].url,
    previewUrl: track.track.preview_url,
    uri: track.track.uri,
    duration: Math.round(track.track.duration_ms / 1000),
  };
};
