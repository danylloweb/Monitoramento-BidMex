'use strict';
const client = use('request-promise');
/**
 * class
 * FinanceiraController
 */
class FinanceiraController {

    /**
     * index
     * @param response
     * @returns {*|{limit, strict, types}|void}
     */
    async index({response}){

        try {
            await client({
                url: 'https://financeiro.buscaaereo.com.br/',
                headers: {
                    Accept: '*/*'
                },
                method: 'GET'
            });

            return response.json({error: false, message: 'Online'});

        } catch (e) {
            return response.json({error: true, message: 'Offline'});
        }
    }
}

module.exports = FinanceiraController;
