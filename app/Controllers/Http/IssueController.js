'use strict';

const Issue = use('App/Models/Issue');


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
    async index({request, response}) {
        const page = await this.getPage(request.get('page'));
        const issues = await Issue.query()
            .orderBy('create_at', 'desc')
            .paginate(page.page, 10);
        return response.json(issues);
    }

    /**
     * issuesByEmission
     * @param request
     * @param response
     * @returns {*|{limit, strict, types}|void}
     */
    async issuesByEmission({request, response}) {
        const page = await this.getPage(request.get('page'));
        const emission_id = request.get('emission_id');
        const issues = await Issue.query()
            .orderBy('create_at', 'desc')
            .where('emission_id', '=', emission_id.emission_id)
            .paginate(page, 50);
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

    /**
     * getPage
     * @param pageRequest
     * @returns {*}
     */
    async getPage(pageRequest = false){
        return pageRequest.page ? pageRequest.page : 1;
    }
}



module.exports = IssueController;
