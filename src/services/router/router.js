const HttpServer = require("../../adapters/http-server")
const RateLimit = require("../security/rate-limit")
const httpServer = new HttpServer()

const ProductController = require("../../controllers/Product.controller")
const UserController = require("../../controllers/User.controller")

class Router {
    static async initialize() {
        httpServer.use("/", RateLimit.check)

        httpServer.get("/products", ProductController.get)
        httpServer.post("/products", ProductController.insert)
        httpServer.put("/products", ProductController.update)
        httpServer.delete("/products", ProductController.delete)

        httpServer.get("/user", UserController.login)
        httpServer.post("/user", UserController.register)

        httpServer.start()
    }
}   

module.exports = Router