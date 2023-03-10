const DatabaseServer = require("../adapters/database-server")
const User = require('../models/Users.model')

const Cryptography = require("../adapters/cryptography")
const Token = require("../adapters/token")

const database = new DatabaseServer()

class UserController {
    static async login(req, res) {
        const { email, password } = req.body

        const userData = await database.find(User, { email: email })

        if(userData.length === 0) {
            return res.status(400).send({ "error": "please, register this user first" })
        }

        if (await Cryptography.compare(password, userData[0].password)) {
            if (userData[0].access_level == "Admin") {
                return res.status(200).send({ "success": "user logged in", "token": await Token.generateAdminToken({ email: email }, 3000), admin_mode: true })
            }
            return res.status(200).send({ "success": "user logged in", "token": await Token.generateToken({ email: email }, 3000) })
        } else {
            return res.status(400).send({ "error": "invalid data provided" })
        }
    }

    static async register(req, res) {

        const { name, lastname, email, password, address, zipcode, contact, document } = req.body;

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
            console.log(error)
            return res.status(409).send({ error: "User already exists" })
        }

        const userToken = await Token.generateToken({ email: email }, 3000)

        res.status(200).send({ "success": "user registered", "token": userToken })
    }
}

module.exports = UserController