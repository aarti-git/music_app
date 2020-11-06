document.addEventListener("DOMContentLoaded", function () {
   popup.init();
  });

// mornig and night modes
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

// var LogIn = document.querySelectorAll(".Login");
// var signINParent = document.querySelector(".sign-in-div");
// LogIn.addEventListener("click", function () {
    // popup.open(".sign-in-div");
    // mobileAccountList.classList.add("hide"); 
// });
function loginForm(){
    popup.open(".sign-in-div");
    mobileAccountList.classList.add("hide"); 
}

// remove form remove button

// var removeBtn = document.querySelector(".remove-form");
// removeBtn.addEventListener("click",function(){
//     popup.close(".sign-in-div");
// })
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

var menuBar = document.querySelector(".align-self-div");
menuBar.addEventListener("click",function(){
    popup.open(".menu-bar-overlay");
})

// horizontal scrolling in js
    // var a = 0;
    function horizontalscroll(elValue, parent) {
        var parentElm = document.querySelector(parent);
        var scrollingImg = parentElm.querySelectorAll(".watch-next-image");
        var scrollBtnMin = parentElm.querySelector(".scroll-btn-min");
        var scrollBtnAdd = parentElm.querySelector(".scroll-btn-add");
  
        var a = parentElm.dataset.slidepos;
        if (a === undefined) {
          a = 0;
        } else {
          a = Number(a);
        }
        var x = 700;
        if (elValue) {
          a -= 700;
          scrollBtnMin.style.display = "block";
          if (a == -(x * 1)) {
            scrollBtnAdd.style.display = "none";
          }
        } else if (!elValue) {
          a += 700;
          if (a == 0) {
            scrollBtnMin.style.display = "none";
            scrollBtnAdd.style.display = "block";
          } 
          // else if (a < -(x * 1)) {
          //   scrollBtnAdd.style.display = "block";
          // }
        }
  
        parentElm.dataset.slidepos = a;
        // save the value of a
  
        for (var i = 0; i < scrollingImg.length; i++) {
          scrollingImg[i].style.transform = "translateX(" + a + "%)";
        }
      }