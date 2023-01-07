const bcrypt = require("bcrypt")

class Cryptography {
    static async encrypt(password) {
        return await bcrypt.hash(password, 10)
    }
    
    static async compare(password, hash) {
        return bcrypt.compare(password, hash)
    }
}

module.exports = Cryptography