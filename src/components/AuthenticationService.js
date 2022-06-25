import axios from 'axios'
//import { API_URL } from '../../Constants'

export const USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser'
//export const API_URL = 'http://localhost:8080'

class AuthenticationService {

    // registerSuccessfulLogin(username, password) {
    //     //let basicAuthHeader = 'Basic ' +  window.btoa(username + ":" + password)
    //     //console.log('registerSuccessfulLogin')
    //     sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username)
    //     this.setupAxiosInterceptors(this.createBasicAuthToken(username, password))
    // }

    registerSuccessfulLogin(accessToken, refreshToken,name) {
        //let basicAuthHeader = 'Basic ' +  window.btoa(username + ":" + password)
        console.log('registerSuccessfulLogin')
        console.log("accessToken:" + accessToken );
        console.log("refreshToken:" + refreshToken );
        sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, name)
        this.setupAxiosInterceptors(accessToken)
    }

    executeBasicAuthenticationService(name, password) {
        // return axios.get('http://localhost:8081/e-auction/api/v1/user/login',
        //     { headers: { authorization: this.createBasicAuthToken(username, password) } })
        const requestBody= {"name": name,"password": password}
        console.log("requestBody:" + requestBody );
        return axios.post('http://localhost:8081/e-auction/api/v1/user/login', requestBody)
                    .then(response => this.registerSuccessfulLogin(response.data.accessToken,name))
    }

    createBasicAuthToken(username, password) {
        return 'Basic ' + window.btoa(username + ":" + password)
    }

    setupAxiosInterceptors(token) {

        axios.interceptors.request.use(
            (config) => {
                if (this.isUserLoggedIn()) {
                    config.headers.authorization = token
                }
                return config
            }
        )
    }


    logout() {
        sessionStorage.removeItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
    }

    isUserLoggedIn() {
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
        if(user===null) return false
        return true
    }

    getLoggedInUserName() {
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
        if(user===null) return ''
        return user
    }
}

export default new AuthenticationService()