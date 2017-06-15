import v1 from './v1';

export default (application)=> {
    application.api = {};
    
    v1(application);
};