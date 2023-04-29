import { UserProfile } from "./interfaces/auth";
export declare class Spotify {
    client_id: string;
    client_secret: string;
    token: string;
    refreshToken: string;
    expires_in: number;
    constructor(client_id: string, client_secret: string);
    /**
     * Generate auth url to get Authorization Code
     */
    generateAuthUrl: () => string;
    /**
     * Generate user token
     */
    generateUserToken: (code: string) => Promise<void>;
    /**
     * Automatically refresh user token
     */
    autoRefreshUserToken: (code: string) => Promise<void>;
    /**
     * Get the current user's profile
     */
    getCurrentUser: () => Promise<UserProfile>;
    /**
     * Get the current user's playlists
     */
    getCurrentUserPlaylists: () => Promise<any>;
    /**
     * Get the current user playlist tracks
     */
    getCurrentUserPlaylistTracks: (playlistId: string) => Promise<any>;
    /**
     * Get track details
     */
    getTrack: (trackId: string) => Promise<any>;
}
//# sourceMappingURL=auth.d.ts.map