// "https://api.spotify.com/v1/albums/2d9BCZeAAhiZWPpbX9aPCW?market=IN" 
// this id artist api bad bunny https://api.spotify.com/v1/artists/4q3ewBCX7sLwd24euuV69X
var authorizationURL = "Bearer BQBBcnutWq6MQYi-jzT5t6d1nt5v3Tsavv-yn0FRVss-smTwfC6JuAj7CFu8eTKNTgfJ-Vhk2W-2vDOMF8Mf9hLDdoTYrQB5pYsK4lT2j9A_cbnOs8qK8-_ew_C5tByeAYGlwMNvGjiJwqFgDT_zobb7NE8FQnKuoMZvC-l5k00CarazgQ";
const albumSongs = {
    init : function(){
        var _this = this;
        // albim api
        $.ajax({
            url: "https://api.spotify.com/v1/albums/2d9BCZeAAhiZWPpbX9aPCW?market=IN",
            type: "GET",
            headers : {
                authorization:authorizationURL,
            },
            success: function(result){
                console.log("success")
                console.log(result);
                _this.creatsongList(result)
            },
            error: function (error) {
                console.log(error);
            }
        })
        // artist api
        $.ajax({
            url: "https://api.spotify.com/v1/artists/4q3ewBCX7sLwd24euuV69X",
            type: "GET",
            headers : {
                authorization:authorizationURL,
            },
            success: function(result){
                console.log("artist api - success")
                var artistApiResult = result;
                console.log(artistApiResult);
                _this.artistInfo(artistApiResult);
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
        var albumArtistsName = data.artists[0].name;
        var imgSrc = this.getImg(albumImg,30);
        this.craetalbumBody(imgSrc,songName,label,albumType,albumArtistsName);
        var array = data.tracks.items;
        for(var i=0; i<array.length; i++){
            var albumItems = array[i];
            var albumArtists = albumItems.artists;
            var albumName = albumItems.name;
            var artistNames = this.artistName(albumArtists);
            var songMP3Url = albumItems.preview_url;
            this.creatHTML(imgSrc,songMP3Url,albumName,artistNames);
        };
    },
    artistInfo : function(artistApiResult){
        var artistData = artistApiResult;
        var artistImgArray = artistData.images;
        this._artistImg = artistImgArray[1].url;
    },
    craetalbumBody : function(imgSrc,songName,label,albumType,albumArtistsName){
        var albumSection = document.querySelector(".page-section-wrapper");
        var aboutsongsection = document.querySelector(".about-song-section") ;
        albumSection.innerHTML=`
        <div class="some-links">
        <ul>
            <li>home</li>
            <li>THIS IS ${albumType}</li>
            <li>${songName} SONG</li>
            <li>${songName}</li>
        </ul>
    </div>
    <div class="row">
        <div class="col-xl-3">
            <div>
                <img class="page-main-img" src="${imgSrc}">
                <div class="artist-info-section">
                    <h3 class="headings">Artist</h3>
                    <div class="Arjun-Kanungo-inf">
                        <div>
                             <img class="Arjun-Kanungo-img" src="${this._artistImg}" />
                        </div>
                        <div class="artist-name">
                            <p>${albumArtistsName}</p>
                            <span>Singer</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-xl-9">
            <div class="waada-hai-details">
                <h2 class="song-name">${songName}</h2>
                <span>${songName}</span>
                <span>4:11 • ℗ 2020 Universal Music ${label}  Pvt.</span>
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
                <div class="album-song-list">
                    <h3 class="headings">Other <a>${albumArtistsName}</a> Songs</h3>
                </div>
            </div>
        </div>
    </div>`
    // aboutsongsection inner html
    aboutsongsection.innerHTML=`
    <div class="about-song">
        <div>
            <img src="${imgSrc}">
        </div>
        <div>
            <h3 class="headings">About Song</h3>
            <p>${songName} is a song which is sung by <a herf="artist-page.html">${albumArtistsName}</a> . The duration of the song is 4 min, 11 sec. You can listen to Waada Hai song online for free, or download the mp3 from the Wynk Music mobile app. Keep
                Wynking!</p>
        </div>
    </div>`
    },
    creatHTML : function(imgSrc,songMP3Url,albumName,artistNames){
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
        if(ImgWidth !== 300){
            ImgWidth = albumImg[0].width;
        }
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