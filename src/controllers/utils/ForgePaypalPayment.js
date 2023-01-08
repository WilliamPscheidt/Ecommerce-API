const forgePaypalPayment = (product_name, product_id, price, currency, quantity, description) => {
    return {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": "http://localhost:3000/payments/paypal/paypalPayment",
            "cancel_url": "http://localhost:3000"
        },
        "transactions": [{
            "item_list": {
                "items": [{
                    "name": product_name,
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
}

module.exports = forgePaypalPayment