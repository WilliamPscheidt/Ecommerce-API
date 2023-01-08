class ProductCategoryValidation {

    static insert(req, res, next) {

        const {category_title} = req.body;

        if(!category_title) {
            return res.status(400).send({error: "please, provide the category title"})
        }

        next()
    }

    static get(req, res, next) {
        const {category_title} = req.body;

        if(!category_title) {
            return res.status(400).send({error: "please, provide the category title"})
        }

        next()
    }
    
    static delete(req, res, next) {
        const {category_title} = req.body;

        if(!category_title) {
            return res.status(400).send({error: "please, provide the category title"})
        }

        next()
    }

    static update(req, res, next) {

        const {category_title, new_title} = req.body;

        if(!category_title || !new_title) {
            return res.status(400).send({error: "please, provide all data"})
        }

        next()
    }
}

module.exports = ProductCategoryValidation