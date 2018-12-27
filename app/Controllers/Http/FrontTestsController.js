'use strict';
const FrontTestsService = use('App/Services/FrontTestsService');

/**
 * class
 * FrontTestsController
 */
class FrontTestsController {

    constructor() {
        this.frontTestsService = new FrontTestsService
    }

    /**
     * index
     * @returns {*|{limit, strict, types}|void}
     */
    async testBuscaAereo({response}) {
        try {
            await this.frontTestsService.run();
            return response.json({error: false, message: 'Online'});
        } catch (e) {
            console.log(e);
            return response.json({error: true, message: 'Offline'});
        }
    }
}

module.exports = FrontTestsController;
