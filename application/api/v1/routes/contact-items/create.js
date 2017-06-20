export default (application, namespace)=> {
    application.express.post(`${namespace}`, (request, response)=> {
        application.api.v1.methods.contactItems.create(request, response, RULES);
    });
};

const RULES = {    
    contact: { type: 'integer', context: 'body', isDefined: true },
    type: { type: 'string', context: 'body', isDefined: true },
    text: { type: 'string', context: 'body', isDefined: true },
};