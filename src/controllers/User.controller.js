const DatabaseServer = require("../adapters/database-server")
const User = require('../models/Users.model')

const Cryptography = require("../adapters/cryptography")
const Token = require("../adapters/token")

const database = new DatabaseServer()

class UserController {
    static async login(req, res) {
        const {email, password} = req.body
        
        const userData = await database.find(User, {email: email})

        if(await Cryptography.compare(password, userData[0].password)) {
            return res.send({"success": "user logged in", "token": await Token.generateToken({email: email}, 3000)})
        } else {
            res.send({"error": "invalid data provided"})
        }
    }

    static async register(req, res) {
        
        const {name, lastname, email, password, address, zipcode, contact, document} = req.body;

        try {
            await database.insert(User, {
                name: name,
                lastname: lastname,
                email: email,
                password: await Cryptography.encrypt(password),
                address: address,
                zipcode: zipcode,
                contact: contact, 
                document: document
            })
        } catch (error) {
            return res.send({error: "error in request"})
        }

        const userToken = await Token.generateToken({email: email}, 3000)

        res.send({"success": "user registered", "token": userToken})
    }
}

module.exports = UserController