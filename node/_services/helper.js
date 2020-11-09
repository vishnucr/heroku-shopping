const btoa = require('btoa');
const atob = require('atob');
module.exports = {
    b64encode(username, password){
        let base64 = btoa(`${username}:${password}`);
        return base64
    },
    b64decode(string){
        let decoded = atob(string);
        return decoded
    }
}