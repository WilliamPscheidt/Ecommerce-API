const DatabaseServer = require("../adapters/database-server")
const Product = require('../models/Products.model')

const database = new DatabaseServer()

class ProductController {
    static async insert(req, res) {

        const {product_name, description, price, adicional_content} = req.body;

        try {
            await database.insert(Product, { 
                product_name: product_name,
                description: description,
                price: price,
                adicional_content: adicional_content
            })
        } catch (error) {
            return res.send({error: error})
        }

        res.send({
            success: "Product inserted"
        })
    }

    static async get(req, res) {
        const {product_name} = req.body;

        try{
            res.send({success: await database.find(Product, {product_name: product_name})})
        } catch (error) {
            return res.send({error: error})
        }

    }

    static async delete(req, res) {
        const {id} = req.body;

        try {
            await database.delete(Product, {id: id})
        } catch (error) {
            return res.send({error: error})
        }
        
        res.send({
            success: "Product deleted"
        })
    }

    static async update(req, res) {
        const {id, product_name, description, price, adicional_content} = req.body;

        try {
            await database.update(Product, {id: id}, {
                id: id,
                product_name: product_name,
                description: description,
                price: price,
                adicional_content: adicional_content
            })
        } catch (error) {
            return res.send({error: error})
        }

        res.send({
            success: "Product updated"
        })
    }
}

module.exports = ProductController