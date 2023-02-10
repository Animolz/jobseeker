import { AxiosClient } from "api/AxiosClient";
import React from "react";

const AuthService = {
    async register(params) {
        return await AxiosClient.post('auth/signup', {
            ...params,
        })
    },

    async login(params) {
        return await AxiosClient.post('auth/authenticated',{...params});
    },

    checkLogin() {
        if(JSON.parse(localStorage.getItem('currentUser'))?.accessToken){
           return true;
        }
        return false;
    },

    getAccessToken() {
        if(!!localStorage.getItem('currentUser')){
            return JSON.parse(localStorage.getItem('currentUser'))?.accessToken
        }
        return null;
    },

    getCurrentUser() {
        if(!!localStorage.getItem('currentUser')){
            return JSON.parse(localStorage.getItem('currentUser'))
        }
        return null;
    },

    async getUserData() {
        return await AxiosClient.get('auth/current-user', {headers : { Authorization : `nhn ${JSON.parse(localStorage.getItem('currentUser'))?.accessToken}` }});
    },

    logout() {
        if(this.getAccessToken()?.accessToken){
            localStorage.removeItem('currentUser');
            return true;
        }
        return false;
    }
}

export default AuthService