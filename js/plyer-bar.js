const playerBar = {
  init: function () {
    this._isVolMute = false;
    this._isClick = false;
    this._isSongRepeet = false;
    this._count = 0;
    // this._songInterval;
    this._isShuffer = false;
  },
  playSong: function ($this) {
    var _this = this;
    this.appPlayerBarActiv($this);
    this._audioTag = document.querySelector(".audio-position");
    var playPauseBtn = document.querySelector(".play-button-onPlayerBar");
    var onHoverLogo = $this.firstElementChild.lastElementChild;
    var activeMusicLogo = $this.firstElementChild.firstElementChild;
    onHoverLogo.firstElementChild.classList.add("hide");
    onHoverLogo.lastElementChild.classList.remove("hide");
    activeMusicLogo.firstElementChild.classList.add("hide");
    activeMusicLogo.lastElementChild.classList.remove("hide");
    playPauseBtn.firstElementChild.classList.add("hide");
    playPauseBtn.lastElementChild.classList.remove("hide");
    // volume
    if (
      this._volumeControler == undefined ||
      this._volumeDetailsObj == undefined
    ) {
      this._volumeControler = 0.2;
      this._audioTag.volume = this._volumeControler;
    } else {
      this._volumeControler = this._volumeDetailsObj.currentVolume;
      var volumeEl = document.querySelector(".volume-handler");
      this.volumeControal(volumeEl, this._volumeDetailsObj, true);
    }
    this._audioTag.play();
    var songInterval = setInterval(function () {
      _this.getSongCurrentTime();
    });
    this._songInterval = songInterval;

    if (this._previousplaySong == undefined) {
      this._previousplaySong = $this;
    } else if (this._previousplaySong !== $this) {
      var preonHoverLogo = this._previousplaySong.firstElementChild
        .lastElementChild;
      var preactiveMusicLogo = this._previousplaySong.firstElementChild
        .firstElementChild;
      preonHoverLogo.firstElementChild.classList.remove("hide");
      preonHoverLogo.lastElementChild.classList.add("hide");
      preactiveMusicLogo.firstElementChild.classList.remove("hide");
      preactiveMusicLogo.lastElementChild.classList.add("hide");
      // this._previousplaySong._audioTag.pause();
      // clearInterval(this._songInterval);
      this._previousplaySong = $this;
    }
    this._isClick = false;
    // onended
    this._audioTag.onended = function () {
      _this._audioTag.pause();
      clearInterval(_this._songInterval);
      _this.repeatesongListactive($this);
    };
    if (this._isShuffer) {
      this.shufferBtnOnend();
    }
  },
  appPlayerBarActiv: function ($el) {
    var songPlayerBar = document.querySelector(".player-bar-section");
    var nameAbdArtistDiv = $el.lastElementChild;
    var songTittle = nameAbdArtistDiv.firstElementChild.innerHTML;
    var songArtist = nameAbdArtistDiv.lastElementChild.innerHTML;
    const data = $el.dataset;
    const obj = {
      songMP3Url: data.mp3Url,
      songImg: data.mp3Img,
      songTittle,
      songArtist,
    };
    if (this._count == 0) {
      songPlayerBar.classList.remove("hide");
      songPlayerBar.innerHTML = template.playerBar(obj);
      this._count++;
    } else {
      const audioTag = songPlayerBar.querySelector(".audio-position");
      const albumListImg = songPlayerBar.querySelector(".album-list-img");
      const songNameArtistDiv = songPlayerBar.querySelector(
        ".song-Name-artist-div"
      );
      audioTag.src = obj.songMP3Url;
      albumListImg.src = obj.songImg;
      songNameArtistDiv.firstElementChild.innerHTML = obj.songTittle;
      songNameArtistDiv.lastElementChild.innerHTML = obj.songArtist;
    }
    this.PlayNext($el);
  },
  getSongCurrentTime: function () {
    const sliderNobe = document.querySelector(".SongSlider-nobe");
    const liveSongDuration = document.querySelector(".live-song-duration");
    var audioCurrTim = this._audioTag.currentTime;
    var audioDuration = this._audioTag.duration;
    var v = (audioCurrTim / audioDuration) * 100;
    sliderNobe.style.left = v + "%";
    sliderNobe.parentElement.style.width = v + "%";
    sliderNobe.parentElement.style.background = "#e8121a";
    liveSongDuration.innerHTML =
      "0." + Math.round(audioCurrTim) + "/" + "0." + Math.round(audioDuration);
  },
  cliPointOnSongScroll: function (thisElm, scrollEvent) {
    var bodyWidth = bodyTag.offsetWidth;
    var thisElmSideSpace = bodyWidth - thisElm.offsetWidth;
    var rightSideSpace = thisElmSideSpace / 2;
    var x = scrollEvent.clientX - rightSideSpace;
    var lineDuration = thisElm.offsetWidth;
    var clickPoint = (x / lineDuration) * 30;
    this._audioTag.currentTime = clickPoint;
    // this.getSongCurrentTime();
  },
  volumeControal: function (thisEl, e, flag) {
    var volumeLineParent = document.querySelector(".volume-line-parent");
    var volumeNobe = volumeLineParent.querySelector(".volume-nobe");
    var volumeLine = volumeLineParent.querySelector(".volume-line");
    if (flag == true) {
      var nobeHeight = e.height;
      var nobeTopPosition = e.bottom;
      this._audioTag.volume = e.currentVolume;
    } else {
      var y_axis = e.clientY;
      var thisElTopBott = thisEl.getClientRects();
      var elBottom = thisElTopBott[0].bottom;
      var elTop = thisElTopBott[0].top;
      var nobeTopPosition = elBottom - y_axis;
      var nobeHeight = y_axis - elTop;
      var audioVolume = nobeTopPosition / 100;
      this._audioTag.volume = audioVolume;
      var VolObj = {
        height: nobeHeight,
        bottom: nobeTopPosition,
        currentVolume: audioVolume,
      };
      this._volumeDetailsObj = VolObj;
    }
    volumeLine.style.height = nobeHeight + "%";
    volumeNobe.style.bottom = nobeTopPosition + "%";
  },
  volumeToggle: function (volEl) {
    var volumeLine = document.querySelector(".volume-line");
    if (!this._isVolMute) {
      volEl.firstElementChild.classList.add("hide");
      volEl.lastElementChild.classList.remove("hide");
      this._audioTag.muted = true;
      volumeLine.style.height = "100%";
      volumeLine.firstElementChild.style.bottom = "0%";
    } else {
      volEl.firstElementChild.classList.remove("hide");
      volEl.lastElementChild.classList.add("hide");
      this._audioTag.muted = false;
      volumeLine.style.height = "80%";
      volumeLine.firstElementChild.style.bottom = "20%";
    }
    this._isVolMute = !this._isVolMute;
  },
  onplayEvent: function (ThisSvg) {
    var _this = this;
    if (!this._isClick) {
      ThisSvg.firstElementChild.classList.remove("hide");
      ThisSvg.lastElementChild.classList.add("hide");
      this._audioTag.pause();
      // console.log("this is pause", this._isClick);
      clearInterval(this._songInterval);
    } else {
      ThisSvg.firstElementChild.classList.add("hide");
      ThisSvg.lastElementChild.classList.remove("hide");
      this._audioTag.play();
      // console.log("this is play", this._isClick);
      this._songInterval = setInterval(function () {
        _this.getSongCurrentTime();
      });
    }
    this._isClick = !this._isClick;
  },
  PlayNext: function (thisElement) {
    //   const songList = document.querySelectorAll(".artist-song-list");
    //   const songListLenght = songList.length - 1;
    //   this._SongtrackId = data;
    //   const data = thisElement.dataset;
    //   const SongtrackId = data.trackId;
    //   if (songListLenght == SongtrackId) {
    //     if(this._isSongRepeet){
    //       playNow();
    //     }
    // }else
  
    if (thisElement == undefined) {
      this._audioTag.pause();
      clearInterval(this._songInterval);
      var clikeElm =  this._currentSong.nextElementSibling.firstElementChild;

      if (clikeElm.firstElementChild.className == "flex-align") {
        clikeElm = clikeElm.parentElement.nextElementSibling.firstElementChild;
      }
      clikeElm.click();
      return;
    }else {
      var currentsongParent = thisElement.parentElement;
      this._currentSong = currentsongParent;
    }
  },
  PlayPrevious: function () {
    this._audioTag.pause();
    clearInterval(this._songInterval);
    var PlayElement = this._currentSong.previousElementSibling.firstElementChild;

    if (PlayElement.firstElementChild.className == "flex-align") {
      PlayElement = PlayElement.parentElement.previousElementSibling.firstElementChild;
    }
    PlayElement.click();
  },
  epeatSongSingleLoop: function (el) {
    if (!this._isSongRepeet) {
      el.style.color = "red";
      this._audioTag.loop = true;
    } else {
      el.style.color = "white";
      this._audioTag.loop = false;
    }
    this._isSongRepeet = !this._isSongRepeet;
  },
  repeatesongList: function (el) {
    if (!this._isSongRepeet) {
      el.style.color = "red";
    } else {
      el.style.color = "white";
    }
    this._isSongRepeet = !this._isSongRepeet;
  },
  repeatesongListactive: function (el) {
    const songList = document.querySelectorAll(".artist-song-list");
    const songListLenght = songList.length - 1;
    const data = el.dataset;
    const SongtrackId = data.trackId;
    if (songListLenght == SongtrackId) {
      if (this._isSongRepeet) {
        playNow();
      }
    } else {
      var clikeEl = el.parentElement.nextElementSibling.firstElementChild;
      if (clikeEl.firstElementChild.className == "flex-align") {
        clikeEl = clikeEl.parentElement.nextElementSibling.firstElementChild;
      }
      clikeEl.click();
    }
  },
  shufferBtn: function (el) {
    if (!this._isShuffer) {
      el.style.color = "red";
    } else {
      el.style.color = "white";
    }
    this._isShuffer = !this._isShuffer;
  },
  shufferBtnOnend: function () {
    var _this = this;
    const songListLen = document.querySelectorAll(".artist-song-list").length;
    var randumSongNo = Math.floor(Math.random() * songListLen);
    console.log("randumSongNo = ", randumSongNo);
    if (this._previousRandumSongNo == randumSongNo) {
      var randumSongNo = Math.floor(Math.random() * songListLen);
    }
    // this._previousRandumSongNo = randumSongNo;
    // playNow(randumSongNo);
    this._audioTag.onended = function () {
      var songList = document.querySelectorAll(".artist-song-list");
      songList[randumSongNo].firstElementChild.click();
      _this._previousRandumSongNo = randumSongNo;
      console.log("previousRandumSongNo = ", _this._previousRandumSongNos);
    };
  },
};
