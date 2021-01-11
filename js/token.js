const token = {
    init: function(){
        this.cookies = document.cookie.split('; ').reduce((cookies, cookie) => {
            const parts = cookie.split('=')
            cookies[parts[0]] = parts[1]
            // console.log("cookies = ", cookies);
            return cookies
        }, {})
    },

    getAccessToken: function() {
        return this.cookies.spotify_access_token
    },

    getRefreshToken: function() {
        return this.cookies.spotify_refresh_token
    },
    getUserData :function(el){
        var user_data =  this.cookies.spotify_user_data;
        var user_dataObj = JSON.parse(decodeURIComponent(user_data));
        // console.log("user_dataObj",user_dataObj);
       var userloginImg = user_dataObj.spotify_userImg;
       if(userloginImg.length == 0){
        el.lastElementChild.src ="img/profile-icon.jpg"
       }else{
        el.lastElementChild.src = user_dataObj.spotify_userImg[0].url;
       }
        el.firstElementChild.nextElementSibling.innerHTML = user_dataObj.spotify_userName;
       var signIn = document.querySelector(".sign-in") ;
       signIn.style.dispaly="none";
    }
}