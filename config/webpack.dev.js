var merge = require('webpack-merge');
var common = require('./webpack.common');

module.exports = merge(common, {

    output: {
        library: 'Singleton',
        libraryTarget: 'umd'
    },

    devServer: {
        publicPath: "/",
        contentBase: "./public"
    },

    devtool: 'cheap-module-eval-source-map',

    watch: true,

    watchOptions: {
        aggregateTimeout: 100
    }

});
