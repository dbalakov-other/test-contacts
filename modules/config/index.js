import fs from 'fs';
import path from 'path';

class Config {
    constructor() {
        this.env = process.env.NODE_ENV || ENV_DEVELOPMENT;

        this.readDirectory(path.join(__dirname, 'data', 'common'));
        this.readDirectory(path.join(__dirname, 'data', this.env));
    }

    readDirectory(path, obj) {
        if (!fs.existsSync(path)) { return; }

        const context = obj || this;
        fs.readdirSync(path).filter((file)=> { return file[0] !== '.'; }).forEach((file)=> {
            const pathString = path + '/' + file;

            if (fs.lstatSync(pathString).isDirectory()) {
                context[file] = context[file] || {};
                return this.readDirectory(pathString, context[file]);
            }

            if (fs.lstatSync(pathString).isFile()) {
                return context[file.slice(0, file.indexOf('.'))] = this.readFile(pathString);
            }
        });
    }

    readFile(path) {
        const result = require(path);
        if (result == null) { return result; }

        return result.default || result;
    }

    isProduction() {
        return this.env == ENV_PRODUCTION;
    }
}

const ENV_DEVELOPMENT = 'development';
const ENV_PRODUCTION = 'production';

export default Config;