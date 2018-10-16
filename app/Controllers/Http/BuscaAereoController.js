'use strict'
const client = use('request-promise');
const User = use('App/Models/User');
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

    /**
     *
     * @param request
     * @param response
     * @returns {*}
     */
    async createIssue({ request, response }){
        try {
            const user = new User
            user.username = 'danyllo'
            await user.save();
            return User.fetch();

        } catch (e) {
            return response.json({error: true, message: 'error de jocelio'});
        }
    }
}

module.exports = BuscaAereoController
