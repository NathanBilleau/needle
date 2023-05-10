"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Spotify = void 0;
var Spotify = exports.Spotify = /** @class */ (function () {
    function Spotify() {
    }
    var _a;
    _a = Spotify;
    Spotify.client_id = "";
    Spotify.client_secret = "";
    Spotify.token = "";
    Spotify.refreshToken = "";
    Spotify.expires_in = 0;
    // constructor(client_id: string, client_secret: string) {
    //   this.client_id = client_id;
    //   this.client_secret = client_secret;
    // }
    /**
     * Set client id and client secret
     */
    Spotify.setClient = function (client_id, client_secret) {
        _a.client_id = client_id;
        _a.client_secret = client_secret;
    };
    /**
     * Generate auth url to get Authorization Code
     */
    Spotify.generateAuthUrl = function () {
        var state = Math.random().toString(36).substring(2, 15) +
            Math.random().toString(36).substring(2, 15);
        var params = new URLSearchParams({
            response_type: "code",
            client_id: _a.client_id,
            client_secret: _a.client_secret,
            scope: "user-read-private user-read-email",
            redirect_uri: "http://localhost:8000/callback",
            state: state,
        });
        return "https://accounts.spotify.com/authorize?" + params.toString();
    };
    /**
     * Generate user token
     */
    Spotify.generateUserToken = function (code) { return __awaiter(void 0, void 0, void 0, function () {
        var params, token, response;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0:
                    params = new URLSearchParams({
                        grant_type: "authorization_code",
                        code: code,
                        redirect_uri: "http://localhost:8000/callback",
                        client_id: this.client_id,
                        client_secret: this.client_secret,
                    });
                    return [4 /*yield*/, fetch("https://accounts.spotify.com/api/token", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/x-www-form-urlencoded",
                            },
                            body: params.toString(),
                        })];
                case 1:
                    token = _b.sent();
                    return [4 /*yield*/, token.json()];
                case 2:
                    response = _b.sent();
                    this.token = response.access_token;
                    this.refreshToken = response.refresh_token;
                    this.expires_in = response.expires_in;
                    this.autoRefreshUserToken(code);
                    return [2 /*return*/];
            }
        });
    }); };
    /**
     * Automatically refresh user token
     */
    Spotify.autoRefreshUserToken = function (code) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(_a, function (_b) {
            setTimeout(function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, this.generateUserToken(code)];
                        case 1:
                            _b.sent();
                            return [2 /*return*/];
                    }
                });
            }); }, this.expires_in * 1000 - 60 * 1000);
            return [2 /*return*/];
        });
    }); };
    /**
     * Get the current user's profile
     */
    Spotify.getCurrentUser = function () { return __awaiter(void 0, void 0, void 0, function () {
        var user;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, fetch("https://api.spotify.com/v1/me", {
                        headers: {
                            Authorization: "Bearer " + this.token,
                        },
                    })];
                case 1:
                    user = _b.sent();
                    return [4 /*yield*/, user.json()];
                case 2: return [2 /*return*/, _b.sent()];
            }
        });
    }); };
    /**
     * Get the current user's playlists
     */
    Spotify.getCurrentUserPlaylists = function () { return __awaiter(void 0, void 0, void 0, function () {
        var playlists;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, fetch("https://api.spotify.com/v1/me/playlists", {
                        headers: {
                            Authorization: "Bearer " + this.token,
                        },
                    })];
                case 1:
                    playlists = _b.sent();
                    return [4 /*yield*/, playlists.json()];
                case 2: return [2 /*return*/, _b.sent()];
            }
        });
    }); };
    /**
     * Get the current user playlist tracks
     */
    Spotify.getPlaylistTracks = function (playlistId) { return __awaiter(void 0, void 0, void 0, function () {
        var playlists;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, fetch("https://api.spotify.com/v1/playlists/".concat(playlistId, "/tracks"), {
                        headers: {
                            Authorization: "Bearer " + this.token,
                        },
                    })];
                case 1:
                    playlists = _b.sent();
                    return [4 /*yield*/, playlists.json()];
                case 2: return [2 /*return*/, _b.sent()];
            }
        });
    }); };
    /**
     * Get track details
     */
    Spotify.getTrack = function (trackId) { return __awaiter(void 0, void 0, void 0, function () {
        var track;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, fetch("https://api.spotify.com/v1/tracks/".concat(trackId), {
                        headers: {
                            Authorization: "Bearer " + this.token,
                        },
                    })];
                case 1:
                    track = _b.sent();
                    return [4 /*yield*/, track.json()];
                case 2: return [2 /*return*/, _b.sent()];
            }
        });
    }); };
    return Spotify;
}());
//# sourceMappingURL=index.js.map