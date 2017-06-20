export default (application, namespace)=> {
    application.express.get(`${namespace}search`, (request, response)=> {
        application.api.v1.methods.contacts.list(request, response, RULES);
    });
};

const RULES = {
    q: { type: 'string', context: 'query' },
    offset: { type: 'integer', context: 'query' },
    limit: { type: 'integer', context: 'query' }
};