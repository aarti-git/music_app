const Categoriesalbum = {
    init : function(catrgoriesId){
        var _this = this;
        // albim api
        $.ajax({
            // https://api.spotify.com/v1/browse/categories/bollywood/playlists?country=IN&limit=10
            // https://api.spotify.com/v1/browse/categories/bollywood?country=IN
            url: "https://api.spotify.com/v1/browse/categories/"+ catrgoriesId + "?country=IN",
            type: "GET",
            success: function(result){
                console.log(" categories api - success")
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
            url: "https://api.spotify.com/v1/browse/categories/"+ catrgoriesId + "/playlists?country=IN&limit=10",
            type: "GET",
            success: function(result){
                console.log("categories-album-api-success")
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
        var albumImg = data.icons;
        var categoriesName = data.name;
        // var imgSrc = this.getImg(albumImg,albumImg[1].width);
        var imgSrc = albumImg[0].url;
        var obj = {imgSrc, categoriesName}
        this.craetAlbumBody(obj);
    },
    createArtistList : function(CategoriesalbumResult){
        data = CategoriesalbumResult.playlists;
        var array = data.items;
        for(var i=0; i<array.length; i++){
            var categoriesAlbumItem = array[i];
            var albumName = categoriesAlbumItem.name;
            var albumId = categoriesAlbumItem.id;
            var albumImg = categoriesAlbumItem.images[0].url
            this.creatSongList(albumId,albumName,albumImg);
        };
    },
    craetAlbumBody : function(obj){
        this.getArtists();
        var albumSection = document.querySelector(".categories-section-wrapper");
        albumSection.innerHTML=`
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
        //  template.album(obj);
    },
    creatSongList : function(albumId,albumName,albumImg){
        var imgwrapperartist = document.querySelector(".img-wrapper-categoriesAlbum");
            var songdivWrapper = document.createElement("div");
            songdivWrapper.classList.add("watch-next-image","artist-album-img-w");
            // var songListObj = {songMP3Url,albumName,artistNames}
            songdivWrapper.innerHTML=`
                <div class="song-img-overlay-wrapper">
                    <img class="song-img" src="${albumImg}">
                    <div class="songs-img-overlay-wrapper">
                        <a href="categories-playlist.html?playlist-id=${albumId}">
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
    
}
// "https://api.spotify.com/v1/artists/"+ artistId +"/top-tracks?market=IN", top track;
// "https://api.spotify.com/v1/artists/5f4QpKfy7ptCHwTqspnSJI"+ artistId + "",
// https://api.spotify.com/v1/playlists/37i9dQZF1DX0XUfTFmNBRM/tracks?market=IN&limit=2