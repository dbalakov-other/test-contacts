import jwt from 'jsonwebtoken';

import Config from 'config';
import DAO from 'dao';

import ApiError from '../../error';
import ApiResponse from '../../response';

const config = new Config();

class Environment {
    constructor(request, response) {
        this.request = request;
        this.response = response;
        
        this.ApiError = ApiError;
        this.ApiResponse = ApiResponse;
        this.jwt = jwt;
        
        this.config = config;
        this.dao = new DAO(this.config.db);
        this.data = {};
    }
}

export default Environment;