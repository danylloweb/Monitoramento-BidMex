'use strict'

const User = use('App/Models/User')

/**
 * AuthController
 */
class AuthController {

    /**
     * register user
     * @param request
     * @param response
     */
    async register({request, response }) {
        const data = request.only(['username','email','password'])
        const user  = await User.create(data);
        return response.json(user);

    }

    /**
     * authenticate Jwt
     * @param request
     * @param response
     * @param auth
     * @returns {void|*|{limit, strict, types}}
     */
    async authenticate({request, response, auth}){
        const {email, password} = request.all();
        const token = await auth.attempt(email,password);
        return response.json(token);
    }
}

module.exports = AuthController;
