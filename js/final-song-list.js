// "https://api.spotify.com/v1/albums/2d9BCZeAAhiZWPpbX9aPCW?market=IN" 

// this id artist api bad bunny https://api.spotify.com/v1/artists/4q3ewBCX7sLwd24euuV69X
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
        var songName = data.name;
        var label = data.label;
        var albumType = data.album_type;
        var releasedate =data.release_date;
        var albumArtistArray= data.artists;
        var albumArtistsName = data.artists[0].name;
        var albumArtistsId = data.artists[0].id;
        var imgSrc = this.getImg(albumImg,albumImg[1].width);
        var obj = {imgSrc, songName, label, albumType, albumArtistsName, albumArtistArray, releasedate,albumArtistsId}
        this.craetAlbumBody(obj);
        var array = data.tracks.items;
        var songArrayLength = array.length
        for(var i=0; i<songArrayLength; i++){
            const albumItem = array[i];
            var artistNames = this.artistName(albumItem.artists);
            var songMP3Url = albumItem.preview_url;
            
            // var audioTag;
            var audioEvent, svgId, outsidArrow, anchorTagStart, anchorTagEnd, dataAttrs = [];

            if(songMP3Url == null){
                const extarnalUrl = albumItem.external_urls.spotify;
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
            var songListObj = {dataAttrs, albumName: albumItem.name, artistNames,anchorTagStart,anchorTagEnd,audioEvent,svgId,outsidArrow}
            this.creatSongList(songListObj);
        };
    },
    createArtistList : function(artistArrayFromAlbum){
        var albumArtistId = artistArrayFromAlbum.map(function(item){return item.id}).join();
        this.getArtists(albumArtistId, function(ArtistData){
             _this.artistInfo(ArtistData);
        });
    },
    artistInfo : function(artistApiResult){
        // artistObj = {}
        var artistData = artistApiResult.artists;
        for(i=0; i<artistData.length; i++){
            var item = artistData[i];
            var artistMainImg = item.images[1].url;
            var albumArtistsName = item.name;
            var albumArtistsId = item.id;
            var artistSection = document.querySelector(".artist-infom");
            var craetArtistDiv = document.createElement("div");
            craetArtistDiv.classList.add("artist-inf");
            var artistObj = {artistMainImg,albumArtistsName,albumArtistsId};
            craetArtistDiv.innerHTML=template.aboutartists(artistObj)
        artistSection.append(craetArtistDiv);
        }
    },
    craetAlbumBody : function(obj){
        _this = this;
        var artistArrayFromAlbum = obj.albumArtistArray;
        this.createArtistList(artistArrayFromAlbum);
        var albumSection = document.querySelector(".page-section-wrapper");
        var aboutsongsection = document.querySelector(".about-song-section");
        albumSection.innerHTML= template.album(obj);
     // about song section inner html
     aboutsongsection.innerHTML = template.albumAboutSong(obj);
    //  this.craeatPlayerBar(obj)
    },
    creatSongList : function(songListObj){
        var albumSongList = document.querySelector(".album-song-list");
            var songdivWrapper = document.createElement("div");
            songdivWrapper.classList.add("artist-song-list");
            songdivWrapper.innerHTML=template.songListHtml(songListObj)
            albumSongList.append(songdivWrapper);
    },
    // craeatPlayerBar : function(obj){
        // var playerParent = document.querySelector(".song-player-bar");
        // playerParent.innerHTML= template.playerBar(obj);
    // },
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