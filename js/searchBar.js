const searchBar = {
  init: function (el) {
    const _this = this;
    this.$el = el;
    const searchResult = document.querySelector(".searchResult");
    this._searchResult = searchResult;
    this._searchbar = document.querySelector(".search-bar");
    this._headerIconsGroup = document.querySelector(".header-group");
    this._appLogoDiv = document.querySelector(".app-logo-div");
    this._header = document.querySelector(".header")
    this._divWrapper = document.querySelector(".containt-flex-end");
    el.addEventListener("keyup", function (e) {
      _this.search(e);
    });

    this._searchFont = document.querySelector(".mobile-search-parent");
    this._searchFont.addEventListener("click", function () {
      _this.mobileSearchOpen();
    });

    this._searchRemove = document.querySelector(".search-remove");
    this._searchRemove.addEventListener("click", function () {
      _this.clearSearchBtn();
    });

    this._mobileSearchBarRemove = document.querySelector(
      ".mobile-search-removeBtn"
    );
    this._mobileSearchBarRemove.addEventListener("click", function () {
      _this.mobileSearchClose();
    });
  },
  search: function (e) {
    var searchInput = this.$el.value;
    var _this = this;
    if (searchInput == "") {
      this._searchResult.innerHTML = "";
      this._searchResult.classList.add("hide");
    } else if (e.keyCode === 13) {
      $.ajax({
        url:
          "https://api.spotify.com/v1/search?q=" +
          searchInput +
          "&type=track,artist&limit=10",
        type: "GET",
        success: function (result) {
          console.log(result);
          _this.creatSearchBody(result);
          _this.SrachArtistResult();
          _this.SrachTracksResult();
        },
        error: function (error) {
          console.log(error);
        },
      });
    }
  },

  creatSearchBody: function (result) {
    if (this._searchResult.className == "searchResult") {
        searchResult.innerHTML = '';
    }
    searchResult.classList.remove("hide");
    artistInfDiv = document.createElement("div");
    this._artistArray = result.artists.items;
    this._trackArray = result.tracks.items;
    if (this._artistArray.length == 0 && this._trackArray.length == 0) {
      artistInfDiv.innerHTML = `No Result Found !! "${this.$el.value}"`;
    } else {
      var obj = {};
      artistInfDiv.innerHTML = template.searchResultTemp(obj);
    }
    searchResult.append(artistInfDiv);
  },

  SrachArtistResult: function () {
    var artistArray = this._artistArray;
    if (artistArray.length == 0) {
      var artistListResult = document.querySelector(".artistListResult");
      if (artistListResult == null) {
        return;
      } else {
        artistListResult.classList.add("hide");
      }
    } else {
      for (var i = 0; i < artistArray.length; i++) {
        var albumItem = artistArray[i];
        if (albumItem.images.length == 0) {
          var imgSrc = "img/defalt-singer.jpg";
        } else {
          var imgSrc = albumItem.images[1].url;
        }
        var artistName = albumItem.name;
        var artistId = albumItem.id;
        var obj = { imgSrc, artistName, artistId };
        this.creatSearchArtistList(obj);
      }
    }
  },

  SrachTracksResult: function () {
    var trackArray = this._trackArray;
    for (var i = 0; i < trackArray.length; i++) {
      var albumItem = trackArray[i];
      var imgSrc = albumItem.album.images[1].url;
      var albumName = albumItem.album.name;
      var albumId = albumItem.album.id;
      var obj = { imgSrc, albumName, albumId };
      this.creatSearchTrackList(obj);
    }
  },

  creatSearchArtistList: function (obj) {
    const artistListResult = document.querySelector(".artistListResult");
    artistInfDiv = document.createElement("div");
    artistInfDiv.classList.add("watch-next-image-searchList");
    artistInfDiv.innerHTML = template.searchBarArtist(obj);
    artistListResult.append(artistInfDiv);
  },

  creatSearchTrackList: function (obj) {
    const trackListResult = document.querySelector(".trackListResult");
    trackInfDiv = document.createElement("div");
    trackInfDiv.classList.add("watch-next-image-searchList");
    trackInfDiv.innerHTML = template.searchBarAlbum(obj);
    trackListResult.append(trackInfDiv);
  },

  clearSearchBtn: function () {
    this.$el.value = "";
    this._searchResult.innerHTML = "";
    this._searchResult.classList.add("hide");
  },
  mobileSearchOpen: function () {
    this._searchFont.classList.add("hide");
    this._searchbar.style.display = "block";
    this._appLogoDiv.classList.add("hide");
    this._headerIconsGroup.classList.add("hide");
    this._mobileSearchBarRemove.classList.remove("hide");
    this._header.classList.add("onSearchActiveCss")
    this._divWrapper.classList.add("divWrapperPadding");
  },
  mobileSearchClose: function () {
    this._searchFont.classList.remove("hide");
    this._searchbar.style.display = "none";
    this._appLogoDiv.classList.remove("hide");
    this._headerIconsGroup.classList.remove("hide");
    this._header.classList.remove("onSearchActiveCss")
    this._divWrapper.classList.remove("divWrapperPadding");
    this.clearSearchBtn();
  },
};
