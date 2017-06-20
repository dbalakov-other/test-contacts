import path from 'path';

import webpack from 'webpack';

export default {
    entry: [
        'whatwg-fetch',
        'babel-polyfill',
        path.join(process.cwd(), 'application', 'assets', 'index.js')
    ],
    module: {
        loaders: [
            { test: /\.js?$/, exclude: /node_modules/, loader: 'babel-loader', query: { presets: [ 'es2015', 'react', 'stage-0' ] } },
            { test: /\.css/, loader: 'style-loader!css-loader' },
            { test: /\.(woff2?|ttf|eot|svg)$/, loader: 'url-loader?limit=10000' },
            { test: /\.less$/, loader: 'style-loader!css-loader!less-loader' }
        ]
    },
    output: {
        path: path.join(process.cwd(), 'target', 'application', 'static', 'assets'),
        filename: 'index.js',
        publicPath: '/assets/'
    },
    resolve: {
        modules: [
            path.join(process.cwd(), 'node_modules'),
            path.join(process.cwd(), 'application', 'assets')
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        })
    ]
};