export default (application, namespace)=> {
    application.express.put(`${namespace}`, (request, response)=> {
        application.api.v1.methods.contacts.update(request, response, RULES);
    });
};

const RULES = {
    id: { type: 'integer', context: 'body', isDefined: true },
    name: { type: 'string', context: 'body', isDefined: true },
    surname: { type: 'string', context: 'body', isDefined: true }
};