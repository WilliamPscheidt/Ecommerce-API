const paypal = require('paypal-rest-sdk');

const Product = require('../models/Products.model')

const DatabaseServer = require("../adapters/database-server")
const database = new DatabaseServer()

const configurations = require("../../configurations.json")
const Token = require("../adapters/token")

paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': configurations.paypal_client,
    'client_secret': configurations.paypal_secret
});

class PaymentsController {

    static async paypalGenerateInvoice(req, res) {

        const { product_id, currency, quantity, userToken } = req.body

        if(!Token.verifyToken(userToken)) {
            res.send({"error": "invalid token provided"})
        }

        const productInformations = await database.find(Product, {id: product_id})

        console.log(productInformations)

        const create_payment_json = {
            "intent": "sale",
            "payer": {
                "payment_method": "paypal"
            },
            "redirect_urls": {
                "return_url": "http://localhost:3000/payments/paypal/paypalPayment",
                "cancel_url": "http://localhost:3000/payments/paypal/cancelPayment"
            },
            "transactions": [{
                "item_list": {
                    "items": [{
                        "name": productInformations[0].product_name,
                        "sku": product_id,
                        "price": productInformations[0].price.replace(/,/g, "."),
                        "currency": currency,
                        "quantity": quantity
                    }]
                },
                "amount": {
                    "currency": currency,
                    "total": productInformations[0].price.replace(/,/g, ".")
                },
                "description": productInformations[0].description
            }]
        };

        paypal.payment.create(create_payment_json, function (error, payment) {
            if (error) {
                return res.send({ error: error })
            }
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

        paypal.payment.execute(paymentId, payerId, function (error, payment) {
            if (error) {
                console.error(JSON.stringify(error));
            } else {
                if (payment.state == 'approved') {
                    console.log('payment completed successfully');
                    res.status(201).json({
                        status: 'success',
                        payment: payment,
                    });
                } else {
                    res.status(400).json({
                        status: 'payment not successful',
                        payment: {},
                    });
                }
            }
        });
    }

    static async cancelPayment(req, res) {
        res.status(201).json({
            status: 'fail',
            msg: 'payment cancel',
        })
    }
}

module.exports = PaymentsController