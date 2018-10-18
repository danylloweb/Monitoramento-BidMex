'use strict';
const client = use('request-promise');

/**
 * class
 * BuscaAereoController
 */
class BuscaAereoController {

    /**
     * GatewayBuscador
     * @param response
     * @returns {*|{limit, strict, types}|void}
     */
    async GatewayBuscador ({ response }) {

        try {
            let body = await client({
                url: 'https://gateway.buscaaereo.com.br/psv/airports',
                headers: {
                    Accept: 'application/json'
                },
                method: 'GET'
            });
            body = JSON.parse(body);
            let result = body.data ? {error: false, message: 'Online'} : {error: true, message: 'Offline'};
            return response.json(result);

        } catch (e) {
            return response.json({error: true, message: 'Offline'});
        }
    }

    /**
     * GatewayManager
     * @param response
     * @returns {*|{limit, strict, types}|void}
     */
    async GatewayManager ({ response }) {

        try {
            let body = await client({
                url: 'https://gateway-manager.buscaaereo.com.br/psv/airports',
                headers: {
                    Accept: 'application/json'
                },
                method: 'GET'
            });
            body = JSON.parse(body);
            let result = body.data ? {error: false, message: 'Online'} : {error: true, message: 'Offline'};
            return response.json(result);

        } catch (e) {
            return response.json({error: true, message: 'Offline'});
        }
    }
    
}

module.exports = BuscaAereoController;
