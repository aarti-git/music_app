const artistTopSong = {
    init : function(artistId){
        var _this = this;
        // albim api
        $.ajax({
            url: "https://api.spotify.com/v1/artists/"+ artistId + "",
            type: "GET",
            success: function(result){
                console.log(" artist api - success")
                console.log(result);
                _this.creatalbumPage(result)
                
            },
            error: function (error) {
                console.log(error);
            }
        })
    },
    getArtists: function(){
        _this = this;
        $.ajax({
            url: "https://api.spotify.com/v1/artists/"+ artistId +"/top-tracks?market=IN",
            type: "GET",
            success: function(result){
                console.log("artist-topsong-api-success")
                console.log(result);
                _this.createArtistList(result)
            },
            error: function (error) {
                console.log(error);
            }
        })
    },
    creatalbumPage : function(result){
        var data = result;
        var albumImg = data.images;
        var artistName = data.name;
        var Afollowers = data.followers.total/1000000;
        var followers = Math.round(Afollowers);
        var imgSrc = this.getImg(albumImg,albumImg[1].width);
        var obj = {imgSrc, artistName,followers}
        this.craetAlbumBody(obj);
    },
    createArtistList : function(artistTopSongResult){
        data = artistTopSongResult;
        var array = data.tracks;
        for(var i=0; i<array.length; i++){
            var albumItems = array[i];
            // var albumArtists = albumItems.artists;
            var albumName = albumItems.name;
            var albumId = albumItems.album.id;
            var albumImg = albumItems.album.images[1].url
            // var artistNames = this.artistName(albumArtists);
            // var songMP3Url = albumItems.preview_url;
            this.creatSongList(albumId,albumName,albumImg);
        };
    },
    craetAlbumBody : function(obj){
        this.getArtists();
        var albumSection = document.querySelector(".artist-section-wrapper");
        albumSection.innerHTML=`
        <div class="some-links">
        <ul>
            <li>home</li>
            <li>hindi song</li>
            <li>${obj.artistName} song</li>
            <li>${obj.artistName}</li>
        </ul>
    </div>
    <div class="row">
        <div class="col-xs-12 col-sm-12 col-md-3 col-lg-3 col-xl-3"">
            <div class="abot-artist-columan">
                <div class="page-main-img-parent">
                    <img class="page-main-img" src="${obj.imgSrc}">
                </div>
                <div class="about-artist">
                    <h3 class="headings">about ${obj.artistName}</h3>
                    <div>
                         <p>${obj.artistName} was an Indian playback singer, actor, lyricist, composer, producer, director, and screenwriter. He is considered one of the most successful playback singers in the Hindi film industry. Apart from Hindi, he sang in many Indian languages including Bengali, Marathi, Assamese, Gujarati, Kannada, Bhojpuri, Malayalam and Urdu. He has also sung in private albums in several languages especially in Bengali, which are noted as all time classics. He won 8 Filmfare Awards for Best Male Playbac ...</p>
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
        //  template.album(obj);
    },
    creatSongList : function(albumId,albumName,albumImg){
        var imgwrapperartist = document.querySelector(".img-wrapper-artist");
            var songdivWrapper = document.createElement("div");
            songdivWrapper.classList.add("watch-next-image","artist-album-img-w");
            // var songListObj = {songMP3Url,albumName,artistNames}
            songdivWrapper.innerHTML=`
                <div class="song-img-overlay-wrapper">
                    <img class="song-img" src="${albumImg}">
                    <div class="songs-img-overlay-wrapper">
                        <a href="song-album-page.html?album-id=${albumId}">
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
                    <p>${albumName}</p>
                </div>
            `
            imgwrapperartist.append(songdivWrapper);
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
// "https://api.spotify.com/v1/artists/"+ artistId +"/top-tracks?market=IN", top track;
// "https://api.spotify.com/v1/artists/5f4QpKfy7ptCHwTqspnSJI"+ artistId + "",