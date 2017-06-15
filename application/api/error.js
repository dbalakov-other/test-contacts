class ApiError extends Error {
    constructor(code, message) {
        super(message);

        this.httpCode = code;
        this.httpMessage = message;
    }
}

export default ApiError;