// storage.js
import { api } from '../api/api'
import { wxPostRequest } from './promise'
import { log } from './logger'

const KEY_USER_INFO = 'KEY_USER_INFO';

export function wxSetStorage(key, value) {
    return new Promise((resolve, reject) => {
        try {
            wx.setStorageSync(key, value)
            resolve(value);
        } catch (e) {
            reject(e);
        }
    });
}

export function wxGetStorage(key) {
    return new Promise((resolve, reject) => {
        try {
            resolve(wx.getStorageSync(key));
        } catch (e) {
            reject(e);
        }
    });
}