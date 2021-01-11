const app = {
    init: function() {
        this.registerInterceptor()
        token.init();
        popup.init();
        // const spotifyUserInf = document.querySelector('.spotify-user-inf');
        // token.getUserData(spotifyUserInf);
    },

    registerInterceptor(){
        $(document).ajaxError(function(a,b,c){
            const resp = b.responseJSON
            if(resp.error && resp.error.status === 401) {
                loginForm()
            }
        })
        $.ajaxSetup({
            beforeSend: function(xhr){
                xhr.setRequestHeader('Authorization', `Bearer ${token.getAccessToken()}`)
            }
        })
    }
}