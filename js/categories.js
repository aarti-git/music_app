const categories = {
    init: function(){
        var _this = this;
        
        $.ajax({
            url: "https://api.spotify.com/v1/browse/categories?country=IN&offset=0&limit=15",
            type: "GET",
            success: function(result){
                _this.creatsongList(result)
            },
            error: function (error) {
                console.log(error);
            }
        })

    },
    creatsongList : function(result){
        var data = result.categories;
        var array = data.items;
        for(var i=0; i<array.length; i++){
            var categorieItem = array[i];
            var albumName = categorieItem.name;
            var albumImg = categorieItem.icons;
            var albumId = categorieItem.id;
            var imgSrc = albumImg[0].url;
            this.creatHTML(imgSrc,albumName,albumId);
        };
    },
    creatHTML : function(imgSrc,albumName,albumId){
        var imgWrapper = document.querySelector(".img-wrapper2");
        var songdivWrapper = document.createElement("div");
        songdivWrapper.classList.add("watch-next-image");
        songdivWrapper.innerHTML=`
        <div class="song-img-overlay-wrapper">
            <img class="song-img" src=${imgSrc}>
            <div class="songs-img-overlay-wrapper">
                <a href="categories-album.html?album-id=${albumId}">
                    <div class="songs-img-overlay">
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
        </div>`
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


