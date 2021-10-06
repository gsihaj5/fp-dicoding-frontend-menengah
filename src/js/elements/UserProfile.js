import "../../style/elements/UserProfile.css"

export default class UserProfile extends HTMLElement {
    static get observedAttributes() {
        return [
            'user-image',
            'user-name'
        ]
    }

    constructor() {
        super();
    }

    connectedCallback() {
        this['user-image'] = this.getAttribute("user-image") || null;
        this['user-name'] = this.getAttribute("user-name") || null;

        console.log("connected")

        this.innerHTML = `
            <div class = "user-profile-element">
                <div class="loading-block"></div>
            </div>
        `
    }

    attributeChangedCallback(name, oldValue, newValue) {
        this[name] = newValue

        this.innerHTML = `
            <div class = "user-profile-element">
                <img src="${this['user-image']}">
                
                ${this['user-name']}
            </div>
        `
    }

}