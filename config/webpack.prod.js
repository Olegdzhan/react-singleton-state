var webpack = require('webpack');
var merge = require('webpack-merge');
var common = require('./webpack.common');
var helpers = require('./helpers');

const ENV = process.env.NODE_ENV = process.env.ENV = 'production';

module.exports = merge(common, {

    devtool: 'source-map',

    output: {
        path: helpers.root('/public'),
        publicPath: '',
        filename: '[name].js',
        library: 'reactSingletonState',
        libraryTarget: 'umd'
    },

    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
        /*new webpack.optimize.UglifyJsPlugin({ // https://github.com/angular/angular/issues/10618
            mangle: {
                keep_fnames: true
            }
        }),*/
        new webpack.DefinePlugin({
            'process.env': {
                'ENV': JSON.stringify(ENV)
            }
        })
    ]


});