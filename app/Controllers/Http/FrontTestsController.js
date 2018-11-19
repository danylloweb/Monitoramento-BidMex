'use strict';
const Service = use('App/Services/FrontTestsService');

/**
 * class
 * FrontTestsController
 */
class FrontTestsController {
    /**
     * index
     * @returns {*|{limit, strict, types}|void}
     */
    async testBuscaAereo({response}) {
        try {
            await Service();
            return response.json({error: false, message: 'Online'});
        } catch (e) {
            console.log(e);
            return response.json({error: true, message: 'Offline'});
        }
    }
}

module.exports = FrontTestsController;
