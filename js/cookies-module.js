
const cookiesModule ={
    init:function(el){
        document.cookie.split('; ').reduce((cookies, cookie) => {
            const parts = cookie.split('=')
            cookies[parts[0]] = parts[1]
            this.getUserData(el,cookies);
            // return cookies
        }, {})
    },
    getUserData :function(el,cookies){
        var user_data =  cookies.spotify_user_data;
        var user_dataObj = JSON.parse(decodeURIComponent(user_data));
        console.log("user_dataObj",user_dataObj);
        // el.
    }
}