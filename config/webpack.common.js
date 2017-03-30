var helpers = require('./helpers');

module.exports = {

    entry: './lib/lib.js',

    output: {
        path: helpers.root('/bundle'),
        filename: 'index.js'
    }
};