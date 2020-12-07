const token = {
    init: function(){
        this.cookies = document.cookie.split('; ').reduce((cookies, cookie) => {
            const parts = cookie.split('=')
            cookies[parts[0]] = parts[1]
            return cookies
        }, {})
    },

    getAccessToken: function() {
        return this.cookies.spotify_access_token
    },

    getRefreshToken: function() {
        return this.cookies.spotify_refresh_token
    },
}