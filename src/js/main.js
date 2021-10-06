import "../style/style.css";
import SpotifyApi from "./SpotifyApi.js";
import ElementLoader from "./elements/ElementLoader.js";

let elementLoader = new ElementLoader();
elementLoader.loadElement();

let spotify_api

window.onload = async () => {
    //region Dom Element
    let loginContainer = document.querySelector(".login-container");
    let loginButton = document.querySelector(".button.login-button");
    let logoutButton = document.querySelector(".button.logout-button");
    //endregion

    spotify_api = new SpotifyApi();

    if (!spotify_api.isAuthorized()) {
        await spotify_api.authorize();
        logoutButton.remove();
        loginButton.addEventListener("click", () =>
            spotify_api.requestAuthorization()
        );
    } else {
        loginContainer.remove();
        logoutButton.addEventListener("click", () => {
                window.localStorage.clear()
                window.location.reload()
            }
        );
        await fetchAllSpotifyData()
    }


};

async function fetchAllSpotifyData() {
    let userProfileDom = document.querySelector(".user-profile")
    let userDeviceDom = document.querySelector(".user-devices")
    let currentPlaybackDom = document.querySelector(".current-track")
    let trackHistoryDom = document.querySelector(".track-history")
    let playlistDom = document.querySelector(".playlist")

    //region initial element
    let userProfileElement = document.createElement("user-profile")
    userProfileDom.appendChild(userProfileElement)

    let userDeviceElement = document.createElement("user-device");
    userDeviceDom.appendChild(userDeviceElement);
    //endregion

    spotify_api.getCurrentUserProfile().then((response) => {
        let data = response.data
        userProfileElement.setAttribute("user-image", data.images[0].url)
        userProfileElement.setAttribute("user-name", data.display_name)
    });

    spotify_api.getUsersDevice().then((response) => {
        let data = response.data;
        userDeviceDom.innerHTML = '';

        data.devices.forEach((device) => {
            userDeviceDom.innerHTML += `
                <user-device device-name="${device.name}" device-type="${device.type}"></user-device>
            `
        })
    });

    spotify_api.getCurrentPlayback().then((response) => {
            let item = response.data.item
            spotify_api.getTrack(item.href).then(trackResponse => {
                let track = trackResponse.data
                spotify_api.getArtist(track.artists[0].href).then(artistResponse => {
                    let artist = artistResponse.data
                    currentPlaybackDom.innerHTML += `
                        <current-playback
                            track-image="${track.album.images[0].url}"
                            track-name="${track.name}" 
                            artist-image="${artist.images[0].url}"
                            artist-name="${artist.name}" 
                        ></current-playback>
                    `
                })
            })
        }
    )

    spotify_api.getRecentTrack().then(response => {
        let tracks = response.data.items

        tracks.forEach(trackHistory => {
            let track = trackHistory.track
            console.log(track)
            trackHistoryDom.innerHTML += `
                        <track-item
                            track-image="${track.album.images[0].url}"
                            track-name="${track.name}" 
                            artist-name="${track.artists[0].name}"
                        ></track-item>
                    `
        })

    });
    spotify_api.getPlaylist().then(response => {
        let playlists = response.data.items;

        playlists.forEach((playlist, index) => {
            console.log(index, playlist.name)
            playlistDom.innerHTML += `
                <playlist-item
                    playlist-index = ${index}
                    playlist-name = "${playlist.name}"
                >
                </playlist-item>
            `
        })


    });
}
