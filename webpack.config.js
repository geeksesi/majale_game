'use strict';

const webpack = require('webpack');
const path = require('path');

module.exports = {

    entry: './client/src/game.js',

    output: {
        path: path.resolve(__dirname, 'public_html/build'),
        publicPath: '/public_html/build/',
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
        ignored: ['public_html/assets/*.js', 'node_modules'],
        poll: 100,
      }

};
