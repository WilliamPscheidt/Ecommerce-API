const configurations = require('../../../configurations.json')

const forgeDeliveryRequest = async (cep, weight, length, height, width ) => {
    return {
        sCepOrigem: configurations.originCep,
        sCepDestino: cep,
        nVlPeso: weight,
        nCdFormato: '1',
        nVlComprimento: length,
        nVlAltura: height,
        nVlLargura: width,
        nCdServico: ['04014', '04510'],
        nVlDiametro: '0',
    };
}

module.exports = forgeDeliveryRequest