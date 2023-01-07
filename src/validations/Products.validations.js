class ProductValidations {

    static insert(req, res, next) {

        const {product_name, description, price, adicional_content} = req.body;

        if(!product_name, !description, !price) {
            return res.send({error: "please, provide all data"})
        }

        next()
    }

    static update(req, res, next) {

        const {id, product_name, description, price, adicional_content} = req.body;

        if(!id, !product_name, !description, !price, !adicional_content) {
            return res.send({error: "please, provide all data"})
        }

        next()
    }

    static delete(req, res, next) {

        const {id} = req.body;

        if(!id) {
            return res.send({error: "please, provide all data"})
        }

        next()
    }

    static get(req, res, next) {

        const {product_name} = req.body;

        if(!product_name) {
            return res.send({error: "please, provide all data"})
        }

        next()
    }
}

module.exports = ProductValidations