const DatabaseServer = require("../adapters/database-server")
const Product = require('../models/Products.model')

const database = new DatabaseServer()

class ProductController extends DatabaseServer {
    static async insert(req, res) {

        const {product_name, description, price, adicional_content} = req.body;

        await database.insert(Product, { 
            product_name: product_name,
            description: description,
            price: price,
            adicional_content: adicional_content
        })

        res.send({
            success: "Product inserted"
        })
    }

    static async get(req, res) {
        const {product_name} = req.body;

        res.send({
            success: await database.find(Product, {product_name: product_name})
        })
    }

    static async delete(req, res) {
        const {id} = req.body;

        await database.delete(Product, {id: id})

        res.send({
            success: "Product deleted"
        })
    }

    static async update(req, res) {
        const {id, product_name, description, price, adicional_content} = req.body;

        await database.update(Product, {id: id}, {
            id: id,
            product_name: product_name,
            description: description,
            price: price,
            adicional_content: adicional_content
        })

        res.send({
            ok: "Update"
        })
    }
}

module.exports = ProductController