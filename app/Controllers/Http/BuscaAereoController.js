'use strict'
const client = use('request-promise');
/**
 * BuscaAereoController
 */
class BuscaAereoController {

    /**
     * index
     * @param response
     * @returns {*|{limit, strict, types}|void}
     */
    async index ({ response }) {

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
}

module.exports = BuscaAereoController
