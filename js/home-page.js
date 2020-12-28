const AboutScrollingJs = {
  init: function () {
    this._interval;
    this._parentElm = document.querySelector(".atomaticScroll-img-wrapper");
    this._scrollingImg = this._parentElm.querySelectorAll(
      ".atomaticScroll-next-image"
    );
    this._leftImgSect = this._parentElm.querySelector(".leftImgSect");
    this._rightImgSect = this._parentElm.querySelector(".rightImgSect");
    this.atomaticScroll();
  },
  posterScrolling: function (elValue) {
    clearInterval(this._interval);
    var a = this._parentElm.dataset.slidepos;
    if (a === undefined) {
      a = 0;
    } else {
      a = Number(a);
    }
    // var x = 200;
    if (elValue) {
      a -= 100;
      if (a == -400) {
        a = 100;
        this._leftImgSect.style.left = "-100%";
        this._rightImgSect.style.right = "200%";
      } else if (a == -300) {
        this._leftImgSect.style.left = "400%";
        this._rightImgSect.style.right = "-300%";
      } else if (a == -200) {
        this._leftImgSect.style.left = "300%";
      }
    } else if (!elValue) {
      a += 100;
      if (a == 200) {
        a = -300;
        this._rightImgSect.style.right = "-300%";
        this._leftImgSect.style.left = "400%";
      } else if (a == 100) {
        this._rightImgSect.style.right = "200%";
      } else if (a == 0) {
        this._leftImgSect.style.left = "-100%";
      }
    }
    this._parentElm.dataset.slidepos = a;
    // save the value of a
    for (var i = 0; i < this._scrollingImg.length; i++) {
      this._scrollingImg[i].style.transform = "translateX(" + a + "%)";
      // this._scrollingImg[i].style.transition = ".2s";
    }
    this.atomaticScroll();
  },
  atomaticScroll: function () {
    var parentElm = this._parentElm;
    var rightImgSect = this._rightImgSect;
    var leftImgSect = this._leftImgSect;
    var scrollingImg = this._scrollingImg;
    this._interval = setInterval(function () {
      var a = parentElm.dataset.slidepos;
      if (a === undefined) {
        a = 0;
      } else {
        a = Number(a);
      }
      a += 100;
      if (a == 200) {
        a = -300;
        rightImgSect.style.right = "-300%";
        leftImgSect.style.left = "400%";
      } else if (a == 100) {
        rightImgSect.style.right = "200%";
      } else if (a == 0) {
        leftImgSect.style.left = "-100%";
      }
      parentElm.dataset.slidepos = a;
      for (var i = 0; i < scrollingImg.length; i++) {
        scrollingImg[i].style.transform = "translateX(" + a + "%)";
        if (a == -300) {
          scrollingImg[i].style.transition = "";
        } else {
          scrollingImg[i].style.transition = "transform .2s";
        }
      }
    }, 3000);
  },
  horizontalscroll: function (elValue, parent) {
    parentElm = document.querySelector(parent);
    var grandParent = parentElm.parentElement;
    var scrollingImg = parentElm.querySelectorAll(".watch-next-image");
    var scrollBtnMin = grandParent.querySelector(".scroll-btn-min");
    var scrollBtnAdd = grandParent.querySelector(".scroll-btn-add");

    var elWidth = scrollingImg[0].offsetWidth;
    var a = parentElm.dataset.slidepos;
    var scrollBtncantroler;
    var noOfScrollingDistance;
    if (a === undefined) {
      a = 0;
    } else {
      a = Number(a);
    }
    if (scrollingImg.length < 16) {
      scrollBtncantroler = 1;
    } else {
      scrollBtncantroler = 2;
    }
    if (elWidth < 165) {
      noOfScrollingDistance = 800;
    } else {
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
      scrollingImg[i].style.transition = ".1s";
    }
  },
};
