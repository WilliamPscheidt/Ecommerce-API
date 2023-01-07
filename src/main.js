const Router = require("./services/router/router")
Router.initialize()

const Token = require("./adapters/token")

const  teste = async () => {
    const token = await Token.generateToken({email: "williampscheidt@hotmail.com"}, 3000)
    console.log(await Token.verifyToken(token))
}

teste()
