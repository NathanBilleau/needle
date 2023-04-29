import { TokenResponse, UserProfile } from "./interfaces/auth";
/**
 * Generate auth url to get Authorization Code
 */
export declare const generateAuthUrl: () => string;
/**
 * Generate user token
 */
export declare const generateUserToken: (code: string) => Promise<TokenResponse>;
/**
 * Refresh user token
 */
export declare const refreshUserToken: (refreshToken: string) => Promise<TokenResponse>;
/**
 * Get the current user's profile
 */
export declare const getCurrentUser: (token: string) => Promise<UserProfile>;
//# sourceMappingURL=auth.d.ts.map