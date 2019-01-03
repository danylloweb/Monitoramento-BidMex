'use strict';
const client = use('request-promise');
const Cache  = use('Cache');
const Env    = use('Env');

/**
 * class
 * CrmController
 */
class CrmController {

    /**
     * constructor
     */
    constructor() {
         this.url_crm = Env.get('CRM_URL', 'http://10.1.1.105:8000');
    }
    /**
     * index
     * @param request
     * @returns {*}
     */
    async index({ request }) {
        return await client({
            method: 'get',
            url: this.url_crm + request.originalUrl(),
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
            return await Cache.remember('token_CRM', 72, async() => {
                let access_api = await client({
                    method: 'POST',
                    url: this.url_crm + '/oauth/token',
                    body: await this.authParams(),
                    json: true,
                    headers: {
                        Accept: 'application/json'
                    }
                });
                if (access_api.access_token) return 'Bearer ' + access_api.access_token;
            });
        } catch (e) {
            return response.json({error: true, message: e.message});
        }
    }

    /**
     * authParams
     * @returns {{grant_type: string, client_id: *, username: *, password: *, client_secret: *}}
     */
    async authParams() {
        return await {
            grant_type:   'password',
            client_id:     Env.get('CRM_CLIENT_ID', '6'),
            username:      Env.get('CRM_USERNAME', 'joaosilva@mangue3.com'),
            password:      Env.get('CRM_PASSWORD', '12345'),
            client_secret: Env.get('CRM_CLIENT_SECRET', 'QeJ2aI8aKDVXoRbWmtaKX5j43f1hHeHdYdh1z3rq')
        };
    }
}

module.exports = CrmController;
