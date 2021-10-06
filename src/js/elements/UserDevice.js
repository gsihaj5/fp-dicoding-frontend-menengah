import "../../style/elements/UserDevice.css"

export default class UserDevice extends HTMLElement {
    static get observedAttributes() {
        return [
            'device-name',
            'device-type'
        ]
    }

    constructor() {
        super();
    }

    connectedCallback() {
        this['device-name'] = this.getAttribute("device-name") || null;
        this['device-type'] = this.getAttribute("device-type") || null;

        console.log(
            this['device-name'],
            this['device-type']
        )

        if (this['device-name'] === null || this['device-type'] === null) {
            this.innerHTML = `
                <div class = "user-device-element">
                    <div class="loading-block"></div>
                </div>
            `
            return
        }

        let imgSrc
        if (this['device-type'] === 'Computer')
            imgSrc = "https://img.icons8.com/external-photo3ideastudio-lineal-photo3ideastudio/64/000000/external-computer-gadget-photo3ideastudio-lineal-photo3ideastudio.png"
        else if (this['device-type'] === 'Smartphone')
            imgSrc = "https://img.icons8.com/external-kiranshastry-lineal-kiranshastry/64/000000/external-smartphone-multimedia-kiranshastry-lineal-kiranshastry.png"
        console.log(imgSrc)

        this.innerHTML = `
            <div class = "user-device-element">
                <div class = "image-container">
                
                    <img src="${imgSrc}">
                </div>
                
                ${this['device-name']}
            </div>
        `
    }


}
