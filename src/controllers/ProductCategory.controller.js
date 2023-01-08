const ProductCategoryModel = require('../models/ProductCategory.mode')

const DatabaseServer = require("../adapters/database-server")
const database = new DatabaseServer()

class ProductCategory {
    static async insert(req, res) {
        const {category_title} = req.body
        
        database.insert(ProductCategoryModel, {category_title: category_title})

        res.status(200).send({success: "Category created"})
    }

    static async get(req, res) {
        const {category_title} = req.body

        res.status(200).send({success: database.find(ProductCategoryModel, {category_title: category_title})})
    }

    static async update(req, res){
        const {category_title, new_title} = req.body

        database.update(ProductCategoryModel, {category_title: category_title}, {category_title: new_title})

        res.status(200).send({success: "Category updated"})
    }

    static async delete(req, res){
        const {category_title} = req.body

        database.delete(ProductCategoryModel, {category_title: category_title})

        res.status(200).send({success: "Category deleted"})
    }
}

module.exports = ProductCategory