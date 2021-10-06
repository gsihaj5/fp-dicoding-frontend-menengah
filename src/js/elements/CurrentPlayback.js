import "../../style/elements/CurrentPlayback.css"

export default class CurrentPlayback extends HTMLElement {
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
        this['track-image'] = this.getAttribute("track-image") || null;
        this['track-name'] = this.getAttribute("track-name") || null;

        this['artist-image'] = this.getAttribute("artist-image") || null;
        this['artist-name'] = this.getAttribute("artist-name") || null;

        this.innerHTML = `
            <div class = "current-playback-element">
                <div class="image-container">
                    <img class = "track-img" src="${this['track-image']}">
                    <img class = "artist-img" src="${this['artist-image']}">
                </div>
                <div class = "track-info">
                    ${this['track-name']}
                    <div class = "artist-info">
                        ${this['artist-name']}
                    </div>
                </div>
            </div>
        `
    }
}
