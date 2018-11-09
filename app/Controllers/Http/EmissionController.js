'use strict';
const client       = use('request-promise');
const Cache        = use('Cache');
const Env          = use('Env');
const url_buscador = Env.get('BUSCA_URL', 'http://api.busca53.dev');
/**
 * EmissionController
 */
class EmissionController {


    /**
     * lastLogin
     * @param params
     */
    async lateOps({ request }) {
        return await client({
            method: 'get',
            url: url_buscador + request.originalUrl(),
            headers: {
                Accept: 'application/json',
                Authorization:  await this.accessToken()
            },
            json: true
        });
    }

    /**
     * companies
     * @param request
     * @returns {*}
     */
    async companies({request}){
        return await client({
            method: 'get',
            url: url_buscador + request.originalUrl(),
            headers: {
                Accept: 'application/json',
                Authorization:  await this.accessToken()
            },
            json: true
        });
    }

    /**
     * lateOpsFinancial
     * @returns {*}
     */
    async lateOpsFinancial({request}){

        return await client({
            method: 'get',
            url: url_buscador + request.originalUrl(),
            headers: {
                Accept: 'application/json',
                Authorization:  await this.accessToken()
            },
            json: true
        });
    }
    /**
     * acessToken
     * @returns {*}
     */
    async accessToken() {

        try {
            return await Cache.remember('token_busca', 72, async() => {
                let access_api = await client({
                    method: 'POST',
                    url: url_buscador + '/oauth/token',
                    body: await this.authParams(),
                    json: true,
                    headers: {
                        Accept: 'application/json'
                    }
                });
                if (access_api.access_token) return 'Bearer ' + access_api.access_token;
            });
        } catch (e) {
            return response.json({error: true, message: 'sem conexão com BuscaAereo'});
        }
    }

    /**
     * authParams
     * @returns {{grant_type: string, client_id: *, username: *, password: *, client_secret: *}}
     */
    async authParams() {
        return await {
            grant_type:   'password',
            client_id:     Env.get('BUSCA_CLIENT_ID', '4'),
            username:      Env.get('BUSCA_USERNAME', 'danylloferreira@mangue3.com'),
            password:      Env.get('BUSCA_PASSWORD', 'elo1234*'),
            client_secret: Env.get('BUSCA_CLIENT_SECRET', 'wTp5BV9J6cFZi7Z3SiG8sxcHn5CSJ0OJoaqg2jaJ')
        };
    }
}

module.exports = EmissionController;
