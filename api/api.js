// api.js
const host = 'http://localhost'
export const api = {
    userinfo: {
        synchronize: host + '/wx/userinfo/synchronize'
    },
    login: {
        code2session: host + '/wx/login/jscode2session'
    }
}