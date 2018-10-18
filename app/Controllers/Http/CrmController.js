'use strict';
const client = use('request-promise');
/**
 * class
 * CrmController
 */
class CrmController {
    /**
     * index
     * @param response
     * @returns {*|{limit, strict, types}|void}
     */
    async index({response}){
        
        try {
            await client({
                url: 'https://app.elomilhas.com.br/users/login',
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

module.exports = CrmController;
