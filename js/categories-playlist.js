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
        var imgSrc = data.images[0].url;
        var obj = {imgSrc, albumName:data.name,albumType:data.type}
        this.craetAlbumBody(obj);
        var array = data.tracks.items;
        for(var i=0; i<array.length; i++){
            var albumItem = array[i];
            var albumtrack = albumItem.track;
            // var albumName = albumtrack.name;
            var artistNames = albumtrack.artists[0].name;
           
            var songMP3Url = albumtrack.preview_url;
            var audioEvent,outsidArrow,anchorTagStart,anchorTagEnd,svgId,dataAttrs = [];
            if(songMP3Url == null){
                const extarnalUrl = albumtrack.external_urls.spotify;
                anchorTagStart= `<a href="${extarnalUrl}" target="_blank" class="flex-align">`
                anchorTagEnd =`</a>`
                // audioTag = "";
                audioEvent = '';
                svgId = "outside-arrow-node";
                outsidArrow = "class='outsidArrow'";    
            }else{
                anchorTagStart = "";
                anchorTagEnd = "";
                svgId = "playButton-node";
                outsidArrow = "";
                audioEvent = `onclick="playerBar.playSong(this)"`;
                dataAttrs.push(
                    `data-mp3-url="${songMP3Url}"`,
                    `data-mp3-img="${imgSrc}"`,
                    `data-Track-id="${i}"`
                )
            }
            var songListObj = {dataAttrs,albumName:albumtrack.name,artistNames,anchorTagStart,anchorTagEnd,audioEvent,svgId,outsidArrow}
            this.creatSongList(songListObj);
        };
    },
    craetAlbumBody : function(obj){
        // _this = this;
        var albumSection = document.querySelector(".page-section-wrapper");
        var aboutsongsection = document.querySelector(".about-song-section");
        albumSection.innerHTML= template.categoriesPlaylist(obj);
        // template.album(obj);
        
   
     // about song section inner html
     aboutsongsection.innerHTML = template.aboutpageSong(obj);
    },
    creatSongList : function(songListObj){
        var albumSongList = document.querySelector(".album-song-list");
            var songdivWrapper = document.createElement("div");
            songdivWrapper.classList.add("artist-song-list");
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
    }
}