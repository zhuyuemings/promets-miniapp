// logger.js
const debug = true

export function log(msg, obj) {
    if (debug) {
        if(obj){
            console.log(msg + ":" + JSON.stringify(obj))
        }else{
            console.log(msg)
        }
    }
}