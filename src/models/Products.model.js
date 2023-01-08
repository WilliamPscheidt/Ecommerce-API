const mongoose = require('mongoose')
const uuid = require("uuid")

const ProductSchema = new mongoose.Schema({
    id: {
        type: String,
        default: uuid.v4,
        reqired: true,
        unique: true
    },
    category: {
        type: String,
        required: true
    },
    product_name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    product_dimensions: {
        type: Object,
        required: true,
        weight: {
            type: Number,
            required: true
        },
        length: {
            type: Number,
            required: true
        },
        height: {
            type: Number,
            required: true
        },
        width: {
            type: Number,
            required: true
        }
    },
    adicional_content: {
        type: Object,
        required: false
    }
})

module.exports = mongoose.model('Product', ProductSchema)