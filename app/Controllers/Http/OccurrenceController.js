'use strict';

const Occurrence = use('App/Models/Occurrence');

class OccurrenceController {
    /**
     * index
     * @param request
     * @param response
     * @returns {Object|*|{total, perPage, page, lastPage, data}|Serializer}
     */
    async index({request, response}) {
        const page   = await this.getPage(request.get('page'));
        const limit  = await this.getLimit(request.get('limit'));
        const issues = await Occurrence.query()
            .orderBy('create_at', 'desc')
            .paginate(page,limit);
        return response.json(issues);
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
                'author',
                'system',
                'type',
                'description',
                'status',
                'body'
            ]);
            const occurrence = await Occurrence.create(data);
            return response.json(occurrence);
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

module.exports = OccurrenceController;
