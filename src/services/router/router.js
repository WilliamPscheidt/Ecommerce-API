const HttpServer = require("../../adapters/http-server")
const RateLimit = require("../security/rate-limit")
const httpServer = new HttpServer()

const ProductController = require("../../controllers/Product.controller")
const UserController = require("../../controllers/User.controller")
const PaymentsController = require("../../controllers/Payments.controller")

class Router {
    static async initialize() {
        httpServer.use("/", RateLimit.check)

        httpServer.get("/products", ProductController.get)
        httpServer.post("/products", ProductController.insert)
        httpServer.put("/products", ProductController.update)
        httpServer.delete("/products", ProductController.delete)

        httpServer.post("/payments/paypal/createOrder", PaymentsController.process_paypal)

        httpServer.get("/user/login", UserController.login)
        httpServer.post("/user/register", UserController.register)

        httpServer.start()
    }
}   

module.exports = Router