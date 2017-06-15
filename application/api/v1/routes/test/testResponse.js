export default (application, namespace)=> {
    application.express.get(namespace, (request, response)=> {
        application.api.v1.methods.test.testResponse(request, response, RULES);
    });
};

const RULES = {
    param1: { type: 'string', context: 'query', isDefined: true }
};