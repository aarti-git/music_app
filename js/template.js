const buildTemplate = function (obj, templateHTML) {
  const templateFn = new Function("obj", `return \`${templateHTML}\``);
  return templateFn(obj);
};

const template = {
  // new release.js or hindi-pop.js
  newReleaseAlbum: function (obj) {
    return buildTemplate(
      obj,
      `
        <div class="song-img-overlay-wrapper">
            <img class="song-img" src=${obj.imgSrc}>
            <div class="songs-img-overlay-wrapper">
                <a href="song-album-page.html?album-id=${obj.albumId}">
                    <div class="songs-img-overlay">
                        <div class="play-button-div">
                            <svg class="play-font">
                                <use xlink:href="./img/icons.svg#playButton-node"></use>
                            </svg>
                        </div>
                        <div class="songs-img-overlay-endFont">
                            <div class="img-layout-font">
                                <svg class="font">
                                    <use xlink:href="./img/icons.svg#share-node"></use>
                                </svg>
                            </div>
                            <div class="img-layout-font">
                                <svg class="font">
                                    <use xlink:href="./img/icons.svg#dottedMenu-node"></use>
                                </svg>
                            </div>
                        </div>
                    </div>
                </a>
            </div>
        </div>
        <div class="song-name-div">
            <p>${obj.albumName}</p>
            <span>${obj.artistNames}</span>
        </div>`
    );
  },

  // artist.js
  artistalbumList: function (obj) {
    return buildTemplate(
      obj,
      `
            <div class="artist-img-div">
                <div class="artist-img-wrapper">
                    <img class="artist-img" src="${obj.imgSrc}">
                </div>
                <div class="songs-img-overlay-wrapper">
                    <a href="artists-topsong-albumpage.html?artist-id=${obj.artistId}">
                        <div class="artist-img-overlay"></div>
                    </a>
                </div>
            </div>
            <div class="artist-name-div">${obj.artistName}</div>
            `
    );
  },

  // categories.js
  categoriesAlbum: function (obj) {
    return buildTemplate(
      obj,
      `
            <div class="song-img-overlay-wrapper">
                <img class="song-img" src=${obj.imgSrc}>
                <div class="songs-img-overlay-wrapper">
                    <a href="categories-album.html?album-id=${obj.albumId}">
                        <div class="songs-img-overlay">
                            <div class="play-button-div">
                                <svg class="play-font">
                                    <use xlink:href="./img/icons.svg#playButton-node"></use>
                                </svg>
                            </div>
                            <div class="songs-img-overlay-endFont">
                                <div class="img-layout-font">
                                    <svg class="font">
                                        <use xlink:href="./img/icons.svg#share-node"></use>
                                    </svg>
                                </div>
                                <div class="img-layout-font">
                                    <svg class="font">
                                        <use xlink:href="./img/icons.svg#dottedMenu-node"></use>
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </a>
                </div>
            </div>
            <div class="song-name-div">
                <p>${obj.albumName}</p>
            </div>`
    );
  },

  // new-release-albumPage.js
  album: function (obj) {
    return buildTemplate(
      obj,
      `
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
                                <button class="btn" onclick="playNow()">Play Now</button>
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
        `
    );
  },
  albumAboutSong: function (obj) {
    return buildTemplate(
      obj,
      `<div class="about-song">
                <div>
                    <img src="${obj.imgSrc}">
                </div>
                <div>
                    <h3 class="headings">About Song</h3>
                    <p>${obj.songName} is a song which is sung by <a href="artists-topsong-albumpage.html?artist-id=${obj.albumArtistsId}">${obj.albumArtistsName}</a>. 
                    The duration of the song is 4 min, 11 sec. You can listen to Waada Hai song online for free, 
                    or download the mp3 from the Wynk Music mobile app. Keep Wynking!</p>
                </div>
            </div>`
    );
  },
  aboutartists: function (artistObj) {
    return buildTemplate(
      artistObj,
      `
            <a href="artists-topsong-albumpage.html?artist-id=${artistObj.albumArtistsId}">
            <div class="artist-img-name-div">
                <div>
                    <img class="artists-img" src="${artistObj.artistMainImg}" />
                </div>
                <div class="artist-name">
                    <p>${artistObj.albumArtistsName}</p>
                    <span>Singer</span>
                </div>
            </div>
            </a>
            `
    );
  },
  songListHtml: function (songListObj) {
    return buildTemplate(
      songListObj,
      ` <div class="button-div" ${
        songListObj.audioEvent
      } ${songListObj.dataAttrs.join(" ")}>
                ${songListObj.anchorTagStart}
                    <div class="playButton-position">
                        <div class="active-music-logo">
                            <svg class="font font-opacity">
                                <use xlink:href="./img/icons.svg#music-list-node"></use>
                            </svg>
                            <svg class="font font-opacity hide animationOnMusicIcon">
                                <use xlink:href="./img/icons.svg#song-waves-node"></use>
                            </svg>
                        </div>
                        <div ${songListObj.outsidArrow}>
                            <svg class="playButton-on-image">
                                <use xlink:href="./img/icons.svg#${
                                  songListObj.svgId
                                }"></use>
                            </svg>
                            <svg class="playButton-on-image hide animationOnMusicIcon">
                                <use xlink:href="./img/icons.svg#song-waves-node"></use>
                            </svg>
                        </div>
                    </div>
                ${songListObj.anchorTagEnd}
                <div class="align-self">
                    <p>${songListObj.albumName}</p>
                    <span>${songListObj.artistNames}</span>
                </div>
            </div>
            <div class="button-div">
                <div class="font-wrapper align-self" onclick="likeSongToggle(this)">
                    <svg class="font">
                        <use xlink:href="./img/icons.svg#heart-node"></use>
                    </svg>
                </div>
                <div class="font-wrapper align-self">
                    <svg class="font">
                        <use xlink:href="./img/icons.svg#dottedMenu-node"></use>
                    </svg>
                </div>
            </div>
            `
    );
  },

  // Categories-albumlst.js
  CategoriesAlbum: function (obj) {
    return buildTemplate(
      obj,
      `
        <div class="some-links">
        <ul>
            <li>home</li>
            <li>hindi song</li>
            <li>${obj.categoriesName} song</li>
            <li>${obj.categoriesName}</li>
        </ul>
    </div>
    <div class="row">
        <div class="col-xs-12 col-sm-12 col-md-3 col-lg-3 col-xl-3">
            <div class="abot-artist-columan">
                <div class="page-main-img-parent">
                    <img class="page-main-img" src="${obj.imgSrc}">
                </div>
            </div>
        </div>
        <div class="col-xs-12 col-sm-12 col-md-9 col-lg-9 col-xl-9">
            <div class="song-details">
                <h2>${obj.categoriesName}</h2>
                <div class="album-song-div">
                    <div class="button-div">
                        <button class="btn" onclick="playNow()">Play Now</button>
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
                <div>
                    <div>
                        <h3 class="headings">Albums</h3>
                    </div>
                    <div class="img-wrapper-categoriesAlbum">
                    </div>
                </div>
            </div>
        </div>
    </div>
        `
    );
  },
  categoriesAlbumList: function (Listobj) {
    return buildTemplate(
      Listobj,
      `
            <div class="song-img-overlay-wrapper">
                    <img class="song-img" src="${Listobj.albumImg}">
                    <div class="songs-img-overlay-wrapper">
                        <a href="categories-playlist.html?playlist-id=${Listobj.albumId}">
                            <div class="songs-img-overlay">
                                <div class="play-button-div">
                                    <svg class="play-font">
                                        <use xlink:href="./img/icons.svg#playButton-node"></use>
                                    </svg>
                                </div>
                                <div class="songs-img-overlay-endFont">
                                    <div class="img-layout-font">
                                        <svg class="font">
                                    <use xlink:href="./img/icons.svg#share-node"></use>
                                </svg>
                                    </div>
                                    <div class="img-layout-font">
                                        <svg class="font">
                                    <use xlink:href="./img/icons.svg#dottedMenu-node"></use>
                                </svg>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
                <div class="song-name-div">
                    <p>${Listobj.albumName}</p>
                </div>
            `
    );
  },

  // categories-playlist.js
  categoriesPlaylist: function (obj) {
    return buildTemplate(
      obj,
      `
        <div class="some-links">
            <ul>
                <li>home</li>
                <li>Playlist</li>
                <li>${obj.albumName} SONG</li>
                <li>${obj.albumName}</li>
            </ul>
        </div>
        <div class="row">
            <div class="col-xs-12 col-sm-12 col-md-3 col-lg-3 col-xl-3">
                <div class="abot-artist-columan">
                    <div class="page-main-img-parent">
                        <img class="page-main-img" src="${obj.imgSrc}">
                    </div>
                </div>
            </div>
            <div class="col-xs-12 col-sm-12 col-md-9 col-lg-9 col-xl-9">
                <div class="song-details">
                    <h2 class="song-name">${obj.albumName}</h2>
                    <span>${obj.albumName}</span>
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
                        <h3 class="headings">Other <a>${obj.albumType}</a> Songs</h3>
                    </div>
                </div>
            </div>
        </div>
    `
    );
  },
  aboutpageSong: function (obj) {
    return buildTemplate(
      obj,
      `
            <div class="about-song">
                <div>
                    <img src="${obj.imgSrc}">
                </div>
                <div>
                    <h3 class="headings">About Song</h3>
                    <p>${obj.albumName} is a song which is sung by <a herf="artist-page.html">${obj.albumType}</a>. 
                    The duration of the song is 4 min, 11 sec. You can listen to Waada Hai song online for free, 
                    or download the mp3 from the Wynk Music mobile app. Keep Wynking!</p>
                </div>
            </div>
            `
    );
  },

  // artist-topsong.js
  artistTopsongsAlbum: function (obj) {
    return buildTemplate(
      obj,
      `
        <div class="some-links">
        <ul>
            <li>home</li>
            <li>hindi song</li>
            <li>${obj.artistName} song</li>
            <li>${obj.artistName}</li>
        </ul>
    </div>
    <div class="row">
        <div class="col-xs-12 col-sm-12 col-md-3 col-lg-3 col-xl-3">
            <div class="abot-artist-columan">
                <div class="page-main-img-parent">
                    <img class="page-main-img" src="${obj.imgSrc}">
                </div>
                <div class="about-artist">
                    <h3 class="headings">about ${obj.artistName}</h3>
                    <div>
                         <p>${obj.artistName} is an Indian playback singer, actor, lyricist, composer, producer, director, and screenwriter. He is considered one of the most successful playback singers in the Hindi film industry. Apart from Hindi, he sang in many Indian languages including Bengali, Marathi, Assamese, Gujarati, Kannada, Bhojpuri, Malayalam and Urdu. He has also sung in private albums in several languages especially in Bengali, which are noted as all time classics. He won 8 Filmfare Awards for Best Male Playbac ...</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-xs-12 col-sm-12 col-md-9 col-lg-9 col-xl-9">
            <div class="song-details">
                <h2>${obj.artistName}</h2>
                <span>${obj.followers}M Followers</span>
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
                    <div>
                        <h3 class="headings">Albums</h3>
                    </div>
                    <div class="img-wrapper-artist">
                    </div>
                </div>
            </div>
        </div>
    </div>
        `
    );
  },
  artistTopsongsAlbumList: function (obj) {
    return buildTemplate(
      obj,
      `
            <div class="song-img-overlay-wrapper">
                <img class="song-img" src="${obj.albumImg}">
                <div class="songs-img-overlay-wrapper">
                    <a href="song-album-page.html?album-id=${obj.albumId}">
                        <div class="songs-img-overlay">
                            <div class="play-button-div">
                                <svg class="play-font">
                                    <use xlink:href="./img/icons.svg#playButton-node"></use>
                                </svg>
                            </div>
                            <div class="songs-img-overlay-endFont">
                                <div class="img-layout-font">
                                    <svg class="font">
                                <use xlink:href="./img/icons.svg#share-node"></use>
                            </svg>
                                </div>
                                <div class="img-layout-font">
                                    <svg class="font">
                                <use xlink:href="./img/icons.svg#dottedMenu-node"></use>
                            </svg>
                                </div>
                            </div>
                        </div>
                    </a>
                </div>
            </div>
            <div class="song-name-div">
                <p>${obj.albumName}</p>
            </div>
            `
    );
  },
  // audio player
  playerBar: function (obj) {
    return buildTemplate(
      obj,
      `   <div class="player-position">
                <div class="container">
                    <div class="song-player-bar">
                    <audio controls class="audio-position hide" id="audio">
                        <source src="${obj.songMP3Url}" type="audio/ogg">
                    </audio>
                        <div class="row">
                        <div class="col-xs-6 col-sm-5 col-md-4 col-xl-4">
                            <div class="player-bar-sections">
                                <div class="playButton-position">
                                    <img class="album-list-img" src="${obj.songImg}">
                                </div>
                                <div class="song-Name-artist-div">
                                    <p>${obj.songTittle}</p>
                                    <span>${obj.songArtist}</span>
                                </div>
                            </div>
                        </div>
                        <div class="col-xs-6 col-sm-4 col-md-4 col-xl-4 justify-center">
                            <div class="player-bar-sections">
                                <div class="side-font-onPlayerBar">
                                    <svg class="font" onclick="shufferBtn()">
                                        <use xlink:href="./img/icons.svg#shuffer-node"></use>
                                    </svg>
                                </div>
                                <div class="next-pervious-onPlayerBar" onclick="playerBar.PlayPrevious()">
                                    <svg class="font">
                                        <use xlink:href="./img/icons.svg#step-backward-node"></use>
                                    </svg>
                                </div>
                                <div class="play-button-onPlayerBar" onclick="playerBar.onplayEvent(this)">
                                    <svg class="play-font-onPlayerBar hide">
                                        <use xlink:href="./img/icons.svg#playButton-node"></use>
                                    </svg>
                                    <svg class="pause-font-onPlayerBar">
                                        <use xlink:href="./img/icons.svg#pause-node"></use>
                                    </svg>
                                </div>
                                <div class="next-pervious-onPlayerBar palyNxtBtn" onclick="playerBar.PlayNext()">
                                    <svg class="font">
                                        <use xlink:href="./img/icons.svg#step-forward-node"></use>
                                    </svg>
                                </div>
                                <div class="side-font-onPlayerBar" onclick="playerBar.repeatesongList(this)">
                                    <svg class="font">
                                        <use xlink:href="./img/icons.svg#repeat-node"></use>
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div class="col-xs-0 col-sm-3 col-md-4 col-xl-4 justify-end">
                            <div class="player-bar-sections">
                                <div class="live-song-duration"></div>
                                <div class="volume-controlar">
                                    <div class="volume-handler" onclick="playerBar.volumeControal(this,event)">
                                        <div class="volume-line-parent">
                                            <div class="volume-line">
                                                <div class="volume-nobe"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="volumefont-onPlayerBar" onclick="playerBar.volumeToggle(this)">
                                        <svg class="logo-font">
                                            <use xlink:href="./img/icons.svg#volume-node"></use>
                                        </svg>
                                        <svg class="logo-font hide">
                                            <use xlink:href="./img/icons.svg#volume-mute-node"></use>
                                        </svg>
                                    </div>
                                </div>
                                <div class="music-font-onPlayerbar">
                                    <svg class="font">
                                        <use xlink:href="./img/icons.svg#music-list-node"></use>
                                    </svg>
                                </div>
                            </div>
                        </div>
                 </div>
            </div>
            <div class="playerSongSlider-parent" onclick="playerBar.cliPointOnSongScroll(this,event)">
                <div class="playerSongSlider">
                    <div class="SongSlider-nobe"></div>
                </div>
            </div>
        </div>
        `
    );
  },
  // all album scrolling list body html:

  albumsBodyHtml: function (obj) {
    return buildTemplate(
      obj,
      `
            <div class="songs-tittle">
                <h3>${obj.headerName}</h3>
                <a onclick="seeAllBtn(${obj.className},this)">See All</a>
            </div>
            <div class="scrolling-btn-min-parent">
                <button class="comman-scrolling-css scroll-btn-min" onclick="AboutScrollingJs.horizontalscroll(false, ${obj.className})">
                    <svg class="font">
                        <use xlink:href="./img/icons.svg#angleLeft-node"></use>
                    </svg>
                </button>
            </div>
            <div class= ${obj.jsClass}>
            </div>
            <div class="scrolling-btn-add-parent">
                <button class="comman-scrolling-css scroll-btn-add" onclick="AboutScrollingJs.horizontalscroll(true,${obj.className})">
                    <svg class="font">
                        <use xlink:href="./img/icons.svg#angleRight-node"></use>
                    </svg>
                </button>
            </div>
        `
    );
  },
};
