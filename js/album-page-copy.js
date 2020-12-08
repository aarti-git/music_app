// "https://api.spotify.com/v1/albums/2d9BCZeAAhiZWPpbX9aPCW?market=IN" 
// this id artist api bad bunny https://api.spotify.com/v1/artists/4q3ewBCX7sLwd24euuV69X
var authToken = "Bearer BQDWc1zNy4gYXk3-rGZfNoI6TcLbkmKp514uxJLa9QlLQN3oBM8TlRganQjdByRwE3nJZ9iqVCunarGFChRGDm1RzEBm_n4iji1hRvB3dPqYc3K_ZDofPL29M7EyihqVSrsoJv_XJvlbCybwsxof6usvGuX1wCKGbaTAEuZwZc_PsRtyDw";
const albumSongs = {
    init : function(albumId){
        var _this = this;
        // albim api
        $.ajax({
            url: "https://api.spotify.com/v1/albums/" + albumId + "?market=IN",
            type: "GET",
            success: function(result){
                console.log("album api-success")
                console.log(result);
                _this.creatsongList(result)
                // this._albumArtistId =result.artists[0].id;
                // console.log(this._albumArtistId)
            },
            error: function (error) {
                console.log(error);
            }
        })
    },
    getArtists: function(artists = [],callback){
        artists.
        $.ajax({
            url: "https://api.spotify.com/v1/artists/?ids="+ albumArtistId + "",
            type: "GET",
            success: function(result){
                console.log("artist api - success")
                console.log(result);
                callback(result);
            },
            error: function (error) {
                console.log(error);
            }
        })
    },
    creatsongList : function(result){
        var data = result;
        var albumImg = data.images;
        var songName = data.name;
        var label = data.label;
        var albumType = data.type;
        var albumArtistId = data.artists[0].id;
        var albumArtistsName = data.artists[0].name;
        var imgSrc = this.getImg(albumImg,albumImg[1].width);
        this.craetalbumBody({imgSrc, songName, label, albumType, albumArtistsName, albumArtistId});

        var array = data.tracks.items;
        for(var i=0; i<array.length; i++){
            var albumItems = array[i];
            var albumArtists = albumItems.artists;
            var albumName = albumItems.name;
            var artistNames = this.artistName(albumArtists);
            var songMP3Url = albumItems.preview_url;
            this.creatHTML(songMP3Url,albumName,artistNames);
        };
    },
    artistInfo : function(artistApiResult){
        var artistData = artistApiResult;
        var artistImgArray = artistData.images;
        // var _artistImg = "img/defalt-singer.jpg";
        // _artistImg = artistImgArray[1].url;
        // if(artistImgArray[1].url){
        var _artistImg = artistImgArray[1].url
        // }
        return _artistImg ;
    },
    craetalbumBody : function(obj){
        _this = this;
        this.getArtist(albumArtistId, function(ArtistData){
            var x = _this.artistInfo(ArtistData);
            return x;
        });

        var albumSection = document.querySelector(".page-section-wrapper");
        var aboutsongsection = document.querySelector(".about-song-section");
        albumSection.innerHTML= template.album(obj);

        // about song section inner html
        aboutsongsection.innerHTML= template.albumAboutSong({})
    },
    creatHTML : function(songMP3Url, albumName, artistNames){
        var albumSongList = document.querySelector(".album-song-list");
            var songdivWrapper = document.createElement("div");
            songdivWrapper.classList.add("artist-song-list");
            songdivWrapper.innerHTML=`
            <div class="button-div">
                <audio controls class="audio-position">
                    <source src="${songMP3Url}" type="audio/ogg">
                </audio>
                <div class="playButton-position">
                    <svg class="font font-opacity">
                        <use xlink:href="./img/icons.svg#music-list-node"></use>
                    </svg>
                    <div>
                        <svg class="playButton-on-image">
                            <use xlink:href="./img/icons.svg#playButton-node"></use>
                            <use style="display:none" xlink:href="./img/icons.svg#night-node"></use>
                        </svg>
                    </div>
                </div>
                <div class="align-self">
                    <p>${albumName}</p>
                    <span>${artistNames}</span>
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
            albumSongList.append(songdivWrapper);
    },
    getImg : function(albumImg,ImgWidth){
        // if(ImgWidth !== 300){
        //     ImgWidth = albumImg[0].width;
        // }
        for(var i=0;i<albumImg.length;i++){
            var imgItems = albumImg[i];
            if(imgItems.width == ImgWidth){
                var imgUrl = imgItems.url;   
                return imgUrl;
            }     
        }
    },
    artistName : function(albumArtists){
        var saveSingerN = "";
        var x = albumArtists.slice(0, 2);
        for(var i=0; i<x.length;i++){
            var artistItems = albumArtists[i];
            var singerName = artistItems.name;
            if(i==0){
                saveSingerN += singerName;
            }else{
                saveSingerN += " , " + singerName 
            }  
        }
        return saveSingerN;
    },
}


const template = {
    newReleaseAlbum: function(obj){
        return buildTemplate(obj, 
            `
        <div class="song-img-overlay-wrapper">
            <img class="song-img" src=${obj.imgSrc}>
            <div class="songs-img-overlay-wrapper">
                <a href="song-album-page.html?album-id=${obj.albumId}">
                    <div class="songs-img-overlay">
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
            )
    },
    artistalbumList: function(obj){
        return buildTemplate(obj, 
            `
            <div class="artist-img-div">
                <div class="artist-img-wrapper">
                    <img class="artist-img" src="${obj.imgSrc}">
                </div>
                <div class="songs-img-overlay-wrapper">
                    <a href="artists-topsong-albumpage.html?artis-id=${obj.artistId}">
                        <div class="artist-img-overlay"></div>
                    </a>
                </div>
            </div>
            <div class="artist-name-div">${obj.artistName}</div>
            `
            )
    },
    categoriesAlbum: function(obj){
        return buildTemplate(obj, `
            <div class="song-img-overlay-wrapper">
                <img class="song-img" src=${obj.imgSrc}>
                <div class="songs-img-overlay-wrapper">
                    <a href="categories-album.html?album-id=${obj.albumId}">
                        <div class="songs-img-overlay">
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
            )
    },  
    // categories.template 
    CategoriesAlbum: function(obj){
        return buildTemplate(obj,
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
        <div class="col-xl-3">
            <div>
                <img class="page-main-img" src="${obj.imgSrc}">
            </div>
        </div>
        <div class="col-xl-9">
            <div class="waada-hai-details">
                <h2>${obj.categoriesName}</h2>
                <div class="album-song-div">
                    <div class="button-div">
                        <button class="btn">Play Now</button>
                        <button class="btn btn-2">download</button>
                        <button class="btn btn-2">set free hellotune</button>
                        <div class="font-wrapper">
                            <svg class="font">
                                <use xlink:href="./img/icons.svg#heart-node"></use>
                            </svg>
                        </div>
                    </div>
                    <div class="button-div">
                        <div class="font-wrapper">
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
            
        )
    },
    categoriesAlbumList:function(Listobj){
        return buildTemplate(Listobj,`
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
            
        )
    }
}
// html
const HTML = `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>music app</title>
    <link rel="stylesheet" href="css/index.css" />
    <script src="js/app-modul.js"></script>
    <script defer src="./js/music-app.js"></script>
    <script src="js/new-releases.js"></script>
    <script src="js/artist.js"></script>
    <script src="js/jquery.min.js"></script>
    <script src="popup.js"></script>
</head>

<body>
    <section class="header">
        <div class="container">
            <div class="row">
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 content-space">
                    <div class="div-wrapper">
                        <div class="app-logo-name">
                            <div class="menu-bar-svg">
                                <svg class="logo-font">
                                    <use xlink:href="./img/icons.svg#menuBar-node"></use>
                                </svg>
                                <div class="menu-bar-overlay hide">
                                    <div class="remove-form" onclick="removeOverlay('.menu-bar-overlay')">
                                        <button class="remove-form-btn">
                                            <svg class="cross-font">
                                                <use xlink:href="./img/icons.svg#cross-node"></use>
                                            </svg>
                                        </button>
                                    </div>
                                    <div class="menu-bar-list">
                                        <ul>
                                            <li>home</li>
                                            <li>my music</li>
                                            <li>dounlode app</li>
                                            <li>sign in</li>
                                        </ul>
                                    </div>
                                    <div class="fSocial-media-font">
                                        <div class="font-wrapper">
                                            <svg class="font">
                                                <use xlink:href="./img/icons.svg#facebook-node"></use>
                                            </svg>
                                        </div>
                                        <div class="font-wrapper">
                                            <svg class="font">
                                                <use xlink:href="./img/icons.svg#twitter-node"></use>
                                            </svg>
                                        </div>
                                        <div class="font-wrapper">
                                            <svg class="font">
                                                <use xlink:href="./img/icons.svg#instagram-node"></use>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="app-logo">
                                <!-- <div>
                                    <svg class="logo-font">
                                        <use xlink:href="./img/icons.svg#music-node"></use>
                                    </svg>
                                </div> -->
                                <h3><span>Music</span>App</h3>
                            </div>
                        </div>
                        <div class="list-wrapper">
                            <ul class="header-list">
                                <li><a href="">HOME</a></li>
                                <li><a href="">my music</a>
                                    <div class="myMusic-hover-list">
                                        <ul>
                                            <li>my plylist</li>
                                            <li>like songs</li>
                                            <li>recently plyed songs</li>
                                            <li>downloaded songs</li>
                                            <li>Music Language</li>
                                            <li>Sound Quality</li>
                                        </ul>
                                    </div>
                                </li>
                                <li><a href="">download app</a>
                                    <div class="download-hover-list">
                                        <ul>
                                            <li>for android</li>
                                            <li>for los</li>
                                        </ul>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="div-wrapper">
                        <div class="search-bar">
                            <div>
                                <svg class="search-font">
                                    <use xlink:href="./img/icons.svg#search-node"></use>
                                </svg>
                            </div>
                            <input type="text" name="song" placeholder="Search for music you love!" />
                        </div>
                        <div class="header-group">
                            <div class="modes">
                                <div class="morning-mode-parent">
                                    <svg class="morning-mode-font">
                                        <use xlink:href="./img/icons.svg#sun-node"></use>
                                    </svg>
                                </div>
                                <div class="night-mode-parent hide">
                                    <svg class="night-mode-font">
                                        <use xlink:href="./img/icons.svg#night-node"></use>
                                    </svg>
                                </div>
                            </div>
                            <div class="modes veiw-in-dekstop">
                                <img class="language-img" src="img/language-white.svg">
                            </div>
                            <div>
                                <span class="veiw-in-dekstop" onclick="loginForm()">SIGN IN</span>
                                <div>
                                    <svg class="font user-svg modes">
                                        <use xlink:href="./img/icons.svg#user-node"></use>
                                    </svg>
                                    <div class="mobile-account-list hide">
                                        <ul>
                                            <li onclick="loginForm()">Login</li>
                                            <li class="space-top">Music Language</li>
                                            <li class="space-top">Sound Quality</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <!-- sign in popup -->
                            <div class="sign-in-div hide">
                                <div class="login-containt">
                                    <div>
                                        <img class="login-img" src="img/login.png">
                                    </div>
                                    <div class="form-design">
                                        <div class="remove-form" onclick="removeOverlay('.sign-in-div')">
                                            <button class="remove-form-btn">
                                                <svg class="font">
                                                    <use xlink:href="./img/icons.svg#cross-node"></use>
                                                </svg>
                                            </button>
                                        </div>
                                        <div class="form-text">
                                            <h3>Login/Sign Up</h3>
                                            <span>Get a personalised experience, and access all your music</span>
                                            <div class="login-input">
                                                <input type="tel" name="Number" placeholder=" +91 " class="contry-code">
                                                <input type="number" name="Number" placeholder="ENTER MOBILE NUMBER" class="mobile-no">
                                            </div>
                                            <button class="btn">send OTP</button>
                                        </div>
                                        <div class="form-end-div">
                                            <span>To create your account, install Wynk app</span>
                                            <img class="footer-icon-svg-app" src="img/footer-v2-but-play.png">
                                            <img class="footer-icon-svg-app" src="img/dt-app-store.svg">
                                        </div>
                                    </div>
                                </div>
                                <!-- sign in popup end-->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!-- header section end -->
    <!-- atomatic scrollig -->
    <section class="atomaticScrolling">
        <div>
            <button class="comman-scrolling-css songposterscroll-btn-min" onclick="posterScrolling(false)">
                <svg class="font">
                    <use xlink:href="./img/icons.svg#angleLeft-node"></use>
                </svg>
            </button>
        </div>
        <div class="atomaticScroll-img-wrapper">
            <div class="poster-parent">
                <div class="atomaticScroll-next-image leftImgSect">
                    <a><img class="poster-img img1" src="img/workout.webp"></a>
                </div>
                <div class="atomaticScroll-next-image">
                    <a><img class="poster-img img2" src="img/amit-trivedi.webp"></a>
                </div>
                <div class="atomaticScroll-next-image rightImgSect">
                    <a><img class="poster-img img3" src="img/sad.webp"></a>
                </div>
                <div class="atomaticScroll-next-image">
                    <a><img class="poster-img" src="img/english-songs.webp"></a>
                </div>
                <div class="atomaticScroll-next-image">
                    <a><img class="poster-img" src="img/serial-songs.webp"></a>
                </div>
            </div>
        </diV>
        <div>
            <button class="comman-scrolling-css songposterscroll-btn-add" onclick="posterScrolling(true)">
                <svg class="font">
                    <use xlink:href="./img/icons.svg#angleRight-node"></use>
                </svg>
            </button>
        </div>
    </section>
    <!-- song plyer bar in fix bottom -->
    <section class="player-position">
        <div class="container">
            <div class="song-player-bar">
                <div class="row">
                    <div class="col-xl-4">
                        <div class="player-bar-sections">
                            <div class="playButton-position">
                                <img class="album-list-img" src="img/song-1.webp">
                            </div>
                            <div class="song-Name-artist-div">
                                <p>wadda hai</p>
                                <span>Arjun Kanungo- artist</span>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-4 justify-center">
                        <div class="player-bar-sections">
                            <div class="side-font-onPlayerBar">
                                <svg class="font">
                                    <use xlink:href="./img/icons.svg#shuffer-node"></use>
                                </svg>
                            </div>
                            <div class="next-pervious-onPlayerBar">
                                <svg class="font">
                                    <use xlink:href="./img/icons.svg#step-backward-node"></use>
                                </svg>
                            </div>
                            <div class="play-button-onPlayerBar">
                                <svg class="play-font-onPlayerBar">
                                    <use xlink:href="./img/icons.svg#playButton-node"></use>
                                </svg>
                            </div>
                            <div class="next-pervious-onPlayerBar">
                                <svg class="font">
                                    <use xlink:href="./img/icons.svg#step-forward-node"></use>
                                </svg>
                            </div>
                            <div class="side-font-onPlayerBar">
                                <svg class="font">
                                    <use xlink:href="./img/icons.svg#repeat-node"></use>
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-4 justify-end">
                        <div class="player-bar-sections">
                            <div>
                                <svg class="logo-font">
                                    <use xlink:href="./img/icons.svg#volume-node"></use>
                                </svg>
                            </div>
                            <div>
                                <svg class="font">
                                    <use xlink:href="./img/icons.svg#music-list-node"></use>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!-- body part -->
    <section class="container">
        <div class="div-parent">
            <!-- LATEST SONGS -->
            <section class="latest-song-section sections-space">
                <div class="songs-tittle">
                    <h3>New Release</h3>
                    <a>See All</a>
                </div>
                <div>
                    <button class="comman-scrolling-css scroll-btn-min" onclick="horizontalscroll(false, '.img-wrapper')">
                        <svg class="font">
                            <use xlink:href="./img/icons.svg#angleLeft-node"></use>
                        </svg>
                    </button>
                </div>
                <div class="img-wrapper">

                </div>
                <div>
                    <button class="comman-scrolling-css scroll-btn-add" onclick="horizontalscroll(true,'.img-wrapper')">
                        <svg class="font">
                            <use xlink:href="./img/icons.svg#angleRight-node"></use>
                        </svg>
                    </button>
                </div>
            </section>

            <!-- bollywood On Loop -->
            <section class="bollywoodsong-section sections-space">
                <div class="songs-tittle">
                    <h3>Bollywood On Loop</h3>
                    <a>See All</a>
                </div>
                <div>
                    <button class="comman-scrolling-css scroll-btn-min" onclick="horizontalscroll(false, '.img-wrapper2')">
                        <svg class="font">
                            <use xlink:href="./img/icons.svg#angleLeft-node"></use>
                        </svg>
                    </button>
                </div>
                <div class="img-wrapper2">
                    <div class="watch-next-image">
                        <div class="song-img-overlay-wrapper">
                            <img class="song-img" src="img/song-12.webp">
                            <div class="songs-img-overlay-wrapper">
                                <a href="song-album-page.html">
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
                            <p>waada-hai</p>
                            <span>arjin kan</span>
                        </div>
                    </div>
                    <div class="watch-next-image">
                        <div class="song-img-overlay-wrapper">
                            <img class="song-img" src="img/song-11.webp">
                            <div class="songs-img-overlay-wrapper">
                                <a href="song-album-page.html">
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
                            <p>waada-hai</p>
                            <span>arjin kan</span>
                        </div>
                    </div>
                    <div class="watch-next-image">
                        <div class="song-img-overlay-wrapper">
                            <img class="song-img" src="img/song-10.webp">
                            <div class="songs-img-overlay-wrapper">
                                <a href="song-album-page.html">
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
                            <p>waada-hai</p>
                            <span>arjin kan</span>
                        </div>
                    </div>
                    <div class="watch-next-image">
                        <div class="song-img-overlay-wrapper">
                            <img class="song-img" src="img/song-9.webp">
                            <div class="songs-img-overlay-wrapper">
                                <a href="song-album-page.html">
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
                            <p>waada-hai</p>
                            <span>arjin kan</span>
                        </div>
                    </div>
                    <div class="watch-next-image">
                        <div class="song-img-overlay-wrapper">
                            <img class="song-img" src="img/song-8.webp">
                            <div class="songs-img-overlay-wrapper">
                                <a href="song-album-page.html">
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
                            <p>waada-hai</p>
                            <span>arjin kan</span>
                        </div>
                    </div>
                    <div class="watch-next-image">
                        <div class="song-img-overlay-wrapper">
                            <img class="song-img" src="img/song-7.webp">
                            <div class="songs-img-overlay-wrapper">
                                <a href="song-album-page.html">
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
                            <p>waada-hai</p>
                            <span>arjin kan</span>
                        </div>
                    </div>
                    <div class="watch-next-image">
                        <div class="song-img-overlay-wrapper">
                            <img class="song-img" src="img/song-6.webp">
                            <div class="songs-img-overlay-wrapper">
                                <a href="song-album-page.html">
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
                            <p>waada-hai</p>
                            <span>arjin kan</span>
                        </div>
                    </div>
                    <div class="watch-next-image">
                        <div class="song-img-overlay-wrapper">
                            <img class="song-img" src="img/song-5.webp">
                            <div class="songs-img-overlay-wrapper">
                                <a href="song-album-page.html">
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
                            <p>waada-hai</p>
                            <span>arjin kan</span>
                        </div>
                    </div>
                    <div class="watch-next-image">
                        <div class="song-img-overlay-wrapper">
                            <img class="song-img" src="img/song-4.webp">
                            <div class="songs-img-overlay-wrapper">
                                <a href="song-album-page.html">
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
                            <p>waada-hai</p>
                            <span>arjin kan</span>
                        </div>
                    </div>
                    <div class="watch-next-image">
                        <div class="song-img-overlay-wrapper">
                            <img class="song-img" src="img/song-3.webp">
                            <div class="songs-img-overlay-wrapper">
                                <a href="song-album-page.html">
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
                            <p>waada-hai</p>
                            <span>arjin kan</span>
                        </div>
                    </div>
                    <div class="watch-next-image">
                        <div class="song-img-overlay-wrapper">
                            <img class="song-img" src="img/song-2.webp">
                            <div class="songs-img-overlay-wrapper">
                                <a href="song-album-page.html">
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
                            <p>waada-hai</p>
                            <span>arjin kan</span>
                        </div>
                    </div>
                    <div class="watch-next-image">
                        <div class="song-img-overlay-wrapper">
                            <img class="song-img" src="img/song-1.webp">
                            <div class="songs-img-overlay-wrapper">
                                <a href="song-album-page.html">
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
                            <p>waada-hai</p>
                            <span>arjin kan</span>
                        </div>
                    </div>
                </div>
                <div>
                    <button class="comman-scrolling-css scroll-btn-add" onclick="horizontalscroll(true,'.img-wrapper2')">
                        <svg class="font">
                            <use xlink:href="./img/icons.svg#angleRight-node"></use>
                        </svg>
                    </button>
                </div>
            </section>

            <!-- old songs -->
            <section class="old-song-section sections-space">
                <div class="songs-tittle">
                    <h3>OLD SONGS</h3>
                    <a>See All</a>
                </div>
                <div>
                    <button class="comman-scrolling-css scroll-btn-min" onclick="horizontalscroll(false, '.img-wrapper3')">
                        <svg class="font">
                            <use xlink:href="./img/icons.svg#angleLeft-node"></use>
                        </svg>
                    </button>
                </div>
                <div class="img-wrapper3">
                    <div class="watch-next-image">
                        <div class="song-img-overlay-wrapper">
                            <img class="song-img" src="img/kishor-song-3.webp">
                            <div class="songs-img-overlay-wrapper">
                                <a href="song-album-page.html">
                                    <div class="songs-img-overlay">
                                        <div class="play-button-div">
                                            <!-- <audio controls>
                                                <source src="https://p.scdn.co/mp3-preview/56de6f8b348530f54dbfb855247c5e51b844ee03?cid=60097a884dd54b7ebc0ef5880805585f" type="audio/ogg">
                                            </audio> -->
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
                            <p>waada-hai</p>
                            <span>arjin kan</span>
                        </div>
                    </div>
                    <div class="watch-next-image">
                        <div class="song-img-overlay-wrapper">
                            <img class="song-img" src="img/kishor-song-1.webp">
                            <div class="songs-img-overlay-wrapper">
                                <a href="song-album-page.html">
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
                            <p>waada-hai</p>
                            <span>arjin kan</span>
                        </div>
                    </div>
                    <div class="watch-next-image">
                        <div class="song-img-overlay-wrapper">
                            <img class="song-img" src="img/kishor-song-2.webp">
                            <div class="songs-img-overlay-wrapper">
                                <a href="song-album-page.html">
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
                            <p>waada-hai</p>
                            <span>arjin kan</span>
                        </div>
                    </div>
                    <div class="watch-next-image">
                        <div class="song-img-overlay-wrapper">
                            <img class="song-img" src="img/kishor-song-3.webp">
                            <div class="songs-img-overlay-wrapper">
                                <a href="song-album-page.html">
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
                            <p>waada-hai</p>
                            <span>arjin kan</span>
                        </div>
                    </div>
                    <div class="watch-next-image">
                        <div class="song-img-overlay-wrapper">
                            <img class="song-img" src="img/kishor-song-4.webp">
                            <div class="songs-img-overlay-wrapper">
                                <a href="song-album-page.html">
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
                            <p>waada-hai</p>
                            <span>arjin kan</span>
                        </div>
                    </div>
                    <div class="watch-next-image">
                        <div class="song-img-overlay-wrapper">
                            <img class="song-img" src="img/kishor-song-5.webp">
                            <div class="songs-img-overlay-wrapper">
                                <a href="song-album-page.html">
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
                            <p>waada-hai</p>
                            <span>arjin kan</span>
                        </div>
                    </div>
                    <div class="watch-next-image">
                        <div class="song-img-overlay-wrapper">
                            <img class="song-img" src="img/kishor-song-5.webp">
                            <div class="songs-img-overlay-wrapper">
                                <a href="song-album-page.html">
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
                            <p>waada-hai</p>
                            <span>arjin kan</span>
                        </div>
                    </div>
                    <div class="watch-next-image">
                        <div class="song-img-overlay-wrapper">
                            <img class="song-img" src="img/kishor-song-2.webp">
                            <div class="songs-img-overlay-wrapper">
                                <a href="song-album-page.html">
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
                            <p>waada-hai</p>
                            <span>arjin kan</span>
                        </div>
                    </div>
                    <div class="watch-next-image">
                        <div class="song-img-overlay-wrapper">
                            <img class="song-img" src="img/kishor-song-1.webp">
                            <div class="songs-img-overlay-wrapper">
                                <a href="song-album-page.html">
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
                            <p>waada-hai</p>
                            <span>arjin kan</span>
                        </div>
                    </div>
                    <div class="watch-next-image">
                        <div class="song-img-overlay-wrapper">
                            <img class="song-img" src="img/kishor-song-2.webp">
                            <div class="songs-img-overlay-wrapper">
                                <a href="song-album-page.html">
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
                            <p>waada-hai</p>
                            <span>arjin kan</span>
                        </div>
                    </div>
                    <div class="watch-next-image">
                        <div class="song-img-overlay-wrapper">
                            <img class="song-img" src="img/kishor-song-3.webp">
                            <div class="songs-img-overlay-wrapper">
                                <a href="song-album-page.html">
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
                            <p>waada-hai</p>
                            <span>arjin kan</span>
                        </div>
                    </div>
                    <div class="watch-next-image">
                        <div class="song-img-overlay-wrapper">
                            <img class="song-img" src="img/kishor-song-4.webp">
                            <div class="songs-img-overlay-wrapper">
                                <a href="song-album-page.html">
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
                            <p>waada-hai</p>
                            <span>arjin kan</span>
                        </div>
                    </div>
                </div>
                <div>
                    <button class="comman-scrolling-css scroll-btn-add" onclick="horizontalscroll(true,'.img-wrapper3')">
                        <svg class="font">
                            <use xlink:href="./img/icons.svg#angleRight-node"></use>
                        </svg>
                    </button>
                </div>
            </section>


            <!-- artist list -->
            <section class="popularArtist-section sections-space">
                <div class="songs-tittle">
                    <h3>popular artist</h3>
                    <a>See All</a>
                </div>
                <div>
                    <button class="comman-scrolling-css scroll-btn-min" onclick="horizontalscroll(false, '.img-wrapper4')">
                        <svg class="font">
                            <use xlink:href="./img/icons.svg#angleLeft-node"></use>
                        </svg>
                    </button>
                </div>
                <div class="img-wrapper4">
                    <!-- <div class="watch-next-image artist-section-width">
                        <div class="artist-img-div">
                            <img class="artist-img" src="img/Gulzar-1.webp">
                            <div class="songs-img-overlay-wrapper">
                                <a href="artist-kishor-kumar.html">
                                    <div class="artist-img-overlay"></div>
                                </a>
                            </div>
                        </div>
                        <div class="artist-name-div">Gulzar</div>
                    </div>
                    <div class="watch-next-image artist-section-width">
                        <div class="artist-img-div">
                            <img class="artist-img" src="img/Kishore.webp">
                            <div class="songs-img-overlay-wrapper">
                                <a href="artist-kishor-kumar.html">
                                    <div class="artist-img-overlay">
                                    </div>
                                </a>
                            </div>
                        </div>
                        <div class="artist-name-div">Kishore kumar</div>
                    </div>
                    <div class="watch-next-image artist-section-width">
                        <div class="artist-img-div">
                            <img class="artist-img" src="img/md-rafi.webp">
                            <div class="songs-img-overlay-wrapper">
                                <a href="">
                                    <div class="artist-img-overlay">
                                    </div>
                                </a>
                            </div>
                        </div>
                        <div class="artist-name-div">md-rafi</div>
                    </div>
                    <div class="watch-next-image artist-section-width">
                        <div class="artist-img-div">
                            <img class="artist-img" src="img/ashaji.webp">
                            <div class="songs-img-overlay-wrapper">
                                <a href="">
                                    <div class="artist-img-overlay">
                                    </div>
                                </a>
                            </div>
                        </div>
                        <div class="artist-name-div">asha bhosle</div>
                    </div>
                    <div class="watch-next-image artist-section-width">
                        <div class="artist-img-div">
                            <img class="artist-img" src="img/sanam.webp">
                            <div class="songs-img-overlay-wrapper">
                                <a href="">
                                    <div class="artist-img-overlay">
                                    </div>
                                </a>
                            </div>
                        </div>
                        <div class="artist-name-div">sanamr</div>
                    </div>
                    <div class="watch-next-image artist-section-width">
                        <div class="artist-img-div">
                            <img class="artist-img" src="img/neha.webp">
                            <div class="songs-img-overlay-wrapper">
                                <a href="">
                                    <div class="artist-img-overlay">
                                    </div>
                                </a>
                            </div>
                        </div>
                        <div class="artist-name-div">neha kakkar</div>
                    </div>
                    <div class="watch-next-image artist-section-width">
                        <div class="artist-img-div">
                            <img class="artist-img" src="img/RD-Burman.webp">
                            <div class="songs-img-overlay-wrapper">
                                <a href="">
                                    <div class="artist-img-overlay">
                                    </div>
                                </a>
                            </div>
                        </div>
                        <div class="artist-name-div">RD Burman</div>
                    </div>
                    <div class="watch-next-image artist-section-width">
                        <div class="artist-img-div">
                            <img class="artist-img" src="img/ajayatul-marathi.webp">
                            <div class="songs-img-overlay-wrapper">
                                <a href="">
                                    <div class="artist-img-overlay">
                                    </div>
                                </a>
                            </div>
                        </div>
                        <div class="artist-name-div">ajay atul</div>
                    </div>
                    <div class="watch-next-image artist-section-width">
                        <div class="artist-img-div">
                            <img class="artist-img" src="img/Gulzar-1.webp">
                            <div class="songs-img-overlay-wrapper">
                                <a href="">
                                    <div class="artist-img-overlay">
                                    </div>
                                </a>
                            </div>
                        </div>
                        <div class="artist-name-div">Gulzar</div>
                    </div>
                    <div class="watch-next-image artist-section-width">
                        <div class="artist-img-div">
                            <img class="artist-img" src="img/sanam.webp">
                            <div class="songs-img-overlay-wrapper">
                                <a href="">
                                    <div class="artist-img-overlay">
                                    </div>
                                </a>
                            </div>
                        </div>
                        <div class="artist-name-div">sanam</div>
                    </div> -->
                </div>
                <div>
                    <button class="comman-scrolling-css scroll-btn-add" onclick="horizontalscroll(true,'.img-wrapper4')">
                        <svg class="font">
                            <use xlink:href="./img/icons.svg#angleRight-node"></use>
                        </svg>
                    </button>
                </div>
            </section>
        </div>
    </section>

    <!-- footer section -->
    <section class="container">
        <div class="footer-head-wrapper">
            <div class="row">
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 content-space">
                    <div class="footer-head">
                        <div>
                            <img class="footer-icon-svg" src="img/footerIcon.svg">
                        </div>
                        <div class="footer-head-containt">
                            <h3>Best way to Listen to Music!</h3>
                            <span>Don’t forget to install Wynk Music on your mobile phones</span>
                        </div>
                        <div>
                            <button class="btn getApp-btn">Get App</button>
                        </div>
                    </div>
                    <div class="app-images">
                        <img class="footer-icon-svg-app" src="img/footer-v2-but-play.png">
                        <img class="footer-icon-svg-app" src="img/dt-app-store.svg">
                    </div>
                </div>
            </div>
        </div>

        <div class="footer-menu">
            <div class="row">
                <div class="col-xs-12 col-sm-6 col-md-3 col-lg-3 col-xl-3">
                    <div class="footer-columne-wrapper">
                        <div class="fHeading">LATEST ALBUMS</div>
                        <div>
                            <span>THE ALBUM | </span>
                            <span>Songs of Trance | </span>
                            <span> Love Marriage | </span>
                            <span>Love Action Drama | </span>
                            <span> Kgf Chapter 1 (Kannada) | </span>
                            <span>Viswasam | </span>
                            <span>Triple Seat | </span>
                            <span> Killol | </span>
                            <span>Champion | </span>
                            <span>Smile |</span>
                            <span>Love Action Drama | </span>
                            <span> G.O.A.T.</span>
                        </div>
                    </div>
                </div>
                <div class="col-xs-12 col-sm-6 col-md-3 col-lg-3 col-xl-3 ">
                    <div class="footer-columne-wrapper">
                        <div class="fHeading">GENRES</div>
                        <div>
                            <span>THE ALBUM | </span>
                            <span>Songs of Trance | </span>
                            <span> Love Marriage | </span>
                            <span>Love Action Drama | </span>
                            <span> Kgf Chapter 1 (Kannada) | </span>
                            <span>Viswasam | </span>
                            <span>Triple Seat | </span>
                            <span> Killol | </span>
                            <span>Champion | </span>
                            <span>Smile |</span>
                            <span>Love Action Drama | </span>
                            <span> G.O.A.T.</span>
                        </div>
                    </div>
                </div>
                <div class="col-xs-12 col-sm-6 col-md-3 col-lg-3 col-xl-3">
                    <div class="footer-columne-wrapper">
                        <div class="fHeading">OLD SONGS</div>
                        <div>
                            <span>THE ALBUM | </span>
                            <span>Songs of Trance | </span>
                            <span> Love Marriage | </span>
                            <span>Love Action Drama | </span>
                            <span> Kgf Chapter 1 (Kannada) | </span>
                            <span>Viswasam | </span>
                            <span>Triple Seat | </span>
                            <span> Killol | </span>
                            <span>Champion | </span>
                            <span>Smile |</span>
                            <span>Love Action Drama | </span>
                            <span> G.O.A.T.</span>
                        </div>
                    </div>
                </div>
                <div class="col-xs-12 col-sm-6 col-md-3 col-lg-3 col-xl-3">
                    <div class="footer-columne-wrapper">
                        <div class="fHeading">OLD SONGS</div>
                        <div>
                            <span>THE ALBUM | </span>
                            <span>Songs of Trance | </span>
                            <span> Love Marriage | </span>
                            <span>Love Action Drama | </span>
                            <span> Kgf Chapter 1 (Kannada) | </span>
                            <span>Viswasam | </span>
                            <span>Triple Seat | </span>
                            <span> Killol | </span>
                            <span>Champion | </span>
                            <span>Smile |</span>
                            <span>Love Action Drama | </span>
                            <span> G.O.A.T.</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="footer-menu">
            <div class="row">
                <div class="col-xs-12 col-sm-6 col-md-3 col-lg-3 col-xl-3">
                    <div class="footer-columne-wrapper">
                        <div class="fHeading">LANGUAGES</div>
                        <div>
                            <span>THE ALBUM | </span>
                            <span>Songs of Trance | </span>
                            <span> Love Marriage | </span>
                            <span>Love Action Drama | </span>
                            <span> Kgf Chapter 1 (Kannada) | </span>
                            <span>Viswasam | </span>
                            <span>Triple Seat | </span>
                            <span> Killol | </span>
                            <span>Champion | </span>
                            <span>Smile |</span>
                            <span>Love Action Drama | </span>
                            <span> G.O.A.T.</span>
                        </div>
                    </div>
                </div>
                <div class="col-xs-12 col-sm-6 col-md-3 col-lg-3 col-xl-3">
                    <div class="footer-columne-wrapper">
                        <div class="fHeading">LANGUAGES</div>
                        <div>
                            <span>THE ALBUM | </span>
                            <span>Songs of Trance | </span>
                            <span> Love Marriage | </span>
                            <span>Love Action Drama | </span>
                            <span> Kgf Chapter 1 (Kannada) | </span>
                            <span>Viswasam | </span>
                            <span>Triple Seat | </span>
                            <span> Killol | </span>
                            <span>Champion | </span>
                            <span>Smile |</span>
                            <span>Love Action Drama | </span>
                            <span> G.O.A.T.</span>
                        </div>
                    </div>
                </div>
                <div class="col-xs-12 col-sm-6 col-md-3 col-lg-3 col-xl-3">
                    <div class="footer-columne-wrapper">
                        <div class="fHeading">TOP SONGS</div>
                        <div>
                            <span>THE ALBUM | </span>
                            <span>Songs of Trance | </span>
                            <span> Love Marriage | </span>
                            <span>Love Action Drama | </span>
                            <span> Kgf Chapter 1 (Kannada) | </span>
                            <span>Viswasam | </span>
                            <span>Triple Seat | </span>
                            <span> Killol | </span>
                            <span>Champion | </span>
                            <span>Smile |</span>
                            <span>Love Action Drama | </span>
                            <span> G.O.A.T.</span>
                        </div>
                    </div>
                </div>
                <div class="col-xs-12 col-sm-6 col-md-3 col-lg-3 col-xl-3">
                    <div class="footer-columne-wrapper">
                        <div class="fHeading">TOP SEARCHED LYRICS</div>
                        <div>
                            <span>THE ALBUM | </span>
                            <span>Songs of Trance | </span>
                            <span> Love Marriage | </span>
                            <span>Love Action Drama | </span>
                            <span> Kgf Chapter 1 (Kannada) | </span>
                            <span>Viswasam | </span>
                            <span>Triple Seat | </span>
                            <span> Killol | </span>
                            <span>Champion | </span>
                            <span>Smile |</span>
                            <span>Love Action Drama | </span>
                            <span> G.O.A.T.</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- secont row end
      footer social media contact details started  -->
        <div class="fSocial-media">
            <div class="row">
                <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                    <div class="fSocial-media-list">
                        <a>About Us<span> | </span></a>
                        <a>Advertise with Us<span> | </span></a>
                        <a>Privacy Policy<span> | </span></a>
                        <a>Work with us<span> | </span></a>
                        <a>Contact Us<span> | </span></a>
                        <a>Feedback<span> | </span></a>
                        <a>Hellotunes</a>
                    </div>
                </div>
                <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 containt">
                    <div class="fSocial-media-font">
                        <div class="font-wrapper">
                            <svg class="font">
                                <use xlink:href="./img/icons.svg#facebook-node"></use>
                            </svg>
                        </div>
                        <div class="font-wrapper">
                            <svg class="font">
                                <use xlink:href="./img/icons.svg#twitter-node"></use>
                            </svg>
                        </div>
                        <div class="font-wrapper">
                            <svg class="font">
                                <use xlink:href="./img/icons.svg#instagram-node"></use>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="footerLastSec">
            <div class="row">
                <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 ">
                    Wynk Music is the one-stop music app for the latest to the greatest songs that you love. Play your favourite music online for free or download mp3. Enjoy from over 60 Lakh Hindi, English, Bollywood, Regional, Latest, Old songs and more.
                </div>
                <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 containt">
                    2020 © All rights reserved | Airtel Digital Limited
                </div>
            </div>
        </div>
        </div>
    </section>
</body>
<!-- content-space -->

</html>
<!-- git push https://aarti-git:iamaarti001@github.com/aarti-git/music_app.git master --></div>`;
