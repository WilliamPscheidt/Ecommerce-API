const mongoose = require('mongoose')
const uuid = require("uuid")

const UserSchema = new mongoose.Schema({
    id: {
        type: String,
        default: uuid.v4,
        reqired: true,
        unique: true
    },
    access_level: {
        type: String,
        default: "User",
        required: false,
    },
    name: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    address: {
        type: String,
        require: true
    },
    zipcode: {
        type: String,
        require: true
    },
    contact: {
        type: String,
        require: true
    },
    document: {
        type: String,
        require: true
    }
})

module.exports = mongoose.model('Users', UserSchema)