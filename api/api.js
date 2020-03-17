// api.js
const host = 'https://promets.jezhu.ltd/promets'
// const host = 'http://localhost:8088/promets'
export const api = {
  userinfo: {
    synchronize: host + '/wx/userinfo/synchronize'
  },
  login: {
    code2session: host + '/wx/login/jscode2session'
  },
  gifts:{
    weather: host + '/wx/gifts/weather'
  },
  third: {
    hitokoto: 'https://v1.hitokoto.cn'
  }

}