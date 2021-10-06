import "../../style/elements/TrackItem.css"

export default class TrackItem extends HTMLElement {
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
        this['artist-name'] = this.getAttribute("artist-name") || null;

        this.innerHTML = `
            <div class = "track-item-element">
                <img class = "track-img" src="${this['track-image']}">
                <div class="history-track-info">
                    ${this['track-name']}
                    <div class = "history-artist-info">
                        ${this['artist-name']}
                    </div>
                </div>
            </div>
        `
    }
}
