import { UserProfile } from "./interfaces/auth";
import { Playlist, Track } from "./interfaces/music";
import { Response } from "./interfaces/response";
export declare class Spotify {
    static client_id: string;
    static client_secret: string;
    static token: string;
    static refreshToken: string;
    static expires_in: number;
    /**
     * Set client id and client secret
     */
    static setClient: (client_id: string, client_secret: string) => void;
    /**
     * Generate auth url to get Authorization Code
     */
    static generateAuthUrl: () => string;
    /**
     * Generate user token
     */
    static generateUserToken: (code: string) => Promise<void>;
    /**
     * Automatically refresh user token
     */
    static autoRefreshUserToken: (code: string) => Promise<void>;
    /**
     * Get the current user's profile
     */
    static getCurrentUser: () => Promise<UserProfile>;
    /**
     * Get the current user's playlists
     */
    static getCurrentUserPlaylists: () => Promise<Response<Playlist>>;
    /**
     * Get the current user playlist tracks
     */
    static getPlaylistTracks: (playlistId: string) => Promise<Response<Track>>;
    /**
     * Get track details
     */
    static getTrack: (trackId: string) => Promise<any>;
}
//# sourceMappingURL=index.d.ts.map