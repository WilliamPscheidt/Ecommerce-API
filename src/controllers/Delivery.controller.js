const correios = require('correios-brasil');
const configurations = require('../../configurations.json')

class DeliveryController {
    
    static async priceToDelivery(req, res) {
        const {cep, product_id} = req.res

        let args = {
            sCepOrigem: configurations.originCep,
            sCepDestino: cep,
            nVlPeso: '1',
            nCdFormato: '1',
            nVlComprimento: '20',
            nVlAltura: '20',
            nVlLargura: '20',
            nCdServico: ['04014', '04510'], //Array com os códigos de serviço
            nVlDiametro: '0',
          };

        await correios.consultarCep(cep).then((error, response) => {
            if(response) {
                correios.calcularPrecoPrazo
            }
            res.send({error: "Invalid CEP provided"})
        })
    }

}

module.exports = DeliveryController