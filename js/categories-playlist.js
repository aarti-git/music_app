const playlistSongs = {
    init : function(playlistId){
        var _this = this;
        // albim api
        $.ajax({
            // https://api.spotify.com/v1/playlists/37i9dQZF1DX0XUfTFmNBRM/tracks?market=IN&limit=2
            url: "https://api.spotify.com/v1/playlists/" + playlistId + "?tracks?market=IN&limit=10",
            type: "GET",
            success: function(result){
                console.log("playlist-api-success")
                console.log(result);
                _this.creatalbumPage(result)
                
            },
            error: function (error) {
                console.log(error);
            }
        })
    },
    getArtists: function(albumArtistId,callback){
        $.ajax({
            url: "https://api.spotify.com/v1/artists?ids="+ albumArtistId + "",
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
    creatalbumPage : function(result){
        var data = result;
        var albumImg = data.images;
        var albumName = data.name;
        var albumType = data.type
        var imgSrc = albumImg[0].url;
        var obj = {imgSrc, albumName,albumType}
        this.craetAlbumBody(obj);
        var array = data.tracks.items;
        for(var i=0; i<array.length; i++){
            var albumItems = array[i];
            var albumtrack = albumItems.track;
            var albumName = albumtrack.name;
            var artistNames = albumtrack.artists[0].name;
            // var artistNames = this.artistName(albumArtists);
            var songMP3Url = albumtrack.preview_url;
            this.creatSongList(songMP3Url,albumName,artistNames);
        };
    },
    craetAlbumBody : function(obj){
        // _this = this;
        var albumSection = document.querySelector(".page-section-wrapper");
        var aboutsongsection = document.querySelector(".about-song-section");
        albumSection.innerHTML= template.categoriesPlaylist(obj);
        // template.album(obj);
        
    //      `
    //     <div class="some-links">
    //         <ul>
    //             <li>home</li>
    //             <li>Playlist</li>
    //             <li>${obj.albumName} SONG</li>
    //             <li>${obj.albumName}</li>
    //         </ul>
    //     </div>
    //     <div class="row">
    //         <div class="col-xl-3">
    //             <div>
    //                 <img class="page-main-img" src="${obj.imgSrc}">
    //             </div>
    //         </div>
    //         <div class="col-xl-9">
    //             <div class="waada-hai-details">
    //                 <h2 class="song-name">${obj.albumName}</h2>
    //                 <span>${obj.albumName}</span>
    //                 <div class="album-song-div">
    //                     <div class="button-div">
    //                         <button class="btn">Play Now</button>
    //                         <button class="btn btn-2">download</button>
    //                         <button class="btn btn-2">set free hellotune</button>
    //                         <div class="font-wrapper">
    //                             <svg class="font">
    //                                 <use xlink:href="./img/icons.svg#heart-node"></use>
    //                             </svg>
    //                         </div>
    //                     </div>
    //                     <div class="button-div">
    //                         <div class="font-wrapper">
    //                             <svg class="font">
    //                                 <use xlink:href="./img/icons.svg#share-node"></use>
    //                             </svg>
    //                         </div>
    //                         <div class="font-wrapper">
    //                             <svg class="font">
    //                                 <use xlink:href="./img/icons.svg#dottedMenu-node"></use>
    //                             </svg>
    //                         </div>
    //                     </div>
    //                 </div>
    //                 <div class="album-song-list">
    //                     <h3 class="headings">Other <a>${obj.albumType}</a> Songs</h3>
    //                 </div>
    //             </div>
    //         </div>
    //     </div>
    // `

     // about song section inner html
     aboutsongsection.innerHTML = template.aboutpageSong(obj);
//      `<div class="about-song">
//      <div>
//          <img src="${obj.imgSrc}">
//      </div>
//      <div>
//          <h3 class="headings">About Song</h3>
//          <p>${obj.albumName} is a song which is sung by <a herf="artist-page.html">${obj.albumType}</a>. 
//          The duration of the song is 4 min, 11 sec. You can listen to Waada Hai song online for free, 
//          or download the mp3 from the Wynk Music mobile app. Keep Wynking!</p>
//      </div>
//  </div>`;
    },
    creatSongList : function(songMP3Url,albumName,artistNames){
        var albumSongList = document.querySelector(".album-song-list");
            var songdivWrapper = document.createElement("div");
            songdivWrapper.classList.add("artist-song-list");
            var songListObj = {songMP3Url,albumName,artistNames}
            songdivWrapper.innerHTML=template.songListHtml(songListObj)
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