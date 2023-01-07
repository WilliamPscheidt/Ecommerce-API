const paypal = require('paypal-rest-sdk');

const configurations = require("../../configurations.json")

paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': configurations.paypal_client,
    'client_secret': configurations.paypal_secret
});

var create_payment_json = {
    "intent": "sale",
    "payer": {
        "payment_method": "paypal"
    },
    "redirect_urls": {
        "return_url": "http://return.url",
        "cancel_url": "http://cancel.url"
    },
    "transactions": [{
        "item_list": {
            "items": [{
                "name": "item",
                "sku": "item",
                "price": "1.00",
                "currency": "BRL",
                "quantity": 1
            }]
        },
        "amount": {
            "currency": "BRL",
            "total": "1.00"
        },
        "description": "This is the payment description."
    }]
};

class PaymentsController {

    static async process_paypal(req, res) {
        paypal.payment.create(create_payment_json, function (error, payment) {
            if (error) {
                return res.send({error: error})
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
}

module.exports = PaymentsController