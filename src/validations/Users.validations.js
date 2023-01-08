class UserValidations {
    static login(req, res, next) {

        const {email, password} = req.body

        const regexEmailValidation = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

        if (!email || !password) {
            return res.status(400).send({error: "please, provide all data"})
        }

        if (!email.match(regexEmailValidation)) {
            return res.status(400).send({error: "invalid e-mail provided"})
        }

        next()
    }

    static register(req, res, next) {

        const {name, lastname, email, password, address, zipcode, contact, document} = req.body;

        const regexPasswordValidation = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
        const regexEmailValidation = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        const zipcodeValidation = /^[0-9]{5}-[0-9]{3}$/
        const documentValidation = /^[0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2}$/
    
        if(!name || !lastname || !email || !password || !address || !zipcode || !contact || !document ) {
            return res.status(400).send({error: "please, provide all data"})
        }

        if (!email.match(regexEmailValidation)) {
            return res.status(400).send({error: "invalid e-mail provided"})
        }

        if (!password.match(regexPasswordValidation)) {
            return res.status(400).send({error: "your password must be more stronger"})
        }

        if(!zipcode.match(zipcodeValidation)) {
            return res.status(400).send({error: "please, provide a valid zipcode"})
        }

        if(!document.match(documentValidation)) {
            return res.status(400).send({error: "please, provide a valid document"})
        }

        next()
    }
}

module.exports = UserValidations