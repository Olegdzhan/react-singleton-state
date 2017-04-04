var merge = require('webpack-merge');
var common = require('./webpack.common');
var helpers = require('./helpers');

module.exports = merge(common, {

    output: {
        library: 'Singleton',
        libraryTarget: 'umd'
    },

    devServer: {
        path: helpers.root('/public'),
        publicPath: '/',
        filename: '[name].js',
        contentBase: "./public"
    },

    devtool: 'cheap-module-eval-source-map',

    watch: true,

    watchOptions: {
        aggregateTimeout: 100
    }

});
