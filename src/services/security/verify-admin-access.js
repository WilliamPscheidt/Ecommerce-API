const Token = require("../../adapters/token")

class VerifyAdminToken {

    static async verify(req, res, next) {
        const {token} = req.body

        if(await Token.verifyAdminToken(token)) {
            next()
        } else {
            return res.send({error: "Invalid access token"})
        }
    }
}

module.exports = VerifyAdminToken