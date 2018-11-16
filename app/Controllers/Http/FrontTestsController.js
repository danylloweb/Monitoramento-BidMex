'use strict';
const Service = require('../../Services/FrontTestsService');

/**
 * class
 * FrontTestsController
 */
class FrontTestsController {
  /**
   * index
   * @returns {*|{limit, strict, types}|void}
   */
  async testBusca({response}) {
    try {
      console.log(Service);
      await Service();
      console.log('Finished');
      return response.json({error: false, message: 'Online'});

    } catch (e) {
      console.log(e);
      return response.json({error: true, message: 'Offline'});
    }
  }
}

module.exports = FrontTestsController;
