var merge = require('webpack-merge');
var common = require('./webpack.common');

module.exports = merge(common, {

    devtool: 'cheap-module-eval-source-map',

    watch: true,

    watchOptions: {
        aggregateTimeout: 100
    },

    resolve: {
        modules: ['node_modules'],
        extensions: ['.js']
    },

    resolveLoader: {
        modules: ['node_modules'],
        moduleExtensions: ['-loader'],
        extensions: ['.js']
    },

    module: {
        rules: [{
            test: /\.js$/,
            loader: 'babel-loader',
            query: {
                presets: ['es2017']
            }
        }]
    }

});
