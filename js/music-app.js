
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
      // var a = 0;
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
      function playSong(AudioPlay,songImg){
        AudioPlay.nextElementSibling.lastElementChild.firstElementChild.classList.add("hide");
        AudioPlay.nextElementSibling.lastElementChild.lastElementChild.classList.remove("hide");
        console.log(songImg);
        appPlayerBar(AudioPlay,songImg);
      }

      function pauseSong(AudioPause){
        AudioPause.nextElementSibling.lastElementChild.firstElementChild.classList.remove("hide");
        AudioPause.nextElementSibling.lastElementChild.lastElementChild.classList.add("hide")
      }

      function appPlayerBar(AudioPlay,songImg){
        var songPlayerBar = document.querySelector(".player-position");
        songPlayerBar.classList.remove("hide");
        var nameAbdArtistDiv = AudioPlay.parentElement.nextElementSibling;
        var songTittle = nameAbdArtistDiv.firstElementChild.innerHTML;
        var songArtist = nameAbdArtistDiv.lastElementChild.innerHTML;
        var playerParent = document.querySelector(".song-player-bar");
        playerParent.innerHTML= `<div class="row">
                    <div class="col-xs-8 col-sm-5 col-md-4 col-xl-4">
                        <div class="player-bar-sections">
                            <div class="playButton-position">
                                <img class="album-list-img" src=${songImg}>
                            </div>
                            <div class="song-Name-artist-div">
                                <p>${songTittle}</p>
                                <span>${songArtist}</span>
                            </div>
                        </div>
                    </div>
                    <div class="col-xs-2 col-sm-4 col-md-4 col-xl-4 justify-center">
                        <div class="player-bar-sections">
                            <div class="side-font-onPlayerBar">
                                <svg class="font">
                                    <use xlink:href="./img/icons.svg#shuffer-node"></use>
                                </svg>
                            </div>
                            <div class="next-pervious-onPlayerBar">
                                <svg class="font">
                                    <use xlink:href="./img/icons.svg#step-backward-node"></use>
                                </svg>
                            </div>
                            <div class="play-button-onPlayerBar">
                                <svg class="play-font-onPlayerBar">
                                    <use xlink:href="./img/icons.svg#playButton-node"></use>
                                </svg>
                                <svg class="pause-font-onPlayerBar hide">
                                    <use xlink:href="./img/icons.svg#pause-node"></use>
                                </svg>
                            </div>
                            <div class="next-pervious-onPlayerBar">
                                <svg class="font">
                                    <use xlink:href="./img/icons.svg#step-forward-node"></use>
                                </svg>
                            </div>
                            <div class="side-font-onPlayerBar">
                                <svg class="font">
                                    <use xlink:href="./img/icons.svg#repeat-node"></use>
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div class="col-xs-2 col-sm-3 col-md-4 col-xl-4 justify-end">
                        <div class="player-bar-sections">
                            <div class="volumefont-onPlayerBar">
                                <svg class="logo-font">
                                    <use xlink:href="./img/icons.svg#volume-node"></use>
                                </svg>
                            </div>
                            <div>
                                <svg class="font">
                                    <use xlink:href="./img/icons.svg#music-list-node"></use>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>`
        // playerBarBtnToggle();
      }

      // playerBarBtnToggle(){

      // }
        // 
        var playButtonParent = document.querySelectorAll(".audio-position");
        for (var i = 0; i < playButtonParent.length; i++) {
              var item = playButtonParent[i];
              item.addEventListener("click",function(){
                var a = item.nextElementSibling.children[0].innerText;
                var b = item.nextElementSibling.children[1].innerText;
                var playerParent = document.querySelector(".song-player-bar");
                playerParent.classList.remove("hide");
                    playerParent.innerHTML= `<div class="row">
                    <div class="col-xs-8 col-sm-5 col-md-4 col-xl-4">
                        <div class="player-bar-sections">
                            <div class="playButton-position">
                                <img class="album-list-img" src="img/song-1.webp">
                            </div>
                            <div class="song-Name-artist-div">
                                <p>${a}</p>
                                <span>${b}</span>
                            </div>
                        </div>
                    </div>
                    <div class="col-xs-2 col-sm-4 col-md-4 col-xl-4 justify-center">
                        <div class="player-bar-sections">
                            <div class="side-font-onPlayerBar">
                                <svg class="font">
                                    <use xlink:href="./img/icons.svg#shuffer-node"></use>
                                </svg>
                            </div>
                            <div class="next-pervious-onPlayerBar">
                                <svg class="font">
                                    <use xlink:href="./img/icons.svg#step-backward-node"></use>
                                </svg>
                            </div>
                            <div class="play-button-onPlayerBar">
                                <svg class="play-font-onPlayerBar">
                                    <use xlink:href="./img/icons.svg#playButton-node"></use>
                                </svg>
                                <svg class="pause-font-onPlayerBar hide">
                                    <use xlink:href="./img/icons.svg#pause-node"></use>
                                </svg>
                            </div>
                            <div class="next-pervious-onPlayerBar">
                                <svg class="font">
                                    <use xlink:href="./img/icons.svg#step-forward-node"></use>
                                </svg>
                            </div>
                            <div class="side-font-onPlayerBar">
                                <svg class="font">
                                    <use xlink:href="./img/icons.svg#repeat-node"></use>
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div class="col-xs-2 col-sm-3 col-md-4 col-xl-4 justify-end">
                        <div class="player-bar-sections">
                            <div class="volumefont-onPlayerBar">
                                <svg class="logo-font">
                                    <use xlink:href="./img/icons.svg#volume-node"></use>
                                </svg>
                            </div>
                            <div>
                                <svg class="font">
                                    <use xlink:href="./img/icons.svg#music-list-node"></use>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>`
                    // template.playerBar(obj)
              })
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




    