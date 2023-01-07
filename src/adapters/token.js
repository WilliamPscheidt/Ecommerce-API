const jwt = require('jsonwebtoken')
const configuration = require("../../configurations.json")

class Token {
    
    static async generateToken(object, expires) {
        return await jwt.sign(object, configuration.token_key, {
            expiresIn: expires,
        });
    }

    static async verifyToken(token) {
        try {
            const decoded = await jwt.verify(token, configuration.token_key);
            return true;
        } catch (err) {
            return false;
        }
    }
}

module.exports = Token