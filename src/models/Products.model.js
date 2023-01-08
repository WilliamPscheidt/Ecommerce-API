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
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    adicional_content: {
        type: Object,
        required: false
    }
})

module.exports = mongoose.model('Product', ProductSchema)