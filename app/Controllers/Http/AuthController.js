'use strict';

const User = use('App/Models/User');

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
        const data = request.only(['username','email','password']);
        const user = await User.create(data);
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

    /**
     * revokeToken
     * @param response
     * @param auth
     */
    async revokeToken ({response, auth}){
        const apiToken = auth.getAuthHeader();

        await auth
            .authenticator('jwt')
            .revokeTokens([apiToken]);
        return response.json({error: false, message: 'user unauthenticated'});
    }

    /**
     * revokeAllTokens
     * @param response
     * @param auth
     * @returns {*|{limit, strict, types}|void}
     */
    async revokeAllTokens({response, auth}){
        await auth
            .authenticator('jwt')
            .revokeTokens();
        return response.json({error: false, message: 'all users unauthenticated'});
    }

    /**
     * logout
     * @param auth
     */
    async logout({auth}) {

        const user = await auth.getUser();
        try {
            await auth
                .authenticator('jwt')
                .revokeTokensForUser(user);
            return response.json({error: false, message: 'user unauthenticated'});
        } catch (error) {
            return response.json({error: false, message: 'unauthenticated'});
        }
    }
}

module.exports = AuthController;
