
// $.get("https://api.spotify.com/v1/search?q=kishorkumar&type=track",function(responce){
//     var result = responce.results;
//     console.log(result);
// });

const scrollList = {
    init: function(){
        // $.get("https://api.spotify.com/v1/browse/new-releases?country=IN",function(responce){
        //     var result = responce.results;
        //     console.log(result);
        // });

        $.ajax({
            url: "https://api.spotify.com/v1/browse/new-releases",
            type: "GET",
            headers : {
                authorization:"Bearer BQD4xik0HRDq7PSrE7Xt1PW0oV9uHBpBIiD5EHzJEhkK8i7yG3LUsHpkOYw7LpsRCae2q0bW88PE0Zyu4KYnwIUtuSeLiTeIHdjklV7tOuy1n_kdqapCQwoPKdYdZ0qCpiPrWUC8Mb6gZsO-Lw9M_VruKpEkMZOVR-14Z1O57UYeTQxBLw"
            },
            success: function(result){
                console.log("success")
                console.log(result);
                var data = result.albums;
                var array = data.items;
                var imgWrapper = document.querySelector(".img-wrapper");
                for(var i=0; i<array.length; i++){
                    var albumItems = array[i];
                    var albumName = albumItems.name;
                    var albumImg = albumItems.images;
                    var imgSrc = scrollList.getImg(albumImg,300)
                    var albumArtists = albumItems.artists;
                    var artistNames = scrollList.artistName(albumArtists)
                    // var firstArtist = albumArtists[0].name;
                    var songdivWrapper = document.createElement("div");
                    songdivWrapper.classList.add("watch-next-image");
                    songdivWrapper.innerHTML=`
                    <div class="song-img-overlay-wrapper">
                        <img class="song-img" src=${imgSrc}>
                        <div class="songs-img-overlay-wrapper">
                            <a href="">
                                <div class="songs-img-overlay">
                                    <div class="play-button-div">
                                        <svg class="play-font">
                                    <use xlink:href="./img/icons.svg#playButton-node"></use>
                                </svg>
                                    </div>
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
                        <span>${artistNames}</span>
                    </div>`
                imgWrapper.append(songdivWrapper);
            };
            },
            error: function (error) {
                console.log(error);
            }
        })

    },
    getImg : function(albumImg,ImgWidth){
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
        for(var i=0;i<albumArtists.length;i++){
            var artistItems = albumArtists[i];
            var singerName = artistItems.name;
            saveSingerN += singerName + " </br>";
        }
        return saveSingerN;
    }
}