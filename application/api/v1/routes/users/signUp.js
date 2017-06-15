export default (application, namespace)=> {
    application.express.post(namespace, (request, response)=> {
        application.api.methods.users.signUp(request, response, RULES);
    });
};

const RULES = {
    email: { type: 'string', context: 'query', isDefined: true },
    name: { type: 'string', context: 'query', isDefined: true },
    password: { type: 'string', context: 'query', isDefined: true },
    surname: { type: 'string', context: 'query', isDefined: true }
};