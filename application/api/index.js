import bodyParser from 'body-parser';

import v1 from './v1';

export default (application)=> {
    application.api = {};
    
    application.express.use(bodyParser.json());
    v1(application);
};