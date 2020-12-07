//arigit sing top songs: https://api.spotify.com/v1/artists/4YRxDV8wJFPHPTeXepOstw/top-tracks?market=IN 

// var authoTokan = "Bearer BQDWc1zNy4gYXk3-rGZfNoI6TcLbkmKp514uxJLa9QlLQN3oBM8TlRganQjdByRwE3nJZ9iqVCunarGFChRGDm1RzEBm_n4iji1hRvB3dPqYc3K_ZDofPL29M7EyihqVSrsoJv_XJvlbCybwsxof6usvGuX1wCKGbaTAEuZwZc_PsRtyDw";
const artistList = {
    init: function(){
        var _this = this;
        $.ajax({
            url: "https://api.spotify.com/v1/artists?ids=5f4QpKfy7ptCHwTqspnSJI%2C4YRxDV8wJFPHPTeXepOstw%2C0oOet2f43PA68X5RxKobEy%2C5rQoBDKFnd1n6BkdbgVaRL%2C7o7doCwqft91WC690aglWC%2C0GF4shudTAFv8ak9eWdd4Y%2C61JrslREXq98hurYL2hYoc%2C5fvTHKKzW44A9867nPDocM%2C70B80Lwx2sxti0M1Ng9e8K%2C3gBKY0y3dFFVRqicLnVZYz%2C4K6blSRoklNdpw4mzLxwfn",
            type: "GET",
            headers : {
                authorization: `Bearer ${token.getAccessToken()}`,
            },
            success: function(result){
                _this.creatsongList(result)
            },
            error: function (error) {
                console.log('error', error);
            }
        })

    },
    creatsongList : function(result){
        var array = result.artists;
        // var array = data.artists;
        for(var i=0; i<array.length; i++){
            var artistItems = array[i];
            var artistName = artistItems.name;
            var artistImg = artistItems.images;
            var artistId = artistItems.id;
            // var imgSrc = artistImg[1].url;
            // var w = artistImg[1].width;
            var imgSrc = this.getImg(artistImg);
            var obj={imgSrc,artistName,artistId};
            this.creatHTML(obj);
        };
    },
    creatHTML : function(obj){
        var imgWrapper = document.querySelector(".img-wrapper4");
        var songdivWrapper = document.createElement("div");
        songdivWrapper.classList.add("watch-next-image","artist-section-width");
        songdivWrapper.innerHTML= template.artistalbumList(obj)
        imgWrapper.appendChild(songdivWrapper);
        songdivWrapper.addEventListener("click",function(){
            // albumSongs.init(artistId);
        })
    },
    getImg : function(artistImg){
        // if(ImgWidth !== 300){
        //     ImgWidth = artistImg[1].width;
        // }
        for(var i=0;i<artistImg.length;i++){
            var imgItems = artistImg[i];
            if(imgItems.width <= 350){
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


