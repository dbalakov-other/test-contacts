import path from 'path';

export default {
    entry: [
        'whatwg-fetch',
        'babel-polyfill',
        path.join(process.cwd(), 'application', 'assets', 'index.js')
    ],
    module: {
        loaders: [
            { test: /\.less$/, loader: 'style!css!less' },
            { test: /\.js?$/, exclude: /node_modules/, loader: 'babel-loader', query: { presets: [ 'es2015', 'react', 'stage-0' ] } }
        ]
    },
    output: {
        path: '/',
        filename: 'index.js',
        publicPath: '/assets/'
    },
    resolve: {
        modules: [
            path.join(process.cwd(), 'node_modules'),
            path.join(process.cwd(), 'application', 'assets')
        ]
    }
};