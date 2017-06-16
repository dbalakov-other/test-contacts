import fs from 'fs';
import path from 'path';

import parse from '../parse';
import Environment from './environment';

export default (application)=> {
    application.api.v1 = {
        Environment,
        methods: {},
        routes: {}
    };
    readDirectory(path.join(__dirname, 'methods'), application.api.v1.methods, applyMethod);
    readDirectory(path.join(__dirname, 'routes'), application.api.v1.routes, applyRoute(application, '/api/'));
};

const readDirectory = (path, obj, map, namespace)=> {
    const context = obj || {};

    if (!fs.existsSync(path)) { return; }
    fs.readdirSync(path).filter((file)=> { return file[0] !== '.'; }).forEach((file)=> {
        const pathString = path + '/' + file;

        const dotIndex = file.indexOf('.');
        const namespacePart = dotIndex == -1 ? file : file.slice(0, dotIndex);
        const newNamespace = namespace ? `${namespace}/${namespacePart}` : namespacePart;
        
        if (fs.lstatSync(pathString).isDirectory()) {
            return readDirectory(pathString, context[file] = context[file] || {}, map, newNamespace);
        }

        if (fs.lstatSync(pathString).isFile()) {
            let r = require(pathString);
            r = r.default || r;
            return context[namespacePart] =  map ? map(r, namespace) : r;
        }
    });
};

const applyMethod = (method)=> {
    return (request, response, rules)=> {
        return Promise.resolve().then(()=> {
            const params = parse(request, rules);
            const environment = new Environment(request, response);
            
            return method(params, environment);
        }).then((result)=> {
            if (result === undefined) { return; }
            if (result.httpCode && result.httpMessage) { return response.status(result.httpCode).send(result.httpMessage); }

            response.status(200).send(result);
        }).catch((e)=> {
            if (e.httpCode && e.httpMessage) { return response.status(e.httpCode).send(e.httpMessage); }

            console.error(e.message);
            console.error(e.stack);
            response.status(500).send('Internal server error');
        });
    };
};

const applyRoute = (application, prefix)=> {
    return (route, namespace)=> (route(application, `${prefix}${namespace || ''}`));
};