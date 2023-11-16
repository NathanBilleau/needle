import { Spotify } from "./spotify";
import { Track } from "./interfaces/music";

/**
 * Get current month Spotify playlist
 */
export const getCurrentMonthPlaylist = async () => {
  console.log('getCurrentMonthPlaylist')
  const currentMonth = (new Date().getMonth() + 1).toString().padStart(2, "0").toString();
  const currentYear = new Date().getFullYear().toString().slice(-2).toString();
  const currentPlaylistName = `${currentMonth}${currentYear}`;

  const playlists = await Spotify.getCurrentUserPlaylists();
  const currentPlaylist = playlists?.items?.find(playlist => playlist.name === currentPlaylistName);

  return currentPlaylist;
};

/**
 * Get current month Spotify playlist tracks
 */
export const getCurrentMonthPlaylistTracks = async () => {
  console.log('getCurrentMonthPlaylistTracks')
  const playlist = await getCurrentMonthPlaylist();
  const tracks = await Spotify.getPlaylistTracks(playlist?.id || "");

  return tracks?.items;
};

/**
 * Get tracks from the current week
 */
export const getCurrentWeekTracks = async () => {
  console.log('getCurrentWeekTracks')
  const tracks = await getCurrentMonthPlaylistTracks();
  const weekTracks = tracks.filter((track) => {
    return track.added_at >= new Date(new Date().setDate(new Date().getDate() - 7)).toISOString();
  });

  return weekTracks;
};

/**
 * Get video tracks
 */
export const getVideoTracks = async (): Promise<Track[]> => {
  console.log('getVideoTracks')
  const tracks = await getCurrentWeekTracks();
  const tracksNumber = Math.max(Math.min(tracks.length, 6), 3);

  const pickedTracks = new Set<Track>();
  for (let i = 0; i < tracksNumber; i++) {
    const track = tracks[Math.floor(Math.random() * tracks.length)];
    if (!pickedTracks.has(track)) {
      pickedTracks.add(track);
    }
  }

  return Array.from(pickedTracks);
};

/**
 * Transform track to simple track
 */
export const transformTrack = (track: Track) => {
  console.log('transformTrack')
  return {
    id: track.track?.id,
    name: track.track.name,
    artists: track.track.artists.map((artist: any) => artist.name).join(", "),
    album: track.track.album.name,
    image: track.track.album.images[0].url,
    previewUrl: track.track.preview_url,
    uri: track.track.uri,
    duration: Math.round(track.track.duration_ms / 1000),
  };
};
