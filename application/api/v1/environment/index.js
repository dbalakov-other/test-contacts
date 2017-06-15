import ApiError from '../../error';
import ApiResponse from '../../response';

class Environment {
    constructor(request, response) {
        this.request = request;
        this.response = response;
        
        this.ApiError = ApiError;
        this.ApiResponse = ApiResponse;
    }
}

export default Environment;