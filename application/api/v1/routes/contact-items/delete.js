export default (application, namespace)=> {
    application.express.delete(`${namespace}`, (request, response)=> {
        application.api.v1.methods.contactItems.delete(request, response, RULES);
    });
};

const RULES = {
    id: { type: 'integer', context: 'body', isDefined: true }
};