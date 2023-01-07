const mongoose = require('mongoose')
const uuid = require("uuid")

const Payments = new mongoose.Schema({
    payment_id: {
        type: String,
        default: uuid.v4,
        reqired: true,
        unique: true
    },
    product_name: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    product_id: {
        type: Object,
        required: true
    },
    user_id: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Payments', Payments)