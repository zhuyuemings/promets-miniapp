// promise.js
import { log } from './logger'

const REQUEST_SUCCESS = '0'

export function wxLogin() {
    return new Promise((resolve, reject) => {
        wx.login({
            success(res) {
                resolve(res)
            },
            fail(err) {
                reject('调用失败，错误信息：' + err)
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
                    reject('调用失败，错误信息：' + JSON.stringify(res))
                    log('没有返回值，说明请求失败！')
                } else if (res.data.code != REQUEST_SUCCESS) {
                    reject('调用失败，错误信息：' + JSON.stringify(res))
                    if (res.data.message) {
                        wxShowToast(res.data.message)
                    }
                } else {
                    log('请求成功!')
                }
                resolve(res)
            },
            fail: err => {
                reject('调用失败，错误信息：' + err)
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
                reject(err)
            }
        })
    })
}