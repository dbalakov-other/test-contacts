export default (application, namespace)=> {
    application.express.post(namespace, (request, response)=> {
        application.api.v1.methods.users.signUp(request, response, RULES);
    });
};

const RULES = {
    email: { type: 'string', context: 'body', isDefined: true },
    name: { type: 'string', context: 'body', isDefined: true },
    password: { type: 'string', context: 'body', isDefined: true },
    surname: { type: 'string', context: 'body', isDefined: true }
};