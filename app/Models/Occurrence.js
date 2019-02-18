'use strict';

const Model = use('Model');
/**
 * Occurrence
 */
class Occurrence extends Model {
    user () {
        return this.hasOne('App/Models/User');
    }
}

module.exports = Occurrence;
