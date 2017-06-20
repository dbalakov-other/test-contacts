export default (application, namespace)=> {
    application.express.post(`${namespace}`, (request, response)=> {
        application.api.v1.methods.contacts.create(request, response, RULES);
    });
};

const RULES = {
    name: { type: 'string', context: 'body', isDefined: true },
    surname: { type: 'string', context: 'body', isDefined: true },
};