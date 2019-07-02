'use strict';

const webpack = require('webpack');
const path = require('path');

module.exports = {

    entry: './client/src/game.js',

    output: {
        path: path.resolve(__dirname, 'build'),
        publicPath: '/client/build/',
        filename: 'project.bundle.js'
    },

    module: {
        rules: [
          {
            test: [ /\.vert$/, /\.frag$/ ],
            use: 'raw-loader'
          }
        ]
    },

    plugins: [
        new webpack.DefinePlugin({
            'CANVAS_RENDERER': JSON.stringify(true),
            'WEBGL_RENDERER': JSON.stringify(true)
        })
    ],
    mode : 'development',
    watch: true,
    watchOptions: {
        ignored: ['client/assets/*.js', 'node_modules'],
        poll: 100,
      }

};
