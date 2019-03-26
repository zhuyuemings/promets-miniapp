// promise.js
import { log } from './logger'
import { api } from '../api/api'

const REQUEST_SUCCESS = '0'
const REQUEST_UNAUTHORIZED = '401'

export function wxLogin() {
    return new Promise((resolve, reject) => {
        wx.login({
            success(res) {
                resolve(res)
            },
            fail(err) {
                reject('promise.wxLogin调用失败，错误信息：' + JSON.stringify(err))
            },
        })
    })
}

export function wxPostRequest(url, body) {
    return new Promise((resolve, reject) => {
        log('请求地址：' + url)
        log('请求参数：' + JSON.stringify(body))
        wx.request({
            url: url,
            data: { body: body },
            method: 'POST',
            success: res => {
                log('wxPostRequest内部请求完成，res=' + JSON.stringify(res))
                if (!res.data || !res.data.code) {
                    reject('promise.wxPostRequest调用失败，错误信息：' + JSON.stringify(res))
                } else if (res.data.code != REQUEST_SUCCESS) {
                    reject('promise.wxPostRequest调用失败，错误信息：' + JSON.stringify(res))
                    if (res.data.message) {
                        wxShowToast(res.data.message)
                    }
                } else {
                    log('请求成功!')
                }
                resolve(res)
            },
            fail: err => {
                reject('promise.wxPostRequest调用失败，错误信息：' + JSON.stringify(err))
            }
        })
    })
}

export function wxPostRequestWithToken(url, body) {
    return new Promise((resolve, reject) => {
        log('请求地址：' + url)
        log('请求参数：' + JSON.stringify(body))
        let app = getApp();
        log('请求内获取app实例：' + JSON.stringify(app))
        wx.request({
            url: url,
            header: {
                'content-type': 'application/json',
                'token': app.globalData.token
            },
            data: { body: body },
            method: 'POST',
            success: res => {
                log('wxPostRequest内部请求完成，res=' + JSON.stringify(res))
                if (!res.data || !res.data.code) {
                    reject('promise.wxPostRequestWithToken调用失败，错误信息：' + JSON.stringify(res))
                } else if (res.data.code != REQUEST_SUCCESS) {
                    if (res.data.code == REQUEST_UNAUTHORIZED) {
                        // 说明jwt令牌失效，需要重新登录
                        wxLogin().then(res => {
                            log('wx.login()调用完成，res=' + JSON.stringify(res))
                            let body = {
                                jscode: res.code
                            }
                            return wxPostRequest(api.login.code2session, body)
                        }).then(res => {
                            log('wx.request()调用完成，res=' + JSON.stringify(res))
                            app.globalData.openid = res.data.data.openid
                            app.globalData.token = res.data.data.token
                            return wxPostRequestWithTokenRetry(url, body)
                        })
                    } else {
                        if (res.data.message) {
                            wxShowToast(res.data.message)
                        }
                        reject('promise.wxPostRequestWithToken调用失败，错误信息：' + JSON.stringify(res))
                    }
                } else {
                    resolve(res)
                }
            },
            fail: err => {
                reject('promise.wxPostRequestWithToken调用失败，错误信息：' + JSON.stringify(err))
            }
        })
    })
}

function wxPostRequestWithTokenRetry(url, body) {
    return new Promise((resolve, reject) => {
        log('请求地址：' + url)
        log('请求参数：' + JSON.stringify(body))
        let app = getApp();
        log('请求内获取app实例：' + JSON.stringify(app))
        wx.request({
            url: url,
            header: {
                'content-type': 'application/json',
                'token': app.globalData.token
            },
            data: { body: body },
            method: 'POST',
            success: res => {
                log('wxPostRequest内部请求完成，res=' + JSON.stringify(res))
                if (!res.data || !res.data.code) {
                    reject('promise.wxPostRequestWithToken调用失败，错误信息：' + JSON.stringify(res))
                } else if (res.data.code != REQUEST_SUCCESS) {
                    if (res.data.code == REQUEST_UNAUTHORIZED) {
                        // 再一次jwt令牌失效，直接给出提示
                        if (res.data.message) {
                            wxShowToast(res.data.message)
                        }
                        reject('promise.wxPostRequestWithToken调用失败，错误信息：' + JSON.stringify(res))
                    } else {
                        if (res.data.message) {
                            wxShowToast(res.data.message)
                        }
                        reject('promise.wxPostRequestWithToken调用失败，错误信息：' + JSON.stringify(res))
                    }
                } else {
                    resolve(res)
                }
            },
            fail: err => {
                reject('promise.wxPostRequestWithToken调用失败，错误信息：' + JSON.stringify(err))
            }
        })
    })
}


export function wxShowToast(title) {
    return new Promise((resolve, reject) => {
        wx.showToast({
            title: title,
            icon: 'none',
            duration: 2000,
            success: res => {
                resolve(res)
            },
            fail: err => {
                reject('promise.wxShowToast调用失败，错误信息：' + err)
            }
        })
    })
}