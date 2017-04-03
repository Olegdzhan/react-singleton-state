var helpers = require('./helpers');

var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {

    entry: {
        lib: './lib/lib.js',
        sample: './sample/main.js'
    },

    output: {
        path: helpers.root('/public'),
        publicPath: '/',
        filename: '[name].js',
    },

    resolve: {
        modules: ['node_modules', 'lib', 'sample/src'],
        extensions: ['.js']
    },

    resolveLoader: {
        modules: ['node_modules'],
        moduleExtensions: ['-loader'],
        extensions: ['.js']
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2017', 'react'],
                    plugins: ['transform-object-rest-spread', 'transform-class-properties']
                }
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
                loader: 'file-loader?name=assets/[name].[hash].[ext]'
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({ fallbackLoader: 'style-loader', loader: 'css-loader?sourceMap' })
            },
            {
                test: /\.css$/,
                loader: 'raw-loader'
            },
            {
                test: /\.styl$/,
                loader: 'style-loader!css-loader!stylus-loader'
            }
        ]
    },
    
    plugins: [
        new HtmlWebpackPlugin({
            template: 'sample/index.html',
            filename: 'index.html',
            title: 'React Singleton State Sample App'
        })
    ]

};