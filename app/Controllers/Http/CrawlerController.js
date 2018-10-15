'use strict'
const client = use('request-promise');

/**
 * CrawlerController
 */
class CrawlerController {

    /**
     * Show a list of all airports.
     * GET airports
     */
    async index ({ response }) {

        try {
            const body = await client({
                url: 'http://elb-crw-1151427241.sa-east-1.elb.amazonaws.com:3000/',
                headers: {
                    Accept: 'application/json'
                },
                method: 'GET'
            });
            return response.json({error: false, message: 'Online'});

        } catch (e) {
            return response.status(200).json({error: true, message: 'Offline'});
        }
    }
}

module.exports = CrawlerController
