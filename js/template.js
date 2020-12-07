const buildTemplate = function(obj, templateHTML){
    const templateFn = new Function('obj', `return \`${templateHTML}\``)
    return templateFn(obj);
}

const template = {
    album: function(obj){
        return buildTemplate(obj, `
            <div class="some-links">
                <ul>
                    <li>home</li>
                    <li>${obj.albumType}</li>
                    <li>${obj.songName} SONG</li>
                    <li>${obj.songName}</li>
                </ul>
            </div>
            <div class="row">
                <div class="col-xs-12 col-sm-12 col-md-3 col-lg-3 col-xl-3">
                    <div class="album-main-img-div">
                        <div class="page-main-img-parent">
                            <img class="page-main-img" src="${obj.imgSrc}">
                        </div>
                        <div class="artist-info-section">
                            <h3 class="headings">Artist</h3>
                            <div class="artist-infom">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-xs-12 col-sm-12 col-md-9 col-lg-9 col-xl-9">
                    <div class="song-details">
                        <div>
                            <h2 class="song-name">${obj.songName}</h2>
                            <span>${obj.songName}</span>
                            <span>4:11 • ${obj.releasedate} ℗  ${obj.label}  Pvt.</span>
                        </div>
                        <div class="album-song-div">
                            <div class="button-div">
                                <button class="btn">Play Now</button>
                                <button class="btn btn-2">download</button>
                                <button class="btn btn-2 free-hellotune-btn">set free hellotune</button>
                                <div class="font-wrapper">
                                    <svg class="font">
                                        <use xlink:href="./img/icons.svg#heart-node"></use>
                                    </svg>
                                </div>
                            </div>
                            <div class="button-div">
                                <div class="font-wrapper share-btn">
                                    <svg class="font">
                                        <use xlink:href="./img/icons.svg#share-node"></use>
                                    </svg>
                                </div>
                                <div class="font-wrapper">
                                    <svg class="font">
                                        <use xlink:href="./img/icons.svg#dottedMenu-node"></use>
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div class="album-song-list">
                            <h3 class="headings">Other <a>${obj.albumArtistsName}</a> Songs</h3>
                        </div>
                    </div>
                </div>
            </div>
        `)
    },

    albumAboutSong:function(obj){
        return buildTemplate(obj, 
            `<div class="about-song">
                <div>
                    <img src="${obj.imgSrc}">
                </div>
                <div>
                    <h3 class="headings">About Song</h3>
                    <p>${obj.songName} is a song which is sung by <a herf="artist-page.html">${obj.albumArtistsName}</a>. 
                    The duration of the song is 4 min, 11 sec. You can listen to Waada Hai song online for free, 
                    or download the mp3 from the Wynk Music mobile app. Keep Wynking!</p>
                </div>
            </div>`
        )
    },
    aboutartists:function(artistObj){
        return buildTemplate(artistObj, 
            `
            <div>
                <img class="artists-img" src="${artistObj.artistMainImg}" />
            </div>
            <div class="artist-name">
                <p>${artistObj.albumArtistsName}</p>
                <span>Singer</span>
            </div>
            `
        ) 
    },
    songListHtml : function(songListObj){
        return buildTemplate(songListObj, 
            `
            <div class="button-div">
                <audio controls class="audio-position">
                    <source src="${songListObj.songMP3Url}" type="audio/ogg">
                </audio>
                <div class="playButton-position">
                    <svg class="font font-opacity">
                        <use xlink:href="./img/icons.svg#music-list-node"></use>
                    </svg>
                    <div onclick="togglePlayPause(this)" class="toggle">
                        <svg class="playButton-on-image">
                            <use xlink:href="./img/icons.svg#playButton-node"></use>
                        </svg>
                        <svg class="playButton-on-image hide">
                            <use xlink:href="./img/icons.svg#pause-node"></use>
                        </svg>
                    </div>
                </div>
                <div class="align-self">
                    <p>${songListObj.albumName}</p>
                    <span>${songListObj.artistNames}</span>
                </div>
            </div>
            <div class="button-div">
                <div class="font-wrapper align-self">
                    <svg class="font">
                        <use xlink:href="./img/icons.svg#download-node"></use>
                    </svg>
                </div>
                <div class="font-wrapper align-self">
                    <svg class="font">
                        <use xlink:href="./img/icons.svg#dottedMenu-node"></use>
                    </svg>
                </div>
            </div>
            `
        )
    }
    // artistPage:function(songListObj){
    //     return buildTemplate(songListObj, )
    
    // }
}