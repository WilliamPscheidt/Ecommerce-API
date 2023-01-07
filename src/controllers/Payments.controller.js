const paypal = require('paypal-rest-sdk');

const configurations = require("../../configurations.json")

paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': configurations.paypal_client,
    'client_secret': configurations.paypal_secret
});

class PaymentsController {

    static async paypalGenerateInvoice(req, res) {

        const { product_id, price, product, description, currency, quantity, userToken } = req.body

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
                        "name": product,
                        "sku": product_id,
                        "price": price,
                        "currency": currency,
                        "quantity": quantity
                    }]
                },
                "amount": {
                    "currency": currency,
                    "total": price
                },
                "description": description
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