
const backendBaseUrl=  "http://localhost:5000/api";
const urlBuilder = {
    authBaseUrl: "/auth",
    login: "/login",
    refresh: "/refresh",
    registerManager: "/registerManager",
    logout: "/logout",
    getAllManagers: "/getManager",
    verify:"/verify",
    createPassword:"/addPassword",
    sendActivateEmail:"/sendActivateEmail",
    forgotPassword:"/password/forgot",
    banManager:"/banManager",
    unbanManager:"/unbanManager",
    loginUrl:() =>  backendBaseUrl + urlBuilder.authBaseUrl + urlBuilder.login,
    refreshUrl:() =>  backendBaseUrl + urlBuilder.authBaseUrl + urlBuilder.refresh,
    registerManagerUrl:() => backendBaseUrl + urlBuilder.authBaseUrl + urlBuilder.registerManager,
    logoutUrl:() => backendBaseUrl + urlBuilder.authBaseUrl + urlBuilder.logout,
    getAllManagerUrl:() => backendBaseUrl + urlBuilder.authBaseUrl + urlBuilder.getAllManagers,
    verifyUrl:() => backendBaseUrl + urlBuilder.authBaseUrl + urlBuilder.verify,
    createPasswordUrl:() => backendBaseUrl + urlBuilder.authBaseUrl + urlBuilder.createPassword,
    sendActivateEmailUrl:() => backendBaseUrl + urlBuilder.authBaseUrl + urlBuilder.sendActivateEmail,
    forgotPasswordUrl:() => backendBaseUrl + urlBuilder.authBaseUrl + urlBuilder.forgotPassword,
    banManagerUrl:() => backendBaseUrl + urlBuilder.authBaseUrl + urlBuilder.banManager,
    unbanManagerUrl:() => backendBaseUrl + urlBuilder.authBaseUrl + urlBuilder.unbanManager,
}
export {
    backendBaseUrl,
    urlBuilder,
}