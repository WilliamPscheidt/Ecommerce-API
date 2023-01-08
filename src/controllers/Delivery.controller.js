const correios = require('correios-brasil');
const forgeDeliveryRequest = require("./utils/ForgeDeliveryRequest")

const DatabaseAdapter = require("../adapters/database-server")
const database = new DatabaseAdapter()

const ProductModel = require("../models/Products.model");

class DeliveryController {

    static async correiosCalculation(req, res) {
        try {
            const { cep, product_id } = req.body

            const productData = await database.find(ProductModel, { id: product_id })

            if (productData.length === 0) {
                return res.status(400).send({ error: "This product doesn't exists" })
            }

            const response = await correios.consultarCep(cep)
            if (response) {
                const args = await forgeDeliveryRequest(
                    cep,
                    productData[0].product_dimensions.weight,
                    productData[0].product_dimensions.length,
                    productData[0].product_dimensions.height,
                    productData[0].product_dimensions.width
                )

                const deliveryResponse = await correios.calcularPrecoPrazo(args)
                return res.send({ deliveryResponse })
            }

            return res.status(400).send({ error: "Invalid CEP provided" })
        } catch (error) {
            console.error(error)
            return res.status(500).send({ error: "Error in delivery calculation" })
        }
    }

    static async deliveryTracking(req, res) {
        const {deliveryCode} = req.body

        const codes = [deliveryCode]

        await correios.rastrearEncomendas(codes).then(response => {
            return res.status(200).send({ response })
        })
    }
}


module.exports = DeliveryController