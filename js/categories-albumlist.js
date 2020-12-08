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
            var Listobj= {albumId,albumName,albumImg};
            this.creatSongList(Listobj);
        };
    },
    craetAlbumBody : function(obj){
        this.getArtists();
        var albumSection = document.querySelector(".categories-section-wrapper");
        albumSection.innerHTML= template.CategoriesAlbum(obj);
        
        //  template.album(obj);
    },
    creatSongList : function(Listobj){
        var imgwrapperartist = document.querySelector(".img-wrapper-categoriesAlbum");
            var songdivWrapper = document.createElement("div");
            songdivWrapper.classList.add("watch-next-image","artist-album-img-w");
            // var songListObj = {songMP3Url,albumName,artistNames}
            songdivWrapper.innerHTML=template.categoriesAlbumList(Listobj);
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