import { API_URL } from './../http/index';
import { AuthResponse } from './../models/response/AuthResponse';
import axios from "axios";
import { IUser } from "../models/IUser";
import { makeAutoObservable } from "mobx";
import AuthService from "../service/AuthService";

export default class Store {
    user = {} as IUser
    isAuth = false
    isLoading = false

    constructor() {
        makeAutoObservable(this)
    }

    setLoading(status: boolean) {
        this.isLoading = status
    }

    setAuth(status: boolean) {
        this.isAuth = status
    }

    setUser(user: IUser) {
        this.user = user
    }

    async login(email: string, password: string) {
        try {
            const response = await AuthService.login(email, password)
            console.log(response)
            localStorage.setItem('token', response.data.accessToken)
            this.setAuth(true)
            this.setUser(response.data.user)
        } catch (error) {
            console.log(error.response?.data?.message || error)
        }
    }

    async registration(email: string, password: string) {
        try {
            const response = await AuthService.registration(email, password)
            console.log(response)
            localStorage.setItem('token', response.data.accessToken)
            this.setAuth(true)
            this.setUser(response.data.user)
        } catch (error) {
            console.log(error.response?.data?.message || error)
        }
    }

    async logout() {
        try {
            const response = await AuthService.logout
            localStorage.removeItem('token')
            this.setAuth(false)
            this.setUser({} as IUser)
        } catch (error) {
            console.log(error.response?.data?.message || error)
        }
    }

    async checkAuth() {
        try {
            this.setLoading(true)
            const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {withCredentials: true})
            localStorage.setItem('token', response.data.accessToken)
            this.setAuth(true)
            this.setUser(response.data.user)
        } catch (error) {
            console.log(error.response?.data?.message || error)
        } finally {
            this.setLoading(false)
        }
    }

}