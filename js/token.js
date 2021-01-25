const token = {
    getAccessToken: function() {
        return cookies.get('spotify_access_token');
    },

    getRefreshToken: function() {
        return  cookies.get('spotify_refresh_token');
    },
    
    getUserData :function(){
        var user_data =  cookies.get('spotify_user_data');
        var user_dataObj = JSON.parse(decodeURIComponent(user_data));
        return user_dataObj;
    },
    
}