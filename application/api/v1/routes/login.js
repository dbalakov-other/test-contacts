export default (application, namespace)=> {
    application.express.post(`${namespace}login`, (request, response)=> {
        application.api.v1.methods.users.signIn(request, response, RULES);
    });
};

const RULES = {
    email: { type: 'string', context: 'body', isDefined: true },
    password: { type: 'string', context: 'body', isDefined: true }
};