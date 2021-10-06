import UserProfile from "./UserProfile.js";
import UserDevice from "./UserDevice.js";
import CurrentPlayback from "./CurrentPlayback.js";
import TrackItem from "./TrackItem.js";
import PlaylistItem from "./PlaylistItem.js";

export default class ElementLoader {
    constructor() {

    }

    loadElement() {
        customElements.define("user-profile", UserProfile)
        customElements.define("user-device", UserDevice)
        customElements.define("current-playback", CurrentPlayback)
        customElements.define("track-item", TrackItem)
        customElements.define("playlist-item", PlaylistItem)
    }
}
