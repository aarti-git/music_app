const playerBar = {
    init:function(){
        // this._audioTag = document.querySelector(".audio-position");
        this._previousplaySong;
        this._isVolMute = false;
        this._songInterval;
        this._isClick = false;
        this._currentSong ;
    },
    playSong: function($this){
        var _this = this;
        this.appPlayerBarActiv($this);
          var audioTag = document.querySelector(".audio-position");
          var onHoverLogo = $this.firstElementChild.lastElementChild;
          var activeMusicLogo= $this.firstElementChild.firstElementChild;
          onHoverLogo.firstElementChild.classList.add("hide");
          onHoverLogo.lastElementChild.classList.remove("hide");
          activeMusicLogo.firstElementChild.classList.add("hide");
          activeMusicLogo.lastElementChild.classList.remove("hide");
          audioTag.play();
          this._songInterval = setInterval(function(){
            _this.getSongCurrentTime(); 
          });
          if(this._previousplaySong == undefined){
            this._previousplaySong = $this;
            return;
          }else if(this._previousplaySong !== $this){
            var preonHoverLogo= this._previousplaySong.firstElementChild.lastElementChild;
            var preactiveMusicLogo= this._previousplaySong.firstElementChild.firstElementChild;
            preonHoverLogo.firstElementChild.classList.remove("hide");
            preonHoverLogo.lastElementChild.classList.add("hide");
            preactiveMusicLogo.firstElementChild.classList.remove("hide");
            preactiveMusicLogo.lastElementChild.classList.add("hide");
            this._previousplaySong = $this;
          }
          repeatSongList($this);
          // playNow($this)
          this._isClick = false;
    },
    appPlayerBarActiv: function($el){
        var songPlayerBar = document.querySelector(".player-bar-section");
        songPlayerBar.classList.remove("hide");
        var nameAbdArtistDiv = $el.lastElementChild;
        var songTittle = nameAbdArtistDiv.firstElementChild.innerHTML;
        var songArtist = nameAbdArtistDiv.lastElementChild.innerHTML;
        const data = $el.dataset
        const obj = {
          songMP3Url: data.mp3Url,
          songImg: data.mp3Img,
          songTittle,
          songArtist
        }
        songPlayerBar.innerHTML=template.playerBar(obj);
        this.PlayNext($el);
      },
      getSongCurrentTime: function(){
        var audioTag = document.querySelector(".audio-position");
        const sliderNobe = document.querySelector(".SongSlider-nobe");
        const liveSongDuration = document.querySelector(".live-song-duration")
        var audioCurrTim = audioTag.currentTime;
        var audioDuration = audioTag.duration;
        var v = audioCurrTim/audioDuration * 100;
        sliderNobe.style.left = v + '%';
        sliderNobe.parentElement.style.width =  v + '%';
        sliderNobe.parentElement.style.background = "#e8121a";
        liveSongDuration.innerHTML = "0." +Math.round(audioCurrTim) + "/" + "0." +Math.round(audioDuration);
      },
      cliPointOnSongScroll:function(thisElm,scrollEvent){
        var audioTag = document.querySelector(".audio-position");
        var bodyWidth = bodyTag.offsetWidth ;
        var thisElmSideSpace = bodyWidth - thisElm.offsetWidth;
        var rightSideSpace= thisElmSideSpace/2;
        var x = scrollEvent.clientX - rightSideSpace;
        var lineDuration = thisElm.offsetWidth;
        var clickPoint = x/lineDuration * 30;
          console.log(x);
          console.log("clickPoint =" + clickPoint);
          audioTag.currentTime = clickPoint;
          this.getSongCurrentTime();
      },
      volumeControal:function(e){
        var y = e.clientY;
        var audioTag = document.querySelector(".audio-position");
        var volumeLineParent = document.querySelector(".volume-line-parent");
        var volumeNobe = volumeLineParent.querySelector(".volume-nobe");
        var volumeLine = volumeLineParent.querySelector(".volume-line");
        var nobeTopPosition = 340 - y;
        var nobeHeight = y - 250 ;
        var audioVolume = nobeTopPosition/100;
        volumeLine.style.height = nobeHeight + '%' ;
        volumeNobe.style.bottom = nobeTopPosition + '%'; 
        audioTag.volume = audioVolume;
      },
      volumeToggle:function(volEl){
        var audioTag = document.querySelector(".audio-position");
        var volumeLine = document.querySelector(".volume-line");
        if(!this._isVolMute){
          volEl.firstElementChild.classList.add("hide");
          volEl.lastElementChild.classList.remove("hide")
          audioTag.muted = true;
          volumeLine.style.height = "100%";
          volumeLine.firstElementChild.style.bottom="0%"
        }else{
          volEl.firstElementChild.classList.remove("hide");
          volEl.lastElementChild.classList.add("hide")
          audioTag.muted = false;
          volumeLine.style.height = "50%";
          volumeLine.firstElementChild.style.bottom="50%"
        }
        this._isVolMute = !this._isVolMute;
      },
      onplayEvent:function(ThisSvg){
        var _this = this;
        var audioTag = document.querySelector(".audio-position");
        if(!this._isClick){
          ThisSvg.firstElementChild.classList.remove("hide");
          ThisSvg.lastElementChild.classList.add("hide");
          audioTag.pause();
          clearInterval(this._songInterval);
          
        }else{
          ThisSvg.firstElementChild.classList.add("hide");
          ThisSvg.lastElementChild.classList.remove("hide");
          audioTag.play();
          this._songInterval = setInterval(function(){
            _this.getSongCurrentTime(); 
          });
        }
        this._isClick = !this._isClick
      },
      PlayNext:function(thisElement){
        if(thisElement == undefined){
            this._currentSong.nextElementSibling.firstElementChild.click();
            return;
          }else{
            var currentsongParent = thisElement.parentElement;
            this._currentSong = currentsongParent;
          }
      },
      PlayPrevious:function(){
        this._currentSong.previousElementSibling.firstElementChild.click();
      },
      repeatSongList:function($el){
        const data = $el.dataset
        const SongtrackId = data.trackId;
        // var songIndexNo = SongtrackId+1;
        // var songList = document.querySelectorAll(".artist-song-list");
        // var songListLenght = songList.length;
        // if(!repeatIsclick){
        //   if(songIndexNo == songListLenght){
        //     songIndexNo = 0;

        //   }
        //   // for(i=songIndexNo;i<listSongLength;i++){
        //   //     if(i == listSongLength){
        //   //       i = 0;
        //   //     }
        //   // }
        // }
      }

}