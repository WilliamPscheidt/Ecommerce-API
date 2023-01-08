const Token = require("./adapters/token")

const func = async () => { console.log(await Token.generateAdminToken({email: "will"}, 3000)) } 
func()

const Router = require("./services/router/router")
Router.initialize()