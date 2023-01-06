const bcrypt = require("bcrypt")

class Cryptography {
    static async encrypt(password) {
        return await bcrypt.hash(password, 10)
    }
    
    static async compare(password, hash) {
        return new Promise((resolve, reject) => {
            if(bcrypt.compare(password, hash)){
                resolve()
            }
            reject()
        })
    }
}

module.exports = Cryptography