'use strict';
const View    = use('View');
const Contact = use('App/Models/Contact');
const Cache   = use('Cache');
class HomeController {


    async index(){
        return await Cache.remember('welcome', 1, async() => {
            return View.render('welcome');
        });

    }

    /**
     *
     * @param request
     * @param response
     * @returns {*}
     */
    async contact({request, response}){

        let data = request.only([
            'email',
            'message',
            'name',
            'phone',
            'subject'
        ]);
        const contact = await Contact.create(data);
        return response.json(contact);

    }
}

module.exports = HomeController;
