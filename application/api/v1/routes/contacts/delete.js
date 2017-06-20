export default (application, namespace)=> {
    application.express.delete(`${namespace}`, (request, response)=> {
        application.api.v1.methods.contacts.delete(request, response, RULES);
    });
};

const RULES = {
    id: { type: 'integer', context: 'body', isDefined: true }
};