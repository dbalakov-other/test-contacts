import Config from 'config';
import Application from './application';

const application = new Application(new Config());

application.start().then(()=> {
    console.log('================================================================');
    console.log('Application contacts started');
    console.log(`http://localhost:${application.config.application.port}`);
    console.log('================================================================');
}).catch((e)=> {
    console.error(e);
});