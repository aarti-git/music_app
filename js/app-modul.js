const app = {
    init: function() {
        this.registerInterceptor()
        // token.init();
        cookies.init();
        popup.init();
    },

    registerInterceptor(){
        $(document).ajaxError(function(a,b,c){
            const resp = b.responseJSON
            if(resp.error && resp.error.status === 401) {
                loginForm();
            }
        })
        $.ajaxSetup({
            beforeSend: function(xhr){
                xhr.setRequestHeader('Authorization', `Bearer ${token.getAccessToken()}`)
            }
        })
    }
}