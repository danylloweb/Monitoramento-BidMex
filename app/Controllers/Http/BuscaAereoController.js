'use strict';
const client       = use('request-promise');
const Cache        = use('Cache');
const Env          = use('Env');
const url_buscador = Env.get('URL_API_GATEWAY_BUSCADOR', 'http://api.apigateway.test');
const url_manager  = Env.get('URL_API_GATEWAY_MANAGER', 'http://api.apigateway.test');

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
                url: url_buscador + '/psv/airports',
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
                url:  url_manager + '/psv/airports',
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
     * usersLoggedIn
     * @returns {*}
     */
     async usersLoggedIn ({ request }) {
        return await client({
            method: 'get',
            url: url_buscador + '/api'+ request.originalUrl(),
            headers: {
                Accept: 'application/json',
                Authorization:  await this.accessToken()
            },
            json: true
        });
     }

    /**
     * lastLogin
     * @param params
     */
    async lastLogin({ request }) {
        return await client({
            method: 'get',
            url: url_buscador + '/api'+ request.originalUrl(),
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
           return await Cache.remember('token_', 72, async() => {
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
            return response.json({error: true, message: 'sem conexão com apiGateway'});
        }
    }

    /**
     * authParams
     * @returns {{grant_type: string, client_id: *, username: *, password: *, client_secret: *}}
     */
    async authParams() {
        return await {
            grant_type:   'password',
            client_id:     Env.get('CLIENT_ID', '17'),
            username:      Env.get('USERNAME', 'danylloferreira@mangue3.com'),
            password:      Env.get('PASSWORD', 'elo1234*'),
            client_secret: Env.get('CLIENT_SECRET', 'cbKFwsVBgkEDBkQVAOQw7dTTcgwYiCuB3lYCwuVH')
        };
    }
}

module.exports = BuscaAereoController;
