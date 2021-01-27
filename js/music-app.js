
// Login \sign-in
function loginForm() {
  popup.open(".sign-in-div");
  mobileAccountList.classList.add("hide");
}

// remove form remove button
function removeOverlay(x) {
  popup.close(x);
}

// login section-mobile
var isDisplay = false;
var userInfo = document.querySelector(".spotify-user-inf");
var mobileAccountList = document.querySelector(".mobile-account-list");
userInfo.addEventListener("click", function () {
  if(!isDisplay){
    mobileAccountList.classList.remove("hide");
  }else{
    mobileAccountList.classList.add("hide");
  }
  isDisplay = !isDisplay
});

// menu bar mobile
var menuBar = document.querySelector(".menu-bar-svg");
menuBar.addEventListener("click", function () {
  popup.open(".menu-bar-overlay");
});

// playNow
function playNow(x) {
  if (x == undefined) {
    x = 0;
  }
  var songList = document.querySelectorAll(".artist-song-list");
  songList[x].firstElementChild.click();
}

// like song
// var likeSongListArray =[];
// var isSongLiked = false;
// var previousLikeBtnEl;
// function likeSongToggle(LikeFontEl) {
//   if (previousLikeBtnEl !== LikeFontEl) {
//     isSongLiked = false;
//   }
//   var likeFontSvg = LikeFontEl.firstElementChild;
//   if (!isSongLiked) {
//     likeFontSvg.style.color = "#e8121a";
//     var likeSongMinOarent = LikeFontEl.parentElement.parentElement;
//     likeSongListArray.push(likeSongMinOarent);
//   } else {
//     likeFontSvg.style.color = "";
//   }
//   previousLikeBtnEl = LikeFontEl;
//   isSongLiked = !isSongLiked;
// }

// function likeSongList() {
//   console.log(likeSongListArray);
// }

// see all button
var btnClick = false;
function seeAllBtn(parentElm, thisElm) {
  var parentSongAlbum = document.querySelector(parentElm);
  if (!btnClick) {
    parentSongAlbum.classList.add("listContaintCenter");
    thisElm.innerText = "see Lase";
  } else {
    parentSongAlbum.classList.remove("listContaintCenter");
    thisElm.innerHTML = "see All";
  }
  btnClick = !btnClick;
}

function userProfileDetails(el) {
  var user_dataObj = token.getUserData();
  var userloginImg = user_dataObj.spotify_userImg;
  const profile = el.querySelector('.spotify-user-img')
  if(userloginImg.length == 0){
   profile.src ="img/profile-icon.jpg";
  }else{
   profile.src = user_dataObj.spotify_userImg[0].url;
  }
   el.firstElementChild.nextElementSibling.innerHTML = user_dataObj.spotify_userName;
  var signIn = document.querySelector(".sign-in") ;
  signIn.style.dispaly="none";
}