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
            var svgId;
            var extarnalUrl;
            // var audioTag;
            var outsidArrow;
            if(songMP3Url == null){
                extarnalUrl = albumtrack.external_urls.spotify;
                var anchorTagStart= `<a href="${extarnalUrl}" target="_blank" class="flex-align">`
                var anchorTagEnd =`</a>`
                // audioTag = "";
                audioEvent = '';
                svgId = "outside-arrow-node";
                outsidArrow = "class='outsidArrow'";    
            }else{
                anchorTagStart = "";
                anchorTagEnd = "";
                svgId = "playButton-node";
                var songMP3UrlString ="\'"+ songMP3Url + "\'";
                outsidArrow = "";
                var songImg = "\'"+imgSrc+ "\'";
                audioEvent = `onclick="playSong(this,${songMP3UrlString},${songImg})"`;
                // audioTag = `
                // <audio controls class="audio-position" onplay="playSong(this,${songImg})" onpause="pauseSong(this)">
                //     <source src="${songMP3Url}" type="audio/ogg">
                // </audio>`
            }
            var songListObj = {albumName,artistNames,anchorTagStart,anchorTagEnd,audioEvent,svgId,outsidArrow}
            // var songListObj = {songMP3Url,albumName,artistNames}
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