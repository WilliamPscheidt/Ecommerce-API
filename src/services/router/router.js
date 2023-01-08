const HttpServer = require("../../adapters/http-server")

const RateLimit = require("../security/rate-limit")
const VerifyAdminToken = require("../security/verify-admin-access")

const ProductController = require("../../controllers/Product.controller")
const UserController = require("../../controllers/User.controller")
const PaymentsController = require("../../controllers/Payments.controller")
const ProductCategoryController = require("../../controllers/ProductCategory.controller")

const UserValidations = require("../../validations/Users.validations")
const ProductsValidations = require("../../validations/Products.validations")
const ProductCategoryValidation = require("../../validations/ProductCategory.validation")

const httpServer = new HttpServer()

class Router {
    static async initialize() {
        httpServer.use("/", RateLimit.check)
        httpServer.use("/admin/", VerifyAdminToken.verify)

        httpServer.get("/products", ProductsValidations.get)
        httpServer.get("/products", ProductController.get)
        httpServer.post("/admin/products", ProductsValidations.insert)
        httpServer.post("/admin/products", ProductController.insert)
        httpServer.put("/admin/products", ProductsValidations.update)
        httpServer.put("/admin/products", ProductController.update)
        httpServer.delete("/admin/products", ProductsValidations.delete)
        httpServer.delete("/admin/products", ProductController.delete)

        httpServer.get("/category", ProductCategoryValidation.get)
        httpServer.get("/category", ProductCategoryController.get)
        httpServer.post("/admin/category", ProductCategoryValidation.insert)
        httpServer.post("/admin/category", ProductCategoryController.insert)
        httpServer.put("/admin/category", ProductCategoryValidation.update)
        httpServer.put("/admin/category", ProductCategoryController.update)
        httpServer.delete("/admin/category", ProductCategoryValidation.delete)
        httpServer.delete("/admin/category", ProductCategoryController.delete)

        httpServer.post("/payments/paypal/createInvoice", PaymentsController.paypalGenerateInvoice)
        httpServer.get("/payments/paypal/paypalPayment", PaymentsController.paypalPayment)
        httpServer.get("/payments/paypal/cancelPayment", PaymentsController.cancelPayment)

        httpServer.get("/user/login", UserValidations.login)
        httpServer.get("/user/login", UserController.login)
        httpServer.post("/user/register", UserValidations.register)
        httpServer.post("/user/register", UserController.register)

        httpServer.start()
    }
}   

module.exports = Router