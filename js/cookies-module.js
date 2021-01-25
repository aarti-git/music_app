
const cookies={
    init:function(){
        this.cookies = document.cookie.split('; ').reduce((cookies, cookie) => {
            const parts = cookie.split('=')
            cookies[parts[0]] = parts[1]
            // console.log("module cookies",cookies);
            return cookies;
        }, {});
    },
    get:function(x){
        return this.cookies[x];
    }
}