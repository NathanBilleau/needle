import { Image } from './auth'

export interface Playlist {
  collaborative: boolean;
  description: string;
  external_urls: { spotify: string; };
  href: string;
  id: string;
  images: Image[];
  name: string;
  owner: {
    display_name: string;
    external_urls: { spotify: string; };
    href: string;
    id: string;
    type: string;
    uri: string;
  };
  primary_color: string;
  public: boolean;
  snapshot_id: string;
  tracks: {
    href: string;
    total: number;
  };
  type: string;
  uri: string;
}

export interface Track {
  added_at: string;
  added_by: {
    external_urls: { spotify: string; };
    href: string;
    id: string;
    type: string;
    uri: string;
  };
  is_local: boolean;
  primary_color: string;
  track: {
    album: {
      album_type: string;
      artists: {
        external_urls: { spotify: string; };
        href: string;
        id: string;
        name: string;
        type: string;
        uri: string;
      }[];
      available_markets: string[];
      external_urls: { spotify: string; };
      href: string;
      id: string;
      images: Image[];
      name: string;
      release_date: string;
      release_date_precision: string;
      total_tracks: number;
      type: string;
      uri: string;
    };
    artists: {
      external_urls: { spotify: string; };
      href: string;
      id: string;
      name: string;
      type: string;
      uri: string;
    }[];
    available_markets: string[];
    disc_number: number;  
    duration_ms: number;
    episode: boolean;
    explicit: boolean;
    external_ids: { isrc: string; };
    external_urls: { spotify: string; };
    href: string;
    id: string;
    is_local: boolean;
    name: string;
    popularity: number; 
    preview_url: string;
    track: boolean;
    track_number: number;
    type: string;
    uri: string;
  };
  video_thumbnail: {
    url: string;
  };
};

export interface ISimpleTrack {
  id: string;
  name: string;
  artists: string;
  album: string;
  image: string;
  previewUrl: string;
  uri: string;
  duration: number;
}