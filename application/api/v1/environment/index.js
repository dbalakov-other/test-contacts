import Config from 'config';
import DAO from 'dao';

import ApiError from '../../error';
import ApiResponse from '../../response';
import JWT from './jwt';

const config = new Config();

class Environment {
    constructor(request, response) {
        this.request = request;
        this.response = response;
        
        this.ApiError = ApiError;
        this.ApiResponse = ApiResponse;
        
        this.config = config;
        this.dao = new DAO(this.config.db);
        this.jwt = new JWT(config.application.jwt_secret);
        this.data = {};
    }
    
    user() {
        const token = this.request.get('Authorization');
        
        return this.jwt.verify(token).then(({ user })=> (user)).catch(()=> {
            throw new ApiError(400, { error: 'Invalid token' });
        });
    }
}

export default Environment;