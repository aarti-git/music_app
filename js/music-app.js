var screenModes = document.querySelector(".modes");
var isnightMode = false;
screenModes.addEventListener("click", function () {
    var morningMode = screenModes.querySelector(".morning-mode-parent");
    var nightMode = screenModes.querySelector(".night-mode-parent")
    if (!isnightMode) {
        nightMode.classList.remove("hide");
        morningMode.classList.add("hide");
        document.body.style.backgroundColor = "unset";
    } else if (isnightMode) {
        nightMode.classList.add("hide");
        morningMode.classList.remove("hide");
        document.body.style.backgroundColor = "";
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

function posterScrolling(elValue) {
  var parentElm = document.querySelector(".atomaticScroll-img-wrapper");
  var grandParent = parentElm.parentElement; 
  var scrollingImg = parentElm.querySelectorAll(".atomaticScroll-next-image");
  var scrollBtnMin = grandParent.querySelector(".songposterscroll-btn-min");
  var scrollBtnAdd = grandParent.querySelector(".songposterscroll-btn-add");

  var a = parentElm.dataset.slidepos;
  if (a === undefined) {
    a = 0;
  } else {
    a = Number(a);
  }
  // var x = 200;
  if (elValue) {
    a -= 100;
  } else if (!elValue) {
    a += 100;
  }

  parentElm.dataset.slidepos = a;
  // save the value of a
  for (var i = 0; i < scrollingImg.length; i++) {
    scrollingImg[i].style.transform = "translateX(" + a + "%)";
  }
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

      // toggle play puse
      var isClick = false;
      function togglePlayPause(parentEl){
        // parentEl.addEventListener("click",function(){
        //  var parentEl = document.querySelector(parent);
          var playBtn =parentEl.firstElementChild;
          var pauseBtn = parentEl.lastElementChild;
          if(!isClick){
            playBtn.classList.add("hide");
            pauseBtn.classList.remove("hide");
          }else{
            playBtn.classList.remove("hide");
            pauseBtn.classList.add("hide");
          }
          isClick = !isClick;
          // })
        
      }