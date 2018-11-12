'use strict';

const Issue    = use('App/Models/Issue');


/**
 * IssueController
 */
class IssueController {
    /**
     * index
     * @param request
     * @param response
     * @returns {Object|*|{total, perPage, page, lastPage, data}|Serializer}
     */
    async index({ request, response })
    {
        const page   = request.get('page') ? request.get('page') : 1;
        const issues = await Issue.query()
            .orderBy('create_at', 'desc')
            .paginate(page, 10);
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
                'name',
                'system',
                'type',
                'description',
                'description',
                'emission_id',
                'body',
                'company'
            ]);
            const issue = await Issue.create(data);
            return response.json(issue);
        }catch (erro){
            return response.json({error: true, message: 'Error na gravação'});
        }
    }
}


module.exports = IssueController;
