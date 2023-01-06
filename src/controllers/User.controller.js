const DatabaseServer = require("../adapters/database-server")
const User = require('../models/Users.model')

const database = new DatabaseServer()

class UserController {
    static async login(req, res) {

        res.send({"ok": "login"})
    }

    static async register(req, res) {
        
        const {name, lastname, email, password, address, zipcode, contact, document} = req.body;

        try {
            await database.insert(User, {
                name: name,
                lastname: lastname,
                email: email,
                password: password,
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