const ProductCategoryModel = require('../models/ProductCategory.mode')

const DatabaseServer = require("../adapters/database-server")
const database = new DatabaseServer()

const CacheServer = require("../adapters/cache-server")
const Cache = new CacheServer()

class ProductCategory {
    static async insert(req, res) {
        const {category_title} = req.body

        const getCategory = await database.find(ProductCategoryModel, {category_title: category_title})

        if(getCategory.length > 0) {
            return res.status(400).send({success: "Category already exists"})
        }
        
        try {
            database.insert(ProductCategoryModel, {category_title: category_title})
            Cache.set(category_title, category_title, 0)
            return res.status(200).send({success: "Category created"})
        } catch (error) {
            console.log(error)
            return res.status(400).send({error: "Error in request"})
        }
    }

    static async get(req, res) {
        const {category_title} = req.body

        const cache = await Cache.get(category_title)

        if(cache){
            return res.status(200).send({success: cache, cache: true})
        }

        const getData = await database.find(ProductCategoryModel, {category_title: category_title})

        if(getData.length === 0) {
            return res.status(400).send({error: "Category not found"})
        }

        res.status(200).send({success: getData})
    }

    static async update(req, res){
        let {category_title, new_title} = req.body

        const getCategory = await database.find(ProductCategoryModel, {category_title: new_title})

        if(getCategory.length > 0) {
            return res.status(400).send({success: "Category already exists"})
        }

        try {
            await database.update(ProductCategoryModel, {category_title: category_title}, {category_title: new_title})

            await Cache.delete(category_title)
            await Cache.set(new_title, new_title)
    
            return res.status(200).send({success: "Category updated"})
        } catch (error) {
            console.log(error)
            return res.status(400).send({error: "Error in request"})
        }
    }

    static async delete(req, res){
        const {category_title} = req.body

        try { 
            await database.delete(ProductCategoryModel, {category_title: category_title})
            await Cache.delete(category_title)
            res.status(200).send({success: "Category deleted"})
        } catch (error) {
            console.log(error)
            return res.status(400).send({error: "Error in request"})
        }

    }
}

module.exports = ProductCategory