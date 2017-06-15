import http from 'http';
import path from 'path';

import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import express from 'express';

import api from './api';

class Application {
    constructor(config) {
        this.config = config;
        this.express = express();
        this.server = http.createServer(this.express);
    }

    start() {
        this.initStatic();
        this.initAssets();
        this.initApi();

        return new Promise((resolve, reject)=> {
            this.server.listen(this.config.application.port, (error)=> {
                if (error) { return reject(error); }

                resolve();
            });
        });
    }

    initStatic() {
        this.express.use('/', express.static(path.join(__dirname, 'static')));
    }

    initAssets() {
        if (this.config.isProduction()) { return; }

        this.express.use(webpackDevMiddleware(webpack(this.config.webpack), WEBPACK_DEV_MIDDLEWARE_CONFIG));
    }

    initApi() {
        api(this);
    }
}

const WEBPACK_DEV_MIDDLEWARE_CONFIG = { publicPath: '/assets/', noInfo: true };

export default Application;