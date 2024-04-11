import {makeAutoObservable} from "mobx";

export default class UserStore {
    constructor() {
        this._isAuth = false
        this._user = {}
        this._devicesInBasket = []
        makeAutoObservable(this)

    }

    setIsAuth(bool) {
        this._isAuth = bool
    }
    setUser(user) {
        this._user = user
    }
    setDevicesInBasket(devices) {
        this._devicesInBasket = devices
    }
    get devicesInBasket () {
        return this._devicesInBasket
    }

    get isAuth() {
        return this._isAuth
    }
    get user() {
        return this._user
    }
}