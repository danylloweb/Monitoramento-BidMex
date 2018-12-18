'use strict';
const client       = use('request-promise');
const JiraClient   = use('jira-connector');
const Occurrence   = use('App/Models/Occurrence');
const Mail         = use('Mail');
const Env          = use('Env');
const url_buscador = Env.get('URL_API_GATEWAY_BUSCADOR', 'http://api.apigateway.test');

/**
 *
 */
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
            let user = await this.validateUser(request.header('authorization'));

            let userUtenticade ={
                'email': user.data.email,
                'programmer_id' : ''
            };

            let data = request.only([
                'system',
                'type',
                'title',
                'description',
                'status',
                'active_route'
            ]);
            data = {...data,...userUtenticade};

            const occurrence = await Occurrence.create(data);
            return response.json(occurrence);
        }catch (erro){
            return response.json({error: true, message: erro.message});
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

    /**
     * 
     * @param token
     * @returns {*}
     */
    async validateUser(token){
        return await client({
            method: 'get',
            url: url_buscador + '/manager/user/authenticated',
            headers: {
                Accept: 'application/json',
                Authorization: token
            },
            json: true
        });
    }

    /**
     *
     * @param data
     */
    async getJira(data){
        const jira = new JiraClient( {
            host: 'mangue3jira.atlassian.net',
            basic_auth: {
                base64: 'ZGFueWxsb2ZlcnJlaXJhQG1hbmd1ZTMuY29tOmdsZXl3c29uNzYyMg=='
            }
        });
        return jira.issue.getIssue({});
    }
}

module.exports = OccurrenceController;
