import "../../style/elements/PlaylistItem.css"

export default class PlaylistItem extends HTMLElement {
    static get observedAttributes() {
        return [
            'track-image',
            'track-name'
        ]
    }

    constructor() {
        super();
    }

    connectedCallback() {
        this['playlist-name'] = this.getAttribute("playlist-name") || null;
        this['playlist-index'] = this.getAttribute("playlist-index") || null;

        this.innerHTML = `
            <div class = "playlist-item-element">
                ${this['playlist-index']}.
                ${this['playlist-name']}
                <div class ="underline"></div>
            </div>
        `
    }
}
