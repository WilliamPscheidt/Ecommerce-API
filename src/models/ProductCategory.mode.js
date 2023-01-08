const mongoose = require('mongoose')
const uuid = require("uuid")

const ProductCategory = new mongoose.Schema({
    category_title: {
        type: String,
        required: true,
        unique: true
    }
})

module.exports = mongoose.model('ProductCategory', ProductCategory)