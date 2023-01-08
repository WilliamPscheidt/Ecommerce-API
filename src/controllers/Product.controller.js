const DatabaseServer = require("../adapters/database-server")

const Product = require('../models/Products.model')
const ProductCategoryModel = require('../models/ProductCategory.mode')

const database = new DatabaseServer()

class ProductController {
    static async insert(req, res) {

        const {product_name, category, description, price, adicional_content} = req.body;

        const verify_category = await database.find(ProductCategoryModel, {category_title: category})
        const getProduct = await database.find(Product, {product_name: product_name})

        if(verify_category.length === 0){
            return res.status(400).send({error: "Please, enter a valid category name"})
        }

        if(getProduct.length > 0) {
            return res.status(400).send({error: "This product already exists"})
        }

        try {
            await database.insert(Product, { 
                product_name: product_name,
                description: description,
                category: category,
                price: price,
                adicional_content: adicional_content
            })
        } catch (error) {
            return res.status(400).send({error: "error in request"})
        }

        res.status(201).send({
            success: "Product inserted"
        })
    }

    static async get(req, res) {
        const {product_name} = req.body;

        const getProduct = await database.find(Product, {product_name: product_name})

        if(getProduct.length === 0) {
            return res.status(400).send({error: "This product doesn't exists"})
        }

        return res.status(200).send({success: getProduct})
    }

    static async delete(req, res) {
        const {id} = req.body;

        const getProduct = await database.find(Product, {id: id})

        if(getProduct.length === 0) {
            return res.status(400).send({error: "This product doesn't exists"})
        }

        try {
            await database.delete(Product, {id: id})
        } catch (error) {
            return res.status(400).send({error: "error in request"})
        }
        
        res.status(200).send({
            success: "Product deleted"
        })
    }

    static async update(req, res) {
        const {id, product_name, category, description, price, adicional_content} = req.body;

        const getProduct = await database.find(Product, {product_name: product_name})

        if(getProduct.length > 0) {
            return res.status(400).send({error: "This product already exists"})
        }

        try {
            await database.update(Product, {id: id}, {
                id: id,
                product_name: product_name,
                description: description,
                category: category,
                price: price,
                adicional_content: adicional_content
            })
        } catch (error) {
            return res.status(400).send({error: "error in request"})
        }

        res.status(200).send({
            success: "Product updated"
        })
    }
}

module.exports = ProductController