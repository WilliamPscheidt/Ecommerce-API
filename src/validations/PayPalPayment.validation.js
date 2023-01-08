class PayPalPaymentValidation {

    static paypalGenerateInvoice(req, res, next) {

        const { product_id, currency, quantity, userToken } = req.body

        if(!product_id || !currency || !quantity || !userToken) {
            return res.status(400).send({error: "please, provide all data"})
        }

        if(!currency == "BRL" || !currency == "USD") {
            return res.status(400).send({error: "please, provide a valid currecy"})
        }

        next()
    }

    static paypalPayment(req, res, next) {

        let paymentId = req.query.paymentId;
        let payerId = { payer_id: req.query.PayerID };

        if(!paymentId || !payerId) {
            return res.status(400).send({error: "please, provide all data"})
        }

        next()
    }
}

module.exports = PayPalPaymentValidation