'use strict';

const webpack = require('webpack');
const path = require('path');

module.exports = {

    entry: './src/game.js',

    output: {
        path: path.resolve(__dirname, 'build'),
        publicPath: '/build/',
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
        ignored: ['assets/*.js', 'node_modules'],
        poll: 100,
      }

};