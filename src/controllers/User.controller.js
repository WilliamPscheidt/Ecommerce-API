const DatabaseServer = require("../adapters/database-server")
const User = require('../models/Users.model')

const Cryptography = require("../adapters/cryptography")

const database = new DatabaseServer()

class UserController {
    static async login(req, res) {
        const {email, password} = req.body
        
        const userData = await database.find(User, {email: email})

        console.log(userData[0].password)

        if(userData[0].password == password) {
            return res.send({"success": "user logged in"})
        }

        res.send({"error": "invalid data provided"})
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
            return res.send({error: error})
        }

        res.send({"ok": "user registered"})
    }
}

module.exports = UserController