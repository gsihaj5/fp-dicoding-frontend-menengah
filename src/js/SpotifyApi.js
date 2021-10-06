const axios = require("axios").default;
const querystring = require("querystring");

export default class SpotifyApi {
    URL_REDIRECT = "spotifydashboard.gerrysihaj.com/";
    BASE_URL_AUTHORIZATION = "https://accounts.spotify.com/authorize";
    BASE_URL_TOKEN = "https://accounts.spotify.com/api/token";

    BASE_URL_API = "https://api.spotify.com/v1";
    API_URL_GET_CURRENT_USER = this.BASE_URL_API + "/me";
    API_URL_GET_USER_DEVICES = this.BASE_URL_API + "/me/player/devices";
    API_URL_GET_CURRENT_PLAYBACK = this.BASE_URL_API + "/me/player";
    API_URL_GET_RECENTLY_PLAYED = this.BASE_URL_API + "/me/player/recently-played";
    API_URL_GET_PLAYLIST = this.BASE_URL_API + "/me/playlists";

    constructor() {
        this.client_id = "820e51135e894e039f2e6f289313f754";
        this.client_secret = "f1cb36a2e6164f39a27f0a4a10d2c154";

        this.token = localStorage.getItem("spotify-token");
        this.refresh_token = localStorage.getItem("spotify-refresh-token");
    }

    async authorize() {
        console.log("authorizing");
        this._initAuthorizationURL();
        if (this.isRedirected())
            await this._handleRedirectAfterAuth(window.location.search, () => window.location.reload());
    }

    isRedirected() {
        return window.location.search.length > 0;
    }

    isAuthorized() {
        if (this.token === undefined || this.token === null) return false;

        let now = new Date().getTime();
        let expiry = new Date().setTime(localStorage.getItem("token-expiry"));

        return now < expiry;
    }

    _initAuthorizationURL() {
        this.URL_AUTHORIZATION = this.BASE_URL_AUTHORIZATION;
        this.URL_AUTHORIZATION += "?client_id=" + this.client_id;
        this.URL_AUTHORIZATION += "&response_type=code";
        this.URL_AUTHORIZATION +=
            "&redirect_uri=" + encodeURI(this.URL_REDIRECT);

        this.URL_AUTHORIZATION += "&show_dialog=true";
        this.URL_AUTHORIZATION +=
            "&scope=user-read-private user-read-email user-modify-playback-state user-read-playback-position user-library-read streaming user-read-playback-state user-read-recently-played playlist-read-private";
    }

    requestAuthorization() {
        window.location.href = this.URL_AUTHORIZATION; //redirect ke spotify authorization web
    }

    async _handleRedirectAfterAuth(query, onSuccess) {
        let parameter = new URLSearchParams(query);
        this.code = parameter.get("code");

        await this._requestToken(onSuccess);
    }

    async _requestToken(onSuccess) {
        let header = {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization:
                "Basic " + btoa(this.client_id + ":" + this.client_secret),
        };

        let body = {
            grant_type: "authorization_code",
            code: this.code.toString(),
            redirect_uri: encodeURI(this.URL_REDIRECT),
            client_id: this.client_id,
            client_secret: this.client_secret,
        };

        await axios
            .post(this.BASE_URL_TOKEN, querystring.stringify(body), {
                headers: header,
            })
            .then((response) => {
                let data = response.data;

                this.token = data.access_token;
                this.refresh_token = data.refresh_token;

                this._saveTokenToLocalStorage();

                if (onSuccess) onSuccess();
            })
            .catch((e) =>
                console.log("Failed to retrieve Token : " + e.message)
            );
    }

    _saveTokenToLocalStorage() {
        window.localStorage.setItem("spotify-token", this.token);
        window.localStorage.setItem(
            "token-expiry",
            new Date().getTime() + 60 * 60000
        );
        window.localStorage.setItem(
            "spotify-refresh-token",
            this.refresh_token
        );
    }

    async _spotifyGetRequest(url) {
        let header = {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: "Bearer " + this.token,
        };

        let responseAxios;
        await axios
            .get(url, {
                headers: header,
            })
            .then((response) => {
                responseAxios = response
            })
            .catch((e) => console.log(e));

        return responseAxios
    }

    async getCurrentUserProfile() {
        return this._spotifyGetRequest(this.API_URL_GET_CURRENT_USER)
    }

    async getCurrentPlayback() {
        return this._spotifyGetRequest(this.API_URL_GET_CURRENT_PLAYBACK)
    }

    async getUsersDevice() {
        return this._spotifyGetRequest(this.API_URL_GET_USER_DEVICES)
    }

    async getRecentTrack() {
        return this._spotifyGetRequest(this.API_URL_GET_RECENTLY_PLAYED)
    }

    async getPlaylist() {
        return this._spotifyGetRequest(this.API_URL_GET_PLAYLIST)
    }

    async getArtist(url) {
        return this._spotifyGetRequest(url)
    }

    async getTrack(url) {
        return this._spotifyGetRequest(url)
    }
}
