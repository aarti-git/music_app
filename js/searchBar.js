const searchBar = {
    init:function(thisEl,event){
        var _this = this
        this._thisEl = thisEl;
        var searchInput = thisEl.value;
        if(event.keyCode === 13){
            $.ajax({
                url: "https://api.spotify.com/v1/search?q="+ searchInput +"&type=track,artist&limit=10",
                type: "GET",
                success: function(result){
                    console.log(result);
                    _this.creatSearchBody();
                    _this.SrachArtistResult(result);
                    _this.SrachTracksResult(result);
                },
                error: function (error) {
                    console.log(error);
                }
            })
        }
    },
    creatSearchBody:function(){
        const searchResult = document.querySelector(".searchResult");
        this._searchResult = searchResult;
        searchResult.classList.remove("hide");
        artistInfDiv =  document.createElement("div");
        var obj = {};
        artistInfDiv.innerHTML = template.searchResultTemp(obj)
        searchResult.append(artistInfDiv)
    },
    SrachArtistResult: function(result){
        artistArray = result.artists.items;
        if(artistArray.length == 0){
           var artistListResult = document.querySelector(".artistListResult");
           artistListResult.classList.add("hide");
        }else{
            for(var i=0; i<artistArray.length; i++){
                var albumItem = artistArray[i];
                if( albumItem.images.length == 0){
                    var imgSrc = "img/defalt-singer.jpg";
                }else{
                    var imgSrc = albumItem.images[1].url;
                }
                var artistName = albumItem.name;
                var artistId = albumItem.id;
                var obj = {imgSrc,artistName,artistId}
                this.creatSearchArtistList(obj);
            }
        }
        
       
    },
    SrachTracksResult: function(result){
        trackArray = result.tracks.items;
        for(var i=0; i<trackArray.length; i++){
            var albumItem = trackArray[i];
            var imgSrc = albumItem.album.images[1].url;
            var albumName = albumItem.album.name;
            var albumId = albumItem.album.id;
            var obj = {imgSrc,albumName,albumId}
            this.creatSearchTrackList(obj);
        }
    },
    creatSearchArtistList:function(obj){
        const artistListResult = document.querySelector(".artistListResult");
        artistInfDiv =  document.createElement("div");
        artistInfDiv.classList.add("watch-next-image-searchList")
        artistInfDiv.innerHTML = template.searchBarArtist(obj)
        artistListResult.append(artistInfDiv)
    },
    creatSearchTrackList:function(obj){
        const trackListResult = document.querySelector(".trackListResult");
        trackInfDiv =  document.createElement("div");
        trackInfDiv.classList.add("watch-next-image-searchList")
        trackInfDiv.innerHTML = template.searchBarAlbum(obj)
        trackListResult.append(trackInfDiv)
    },
    clearSearchBtn:function(){
        this._thisEl.value = '';
        this._searchResult.innerHTML = '';
        this._searchResult.classList.add("hide");
    }
}