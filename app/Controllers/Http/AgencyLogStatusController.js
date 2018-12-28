'use strict';
const AgencyLogStatus = use('App/Models/AgencyLogStatus');

/**
 * AgencyLogStatusController
 */
class AgencyLogStatusController {
    /**
     * index
     * @param request
     * @param response
     * @returns {Object|*|{total, perPage, page, lastPage, data}|Serializer}
     */
    async index({request, response}) {
        const page   = await this.getPage(request.get('page'));
        const limit  = await this.getLimit(request.get('limit'));
        const agencyLogStatus = await AgencyLogStatus.query()
            .orderBy('create_at', 'desc')
            .paginate(page,limit);
        return response.json(agencyLogStatus);
    }

    /**
     * store
     * @param request
     * @param response
     */
    async store({ request, response })
    {
        try {
            const data = request.only([
                'newStatus',
                'oldStatus',
                'author_id',
                'author_email',
                'agency_id',
                'agency_title'
            ]);
            const agencyLogStatus = await AgencyLogStatus.create(data);
            return response.json(agencyLogStatus);
        }catch (erro){
            return response.json({error: true, message: 'Error na gravação'});
        }
    }

    /**
     * getPage
     * @param pageRequest
     * @returns {*}
     */
    async getPage(pageRequest = false){
        return pageRequest.page ? pageRequest.page : 1;
    }

    /**
     * getLimit
     * @param limitRequest
     * @returns {*}
     */
    async getLimit(limitRequest = false){
        return limitRequest.limit ? limitRequest.limit : 15;
    }

}

module.exports = AgencyLogStatusController;
