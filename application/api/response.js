class ApiResponse extends Error {
    constructor(code, message) {
        super(message);

        this.httpCode = code;
        this.httpMessage = message;
    }
}

export default ApiResponse;