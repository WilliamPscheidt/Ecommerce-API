const paypal = require('paypal-rest-sdk');

const Product = require('../models/Products.model')
const Payments = require('../models/Payments.model')

const DatabaseServer = require("../adapters/database-server")
const database = new DatabaseServer()

const configurations = require("../../configurations.json")
const Token = require("../adapters/token")

const forgePaypalPayment = require("./utils/ForgePaypalPayment")

paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': configurations.paypal_client,
    'client_secret': configurations.paypal_secret
});

class PaymentsController {

    static async paypalGenerateInvoice(req, res) {

        const { product_id, currency, quantity, userToken } = req.body

        if (!Token.verifyToken(userToken)) {
            res.send({ "error": "invalid token provided" })
        }

        const productInformations = await database.find(Product, { id: product_id })

        if(productInformations.length === 0) {
            return res.send({error: "Invalid product ID"})
        }

        const create_payment_json = forgePaypalPayment(
            productInformations[0].product_name, product_id, productInformations[0].price.replace(/,/g, "."), currency, quantity, productInformations[0].description)

        console.log(create_payment_json)

        paypal.payment.create(create_payment_json, async function (error, payment) {
            if (error) {
                return res.send({ error: error })
            }
            const tokenEmail = await Token.decodeToken(userToken)

            await database.insert(Payments, {
                payment_id: payment.id,
                payment_method: "PayPal",
                product_name: productInformations[0].product_name,
                price: productInformations[0].price.replace(/,/g, "."),
                product_id: product_id,
                user_email: tokenEmail.email
            })

            for (let i = 0; i < payment.links.length; i++) {
                if (payment.links[i].rel === 'approval_url') {
                    res.status(201).json({
                        status: 'success',
                        link: payment.links[i].href,
                    });
                }
            }
        })
    }

    static async paypalPayment(req, res) {
        let paymentId = req.query.paymentId;
        let payerId = { payer_id: req.query.PayerID };

        paypal.payment.execute(paymentId, payerId, async function (error, payment) {
            if (error) {
                console.error(JSON.stringify(error));
            } else {
                if (payment.state == 'approved') {
                    await database.update(Payments, {paymentId: paymentId}, {
                        payment_status: "Aproved",
                        payment: payment
                    })
                    res.status(201).json({
                        status: 'Payment Aproved',
                    });
                } else {
                    res.status(400).json({
                        status: 'payment not successful'
                    });
                }
            }
        });
    }

    static async cancelPayment(req, res) {
        let paymentId = req.query.paymentId;

        console.log(paymentId)
        
        res.status(201).json({
            status: 'fail',
            msg: 'payment cancel',
        })
    }
}

module.exports = PaymentsController