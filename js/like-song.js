const likeSongs = {
  init: function () {
    this.previousLikeBtnEl;
    this.trackIdList = [];
    var localStoragepreviousVal = localStorage.getItem("liked-songs");
    var localPreviousVal = JSON.parse(localStoragepreviousVal);
    if (localPreviousVal) {
      for (var i = 0; i < localPreviousVal.length; i++) {
        var svaedTrackId = localPreviousVal[i];
        if(svaedTrackId) this.trackIdList.push(svaedTrackId);
      }
    }
    this._playBtn = document.querySelector(".album-song-div");

    if(this.isLikePage()){
      this.songsList()
    }
  },

  likeSongToggle: function (likeFontEl) {
    var likeSongMinOarent = likeFontEl.parentElement.previousElementSibling;
    var datatrackId = likeSongMinOarent.dataset.trackId;
    const isExist = this.isExist(datatrackId);

    if (isExist) {
      var index = this.trackIdList.indexOf(datatrackId);
      this.trackIdList.splice(index, 1);
    } else {
      this.trackIdList.push(datatrackId);
    }

    var trackIdString = JSON.stringify(this.trackIdList);
    localStorage.setItem("liked-songs", trackIdString);

    // dom work
    if (isExist) {
      likeFontEl.classList.remove("likesong-color");
      if(this.isLikePage()){
        likeSongMinOarent.parentElement.remove();
        if(this.trackIdList.length == 0 ){
          this.creatSongList(false);
        }
      }
    } else {
      likeFontEl.classList.add("likesong-color");
    }
  },

  isExist: function (datatrackId) {
    return this.trackIdList.indexOf(datatrackId) !== -1;
  },
  
  isLikePage:function(){
    var locationUrl = location.pathname;
    return locationUrl.includes('All-like-songs.html')
  },
  songsList: function () {
    var _this = this;
    var tracks = this.trackIdList
    // var idItems = [];
    if (tracks.length == 0) {
      this.creatSongList(false);
    } else {
      $.ajax({
        url: "https://api.spotify.com/v1/tracks?ids=" + tracks.join(',') + "&market=IN",
        type: "GET",
        success: function (result) {
          console.log("track id result= ", result);
          _this.createBody(result);
        },
        error: function (error) {
          console.log(error);
        },
      });
    }
    // }
  },
  createBody: function (result) {
    var traksList = result.tracks;
    for (var i = 0; i < traksList.length; i++) {
      var trackIdItem = traksList[i];
      var songMP3Url = trackIdItem.preview_url;
      var id = trackIdItem.id;
      var imgSrc = trackIdItem.album.images[1].url;
      var audioEvent,
        svgId,
        outsidArrow,
        anchorTagStart,
        anchorTagEnd,
        dataAttrs = [];
      if (!songMP3Url) {
        const extarnalUrl = trackIdItem.external_urls.spotify;
        anchorTagStart = `<a href="${extarnalUrl}" target="_blank" class="flex-align">`;
        anchorTagEnd = `</a>`;
        // audioTag = "";
        audioEvent = "";
        svgId = "outside-arrow-node";
        outsidArrow = "class='outsidArrow'";
      } else {
        anchorTagStart = "";
        anchorTagEnd = "";
        svgId = "playButton-node";
        outsidArrow = "";
        audioEvent = `onclick="playerBar.playSong(this)"`;
        dataAttrs.push(
          `data-mp3-url="${songMP3Url}"`,
          `data-mp3-img="${imgSrc}"`,
          `data-Track-id = "${id}""`
        );
      }
      var songListObj = {
        dataAttrs,
        albumName: trackIdItem.name,
        artistNames: trackIdItem.artists[0].name,
        anchorTagStart,
        anchorTagEnd,
        audioEvent,
        svgId,
        outsidArrow,
      };
      this.creatSongList(songListObj);
    }
  },
  creatSongList: function (songListObj) {
    const likeSongList = document.querySelector(".like-song-list");
    var likeSongListDiv = document.createElement("div");
    if (!songListObj) {
      this._playBtn.classList.add("hide");
      likeSongListDiv.classList.add("emptyLikePage");
      likeSongListDiv.innerHTML =
        "Looks like you have not liked any songs yet!!";
    } else {
      this._playBtn.classList.remove("hide");
      likeSongListDiv.classList.add("artist-song-list");
      likeSongListDiv.innerHTML = template.songListHtml(songListObj);
      likeSongListDiv.lastElementChild.firstElementChild.classList.add(
        "likesong-color"
      );
    }
    likeSongList.append(likeSongListDiv);
  },
};