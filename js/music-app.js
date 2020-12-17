    // screenModes
    var screenModes = document.querySelector(".modes");
    var isnightMode = false;
    screenModes.addEventListener("click", function () {
        var morningMode = screenModes.querySelector(".morning-mode-parent");
        var nightMode = screenModes.querySelector(".night-mode-parent")
        if (!isnightMode) {
            nightMode.classList.remove("hide");
            morningMode.classList.add("hide");
            document.body.style.backgroundColor = "unset";
            document.body.style.color = "black";  
        } else if (isnightMode) {
            nightMode.classList.add("hide");
            morningMode.classList.remove("hide");
            document.body.style.backgroundColor = "";
            document.body.style.color = "";  
        }
        isnightMode = !isnightMode;
    })

// Login \sign-in 
    function loginForm(){
        popup.open(".sign-in-div");
        mobileAccountList.classList.add("hide"); 
    }

    // remove form remove button
    function removeOverlay(x){
        popup.close(x); 
    }

    // login section-mobile
    var userSvg = document.querySelector(".user-svg")
    var mobileAccountList = document.querySelector(".mobile-account-list")
    userSvg.addEventListener("click",function(){
        mobileAccountList.classList.remove("hide"); 
    })

    // menu bar mobile 
    var menuBar = document.querySelector(".menu-bar-svg");
    menuBar.addEventListener("click",function(){
        popup.open(".menu-bar-overlay");
    })
    // poster scroling 
    var interval;
    var parentElm = document.querySelector(".atomaticScroll-img-wrapper"); 
    var scrollingImg = parentElm.querySelectorAll(".atomaticScroll-next-image");
    var leftImgSect = parentElm.querySelector(".leftImgSect");
    var rightImgSect = parentElm.querySelector(".rightImgSect");

    function posterScrolling(elValue) {
      clearInterval(interval);
      var a = parentElm.dataset.slidepos;
      if (a === undefined) {
        a = 0;
      } else {
        a = Number(a);
      }
      // var x = 200;
      if (elValue) {
        a -= 100;
          if(a == -400){
            a = 100;
            leftImgSect.style.left="-100%";
            rightImgSect.style.right="200%";
          }else if(a == -300){
            leftImgSect.style.left="400%";
            rightImgSect.style.right="-300%";
          }else if(a == -200){
            leftImgSect.style.left="300%";
          }
      } else if (!elValue) {
        a += 100;
        if(a == 200){
          a = -300;
          rightImgSect.style.right="-300%";
          leftImgSect.style.left="400%";
        }else if(a == 100){
          rightImgSect.style.right="200%";
        }else if(a == 0){
          leftImgSect.style.left="-100%";
        }
      }
      parentElm.dataset.slidepos = a;
      // save the value of a
      for (var i = 0; i < scrollingImg.length; i++) {
        scrollingImg[i].style.transform = "translateX(" + a + "%)";
      }
      atomaticScroll();
    }

    // atomatic scrolling
    function atomaticScroll() {
      interval = setInterval(function () {
        var a = parentElm.dataset.slidepos;
        if (a === undefined) {
          a = 0;
        } else {
          a = Number(a);
        }
        a += 100;
        if(a == 200){
          a = -300;
          rightImgSect.style.right="-300%";
          leftImgSect.style.left="400%";
        }else if(a == 100){
          rightImgSect.style.right="200%";
        }else if(a == 0){
          leftImgSect.style.left="-100%";
        }
        parentElm.dataset.slidepos = a;
        for (var i = 0; i < scrollingImg.length; i++) {
          scrollingImg[i].style.transform = "translateX(" + a + "%)";
        }
      }, 3000);
    }


    // horizontal scrolling in js
    function horizontalscroll(elValue, parent) {
        var parentElm = document.querySelector(parent);
        var grandParent = parentElm.parentElement; 
        var scrollingImg = parentElm.querySelectorAll(".watch-next-image");
        var scrollBtnMin = grandParent.querySelector(".scroll-btn-min");
        var scrollBtnAdd = grandParent.querySelector(".scroll-btn-add");
      
        var elWidth = scrollingImg[0].offsetWidth;
        var a = parentElm.dataset.slidepos;
        var scrollBtncantroler ;
        var noOfScrollingDistance ;
        if (a === undefined) {
          a = 0;
        } else {
          a = Number(a);
        }
        if(scrollingImg.length < 16){
          scrollBtncantroler = 1;
        }else{
          scrollBtncantroler = 2;
        }
        if(elWidth < 165){
          noOfScrollingDistance = 800;
        }else{
          noOfScrollingDistance = 600;
        }
      
        var scrillingWidth = noOfScrollingDistance;
        if (elValue) {
          a -= noOfScrollingDistance;
          scrollBtnMin.style.display = "block";
          if (a == -(scrillingWidth * scrollBtncantroler)) {
            scrollBtnAdd.style.display = "none";
          }
        } else if (!elValue) {
          a += noOfScrollingDistance;
          if (a == 0) {
            scrollBtnMin.style.display = "none";
            scrollBtnAdd.style.display = "block";
          } 
        }
  
        parentElm.dataset.slidepos = a;
        // save the value of a
        for (var i = 0; i < scrollingImg.length; i++) {
          scrollingImg[i].style.transform = "translateX(" + a + "%)";
        }
      }


    // song player
    function playSong(thisElement,songMP3Url,songImg){
      appPlayerBar(thisElement,songMP3Url,songImg);
      const audioTag = document.querySelector(".audio-position");
          thisElement.lastElementChild.firstElementChild.classList.add("hide");
          thisElement.lastElementChild.lastElementChild.classList.remove("hide");
          audioTag.play();
          songInterval = setInterval(function(){
            getSongCurrentTime();
          });
        songPause(thisElement);
    }


      var songInterval;
      var isClick = false;
      function onplayEvent(ThisSvg){
        // var playBtnOnPlayer = document.querySelector(playerBarBtn);
        const audioTag = document.querySelector(".audio-position");
        if(!isClick){
          ThisSvg.firstElementChild.classList.remove("hide");
          ThisSvg.lastElementChild.classList.add("hide");
          audioTag.pause();
          isClick = true;
          songPause(isClick);
        }else{
          ThisSvg.firstElementChild.classList.add("hide");
          ThisSvg.lastElementChild.classList.remove("hide");
          audioTag.play();
          isClick = false;
          songPause(isClick);
        }
      }

      var elArray = [];
      function songPause(thisElement){
        if(thisElement == true || thisElement == false){
            if(thisElement == true){
              elArray[0].a.classList.remove("hide");
              elArray[0].b.classList.add("hide");
            }else{
              elArray[0].a.classList.add("hide");
              elArray[0].b.classList.remove("hide");
            }
        }else{
          elArray = [];
          var a = thisElement.lastElementChild.firstElementChild;
          var b = thisElement.lastElementChild.lastElementChild;
          var elObj = {};
          elObj["a"] = a;
          elObj["b"] = b;
          elArray.push(elObj);
        }
       
      }
      function getSongCurrentTime(){
        const audioTag = document.querySelector("#audio");
        const sliderNobe = document.querySelector(".SongSlider-nobe");
        var audioCurrTim = audioTag.currentTime;
        var audioDuration = audioTag.duration;
        var v = audioCurrTim/audioDuration * 100;
        if(v < 99){
          sliderNobe.style.left = v + '%';
        }else{
          sliderNobe.style.left ='calc('+ v +' % - 14px)';
        }
        sliderNobe.parentElement.style.background = "#e8121a"
        sliderNobe.parentElement.style.width =  v + '%'
      }

      function appPlayerBar(thisElement,songMP3Url,songImg){
        var songPlayerBar = document.querySelector(".player-bar-section");
        songPlayerBar.classList.remove("hide");
        var nameAbdArtistDiv = thisElement.nextElementSibling;
        var songTittle = nameAbdArtistDiv.firstElementChild.innerHTML;
        var songArtist = nameAbdArtistDiv.lastElementChild.innerHTML;
        const obj = {songMP3Url,songImg,songTittle,songArtist}
        songPlayerBar.innerHTML=template.playerBar(obj);
      }
      var isVolMute = false;
      function volumeToggle(volEl){
        const audioTag = document.querySelector("#audio");
        if(!isVolMute){
          volEl.firstElementChild.classList.add("hide");
          volEl.lastElementChild.classList.remove("hide")
          audioTag.muted = true;
        }else{
          volEl.firstElementChild.classList.remove("hide");
          volEl.lastElementChild.classList.add("hide")
          audioTag.muted = false;
        }
        isVolMute = !isVolMute;
      }

      // see all button
        var btnClick = false; 
        function seeAllBtn(parentElm,thisElm){
          var parentSongAlbum = document.querySelector(parentElm);
          if(!btnClick){
            parentSongAlbum.classList.add("listContaintCenter")
            thisElm.innerText = "see Lase"

          }else{
            parentSongAlbum.classList.remove("listContaintCenter")
            thisElm.innerHTML = "see All"
          }
          btnClick = !btnClick;
        }

      // search bar
      function searchSongs(thisEl){
        var searchInput = thisEl;
      }




    