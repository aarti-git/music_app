const playerBar = {
  init: function () {
    this._isVolMute = false;
    this._isClick = false;
    this._isSongRepeet = false;
    this._count = 0;
  },
  playSong: function ($this) {
    var _this = this;
    this.appPlayerBarActiv($this);
    const audioTag = document.querySelector(".audio-position");
    var onHoverLogo = $this.firstElementChild.lastElementChild;
    var activeMusicLogo = $this.firstElementChild.firstElementChild;
    onHoverLogo.firstElementChild.classList.add("hide");
    onHoverLogo.lastElementChild.classList.remove("hide");
    activeMusicLogo.firstElementChild.classList.add("hide");
    activeMusicLogo.lastElementChild.classList.remove("hide");
    if(this._volumeControler == undefined || this._volumeDetailsObj == undefined){
      this._volumeControler = 0.2;
      audioTag.volume = this._volumeControler;
    }else{
        this._volumeControler =this._volumeDetailsObj.currentVolume;
        var volumeEl = document.querySelector(".volume-handler");
        this.volumeControal(volumeEl,this._volumeDetailsObj,true)
      
    }
    audioTag.play();
    var songInterval = setInterval(function () {
        _this.getSongCurrentTime();
      });
    this._songInterval = songInterval;

    if (this._previousplaySong == undefined) {
      this._previousplaySong = $this;
    } else if (this._previousplaySong !== $this) {
      var preonHoverLogo = this._previousplaySong.firstElementChild.lastElementChild;
      var preactiveMusicLogo = this._previousplaySong.firstElementChild.firstElementChild;
      preonHoverLogo.firstElementChild.classList.remove("hide");
      preonHoverLogo.lastElementChild.classList.add("hide");
      preactiveMusicLogo.firstElementChild.classList.remove("hide");
      preactiveMusicLogo.lastElementChild.classList.add("hide");
      this._previousplaySong = $this;
    }

    audioTag.addEventListener("ended", function () {
      var PlayBtnDiv = document.querySelector(".play-button-onPlayerBar");
      PlayBtnDiv.firstElementChild.classList.remove("hide");
      PlayBtnDiv.lastElementChild.classList.add("hide");
      audioTag.pause();
      clearInterval(_this._songInterval);
      _this.repeatesongListactive($this);
    });
    this._isClick = false;
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
    if(this._count == 0){
      songPlayerBar.classList.remove("hide");
      songPlayerBar.innerHTML = template.playerBar(obj);
    }else{
      const audioTag = songPlayerBar.querySelector(".audio-position");
      const albumListImg = songPlayerBar.querySelector(".album-list-img")
      const songNameArtistDiv = songPlayerBar.querySelector(".song-Name-artist-div")
      audioTag.src = obj.songMP3Url;
      albumListImg.src=obj.songImg;
      songNameArtistDiv.firstElementChild.innerHTML= obj.songTittle;
      songNameArtistDiv.lastElementChild.innerHTML= obj.songArtist;
    }
    this._count ++;
    this.PlayNext($el);
  },
  getSongCurrentTime: function () {
    var audioTag = document.querySelector(".audio-position");
    const sliderNobe = document.querySelector(".SongSlider-nobe");
    const liveSongDuration = document.querySelector(".live-song-duration");
    var audioCurrTim = audioTag.currentTime;
    var audioDuration = audioTag.duration;
    var v = (audioCurrTim / audioDuration) * 100;
    sliderNobe.style.left = v + "%";
    sliderNobe.parentElement.style.width = v + "%";
    sliderNobe.parentElement.style.background = "#e8121a";
    liveSongDuration.innerHTML =
      "0." + Math.round(audioCurrTim) + "/" + "0." + Math.round(audioDuration);
  },
  cliPointOnSongScroll: function (thisElm, scrollEvent) {
    var audioTag = document.querySelector(".audio-position");
    var bodyWidth = bodyTag.offsetWidth;
    var thisElmSideSpace = bodyWidth - thisElm.offsetWidth;
    var rightSideSpace = thisElmSideSpace / 2;
    var x = scrollEvent.clientX - rightSideSpace;
    var lineDuration = thisElm.offsetWidth;
    var clickPoint = (x / lineDuration) * 30;
    audioTag.currentTime = clickPoint;
    // this.getSongCurrentTime();
  },
  volumeControal: function (thisEl,e,flag) {
    var audioTag = document.querySelector(".audio-position");
    var volumeLineParent = document.querySelector(".volume-line-parent");
    var volumeNobe = volumeLineParent.querySelector(".volume-nobe");
    var volumeLine = volumeLineParent.querySelector(".volume-line");
    if(flag == true){
     var nobeHeight =  e.height;
     var nobeTopPosition =  e.bottom;
     audioTag.volume = e.currentVolume;
    }else{
      var y_axis = e.clientY;
      var thisElTopBott = thisEl.getClientRects();
      var elBottom = thisElTopBott[0].bottom;
      var elTop = thisElTopBott[0].top;
      var nobeTopPosition = elBottom - y_axis;
      var nobeHeight = y_axis - elTop;
      var audioVolume = nobeTopPosition / 100;
      audioTag.volume = audioVolume;
      var VolObj = {height:nobeHeight,bottom:nobeTopPosition,currentVolume:audioVolume};
      this._volumeDetailsObj = VolObj;
    }
    volumeLine.style.height = nobeHeight + "%";
    volumeNobe.style.bottom = nobeTopPosition + "%";
   
  },
  volumeToggle: function (volEl) {
    var audioTag = document.querySelector(".audio-position");
    var volumeLine = document.querySelector(".volume-line");
    if (!this._isVolMute) {
      volEl.firstElementChild.classList.add("hide");
      volEl.lastElementChild.classList.remove("hide");
      audioTag.muted = true;
      volumeLine.style.height = "100%";
      volumeLine.firstElementChild.style.bottom = "0%";
    } else {
      volEl.firstElementChild.classList.remove("hide");
      volEl.lastElementChild.classList.add("hide");
      audioTag.muted = false;
      volumeLine.style.height = "80%";
      volumeLine.firstElementChild.style.bottom = "20%";
    }
    this._isVolMute = !this._isVolMute;
  },
  onplayEvent: function (ThisSvg) {
    var _this = this;
    var audioTag = document.querySelector(".audio-position");
    if (!this._isClick) {
      ThisSvg.firstElementChild.classList.remove("hide");
      ThisSvg.lastElementChild.classList.add("hide");
      audioTag.pause();
      clearInterval(this._songInterval);
    } else {
      ThisSvg.firstElementChild.classList.add("hide");
      ThisSvg.lastElementChild.classList.remove("hide");
      audioTag.play();
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
      this._currentSong.nextElementSibling.firstElementChild.click();
      return;
    } else {
      var currentsongParent = thisElement.parentElement;
      this._currentSong = currentsongParent;
    }
    
  },
  PlayPrevious: function () {
    this._currentSong.previousElementSibling.firstElementChild.click();
  },
  epeatSongSingleLoop: function (el) {
    const audioTag = document.querySelector(".audio-position");
    if (!this._isSongRepeet) {
      el.style.color = "red";
      audioTag.loop = true;
    } else {
      el.style.color = "white";
      audioTag.loop = false;
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
      el.parentElement.nextElementSibling.firstElementChild.click();
    }
  },
  shufferBtn: function () {},
};
