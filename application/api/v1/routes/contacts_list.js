export default (application, namespace)=> {
    application.express.get(`${namespace}contacts_list`, (request, response)=> {
        application.api.v1.methods.contacts.list(request, response, RULES);
    });
};

const RULES = {
    offset: { type: 'integer', context: 'query' },
    limit: { type: 'integer', context: 'query' }
};