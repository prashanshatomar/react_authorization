import auth0 from 'auth0-js'
/**
 * the above auth0 is provided some sueful methods ome are login ,authenticated many more..
 */
const LOGIN_SUCCESS_PAGE = "/secret";
const LOGIN_FAILURE_PAGE = "/";

export default class Auth {
    auth0 = new auth0.WebAuth({
        domain:"dev-office.us.auth0.com",
        clientID:"qHj24zgr07UDs8v77LfwAv7pm2UiLEY5",
        redirectUri:"http://localhost:3000/callback",
        audience:"https://dev-office.us.auth0.com/userinfo",//audience is the enpoint to get some userinfo
        responseType:"token id_token",//it need needs token as well as unique id token
        scope:"openid"
    });

    constructor() {
        this.login = this.login.bind(this);
    }
    login() {
        this.auth0.authorize();
    }

    handleAuthentication(){
        console.log('inside handleAuthentication function ---')
        this.auth0.parseHash((err,authResults) => {
            console.log('err---- ', err)
            console.log('authResults---- ', authResults)

            if(authResults && authResults.accessToken && authResults.idToken) {
                console.log('authenticated ======')
                let expiresAt = JSON.stringify((authResults.expiresIn) * 1000 + new Date().getTime());

                localStorage.setItem("access_token", authResults.accessToken);
                localStorage.setItem("id_token", authResults.idToken);
                localStorage.setItem("expires_at", expiresAt);
                // eslint-disable-next-line no-restricted-globals
                location.hash = ""
                // eslint-disable-next-line no-restricted-globals
                location.pathname = LOGIN_SUCCESS_PAGE;
            } else if(err) {//failure login
                console.log('authenticated failure======')

                // eslint-disable-next-line no-restricted-globals
                location.pathname = LOGIN_FAILURE_PAGE
                console.log(err);
            }
        })
    }

    isAuthenticated(){
        let expiresAt = JSON.parse(localStorage.getItem("expires_at"));
        return new Date().getTime() < expiresAt;
    }
}