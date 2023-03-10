const mongoose = require('mongoose')
const uuid = require("uuid")

const Payments = new mongoose.Schema({
    payment_id: {
        type: String,
        reqired: true
    },
    payment_method: {
        type: String,
        required: true
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
    user_email: {
        type: String,
        required: true
    },
    payment_status: {
        type: String,
        default: "Pending",
        required: true
    },
    payment: {
        Type: Object,
        required: false
    }
})

module.exports = mongoose.model('Payments', Payments)