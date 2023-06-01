import { Spotify } from "./spotify";
import { bundle } from '@remotion/bundler';
import { getCompositions, renderMedia } from '@remotion/renderer';
import { Track } from "./interfaces/music";
import path from "path";
import { enableSass } from './enable-sass';

/**
 * Get current month Spotify playlist
 */
export const getCurrentMonthPlaylist = async () => {
  console.log('getCurrentMonthPlaylist')
  // const currentMonth = (new Date().getMonth() + 1).toString().padStart(2, "0").toString();
  // const currentYear = new Date().getFullYear().toString().slice(-2).toString();
  // const currentPlaylistName = `${currentMonth}${currentYear}`;
  const currentPlaylistName = '0523'

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
    id: track.track.id,
    name: track.track.name,
    artists: track.track.artists.map((artist: any) => artist.name).join(", "),
    album: track.track.album.name,
    image: track.track.album.images[0].url,
    previewUrl: track.track.preview_url,
    uri: track.track.uri,
    duration: Math.round(track.track.duration_ms / 1000),
  };
};

/**
 * Render remotion video
 */
export const renderVideo = async () => {
  console.log('renderVideo')
  const tracks = (await getVideoTracks()).map(transformTrack);
  console.time("render");
  // The composition you want to render
  const compositionId = "MyComp";

  // You only have to do this once, you can reuse the bundle.
  const entry = "../video/src/index.ts";
  console.log("Creating a Webpack bundle of the video");
  const bundleLocation = await bundle(path.resolve(entry), () => undefined, {
    // If you have a Webpack override, make sure to add it here
    webpackOverride: enableSass,
  });

  // Parametrize the video by passing arbitrary props to your component.
  const inputProps = {
    tracks,
  };

  // Extract all the compositions you have defined in your project
  // from the webpack bundle.
  const comps = await getCompositions(bundleLocation, {
    // You can pass custom input props that you can retrieve using getInputProps()
    // in the composition list. Use this if you want to dynamically set the duration or
    // dimensions of the video.
    inputProps,
  });

  // Select the composition you want to render.
  const composition = comps.find((c) => c.id === compositionId);

  // Ensure the composition exists
  if (!composition) {
    throw new Error(`No composition with the ID ${compositionId} found.
  Review "${entry}" for the correct ID.`);
  }

  const outputLocation = `out/${compositionId}.mp4`;
  console.log("Attempting to render:", outputLocation);
  await renderMedia({
    composition,
    serveUrl: bundleLocation,
    codec: "h264",
    outputLocation,
    inputProps,
    concurrency: 6,
    quality: 50,
    videoBitrate: "1M"
  });
  console.timeEnd("render");
  console.log("Render done!");
};

/**
 * Schedule video render each week
 */
export const scheduleVideoRender = () => {
  console.log('scheduleVideoRender')
  renderVideo();
  // const job = new CronJob('0 0 * * 0', async () => {
  //   await renderVideo();
  // }, null, true, 'Europe/Paris');
  
  // console.log('scheduling video render');
  // job.start();
}
