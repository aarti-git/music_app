const newRealeases = {
    init: function(){
        var _this = this;
        this.creatBodyHtml();
        $.ajax({
            url: "https://api.spotify.com/v1/browse/new-releases",
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
        var latestSongSection = document.querySelector(".new-release-section");
        var className = "\'.img-wrapper\'";
        var jsClass =   "\'img-wrapper\'";
        var headerName = "New Release<span>(English)</span>"
        var obj ={className,jsClass,headerName};
        latestSongSection.innerHTML=template.albumsBodyHtml(obj);
    },
    creatsongList : function(result){
        var data = result.albums;
        var array = data.items;
        for(var i=0; i<array.length; i++){
            var albumItems = array[i];
            var albumName = albumItems.name;
            var albumImg = albumItems.images;
            var albumArtists = albumItems.artists;
            var albumId = albumItems.id;
            var imgSrc = this.getImg(albumImg,300);
            var artistNames = this.artistName(albumArtists);
            var obj ={imgSrc,albumName,artistNames,albumId}
            this.creatHTML(obj);
        };
    },
    creatHTML : function(obj){
        var imgWrapper = document.querySelector(".img-wrapper");
        var songdivWrapper = document.createElement("div");
        songdivWrapper.classList.add("watch-next-image");
        songdivWrapper.innerHTML= template.newReleaseAlbum(obj);
        imgWrapper.appendChild(songdivWrapper);
        songdivWrapper.addEventListener("click",function(){
            // albumSongs.init(albumId);
        })
    },
    // creatScrollingBtn:function(){
    //     var imgWrapper = document.querySelector(".img-wrapper");
    //     var ScrollingMinBtn = imgWrapper.querySelector(".scrolling-btn-min-parent");
    //     var ScrollingAddBtn =  imgWrapper.querySelector(".scrolling-btn-add-parent");
    //     var className = "\'.img-wrapper\'";
    //     var falseCond = false;
    //     var trueCond = true;
    //     var minObj = {falseCond,className};
    //     var addObj = {trueCond,className};
    //     ScrollingMinBtn.innerHTML=template.ScrollingMinBtn(minObj);
    //     ScrollingAddBtn.innerHTML=template.ScrollingAddBtn(addObj);

    // },
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


