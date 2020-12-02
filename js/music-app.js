
// outorization tokan :
const authoTokan = "Bearer BQDeV6YB65IdXKHEsl6iXsGBaGjIIxZHZFd_y9ICslmfSdzXqWpDD5oCQFNfqXk262ltOiwZUnczNB7IexVeAX0kKVatg7xHAWV9uC8lrJt3VolLDPyiRekpSXzXmeGehiYL_CANLFenJncxVVBrI0-HM1FJ-BF2TcttLTrEqvofblNb1Q";

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

var menuBar = document.querySelector(".menu-bar-svg");
menuBar.addEventListener("click",function(){
    popup.open(".menu-bar-overlay");
})


//  // poster scrolling
//  var n = 0;
//  var p ;
//  var imgSrcArray = [
//      "img/amit-trivedi.webp",
//      "img/sad.webp",
//      "img/english-songs.webp",
//      "img/serial-songs.webp",
//      "img/workout.webp",
//  ]
//  var leftImg = document.querySelector(".img1");
//  var centerImg = document.querySelector(".img2");
//  var rightImg = document.querySelector(".img3");
//  var arryaIndexCount = imgSrcArray.length;

//  function posterScrolling(scrollingFlage) {
//   if (scrollingFlage && n <= arryaIndexCount) {
//     p = centerImg.src;
//       n++;
//       if (n === arryaIndexCount) {
//         n = 0;
//       }
//   }else if (!scrollingFlage && n > 0) {
//     n--;
//   }
  
//   centerImg.src = imgSrcArray[n];
//   leftImg.src = p;
// }

// // atomatic scrolling
//  function atomaticScroll() {
//   // interval = setInterval(function() {
//   //     if (n <= arryaIndexCount) {
//   //       centerImg.src = imgSrcArray[n];
//   //         n++;
//   //         if (n === arryaIndexCount) {
//   //             n = 0;
//   //         }
//   //     }
//   // }, 3000);
//  }
// poster scrolling
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
  
        var a = parentElm.dataset.slidepos;
        if (a === undefined) {
          a = 0;
        } else {
          a = Number(a);
        }
        var x = 800;
        if (elValue) {
          a -= 800;
          scrollBtnMin.style.display = "block";
          if (a == -(x * 2)) {
            scrollBtnAdd.style.display = "none";
          }
        } else if (!elValue) {
          a += 800;
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

      // artist horizontalscroll
      function twoTimethorizontalscroll(elValue, parent) {
        var parentElm = document.querySelector(parent);
        var grandParent = parentElm.parentElement; 
        var scrollingImg = parentElm.querySelectorAll(".watch-next-image");
        var scrollBtnMin = grandParent.querySelector(".scroll-btn-min");
        var scrollBtnAdd = grandParent.querySelector(".scroll-btn-add");
  
        var a = parentElm.dataset.slidepos;
        if (a === undefined) {
          a = 0;
        } else {
          a = Number(a);
        }
        var x = 600;
        if (elValue) {
          a -= 600;
          scrollBtnMin.style.display = "block";
          if (a == -(x * 1)) {
            scrollBtnAdd.style.display = "none";
          }
        } else if (!elValue) {
          a += 600;
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
