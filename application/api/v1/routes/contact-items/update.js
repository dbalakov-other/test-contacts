export default (application, namespace)=> {
    application.express.put(`${namespace}`, (request, response)=> {
        application.api.v1.methods.contactItems.update(request, response, RULES);
    });
};

const RULES = {
    id: { type: 'integer', context: 'body', isDefined: true },
    type: { type: 'string', context: 'body', isDefined: true },
    text: { type: 'string', context: 'body', isDefined: true }
};