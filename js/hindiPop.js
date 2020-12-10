const hindiPop = {
    init: function(){
        var _this = this;
        this.creatBodyHtml();
        $.ajax({
            // https://api.spotify.com/v1/playlists/6FgTsjPJOoJ1lUwKlkBgaB?market=IN
            url: "https://api.spotify.com/v1/playlists/6FgTsjPJOoJ1lUwKlkBgaB?market=IN",
            type: "GET",
            success: function(result){
                _this.creatsongList(result)
            },
            error: function (error) {
                console.log(error);
            }
        })
    },
    creatBodyHtml:function(){
        var latestSongSection = document.querySelector(".hindiPop-section");
        var className = "\'.img-wrapper3\'";
        var jsClass =   "\'img-wrapper3\'";
        var headerName = "hindiPop"
        var obj ={className,jsClass,headerName};
        latestSongSection.innerHTML=template.albumsBodyHtml(obj);
    },
    creatsongList : function(result){
        var data = result.tracks;
        var array = data.items;
        for(var i=0; i<array.length; i++){
            var albumItems = array[i];
            var albumTrack = albumItems.track;
            var albumName = albumTrack.album.name;
            var albumImg = albumTrack.album.images;
            var albumArtists = albumTrack.album.artists;
            var albumId = albumTrack.album.id;
            var imgSrc = this.getImg(albumImg,300);
            var artistNames = this.artistName(albumArtists);
            var obj={imgSrc,albumName,artistNames,albumId}
            this.creatHTML(obj);
        };
    },
    creatHTML : function(obj){
        var imgWrapper = document.querySelector(".img-wrapper3");
        var songdivWrapper = document.createElement("div");
        songdivWrapper.classList.add("watch-next-image");
        songdivWrapper.innerHTML=template.newReleaseAlbum(obj)
        imgWrapper.appendChild(songdivWrapper);
        songdivWrapper.addEventListener("click",function(){
            // albumSongs.init(albumId);
        })
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
    }
}


