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
            var obj = {albumId,albumName,albumImg};
            this.creatSongList(obj);
        };
    },
    craetAlbumBody : function(obj){
        this.getArtists();
        var albumSection = document.querySelector(".artist-section-wrapper");
        albumSection.innerHTML=template.artistTopsongsAlbum(obj);
    
        //  template.album(obj);
    },
    creatSongList : function(obj){
        var imgwrapperartist = document.querySelector(".img-wrapper-artist");
            var songdivWrapper = document.createElement("div");
            songdivWrapper.classList.add("watch-next-image","artist-album-img-w");
            // var songListObj = {songMP3Url,albumName,artistNames}
            songdivWrapper.innerHTML=template.artistTopsongsAlbumList(obj);
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