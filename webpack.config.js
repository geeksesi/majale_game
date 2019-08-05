'use strict';

const webpack = require('webpack');
const path = require('path');

// require('@babel/runtime/core-js/promise').default = require('bluebird');

// const promise = new Promise;

module.exports = {

    entry: {
      game : './client/src/game.js',
      admin : './admin/app.js'
    },

    output: {
        path: path.resolve(__dirname, 'public_html/build'),
        publicPath: '/public_html/build/',
        filename: '[name].bundle.js'
    },

    module: {
      rules: [
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              presets: ['@babel/preset-stage-1'],
              presets: ['@babel/preset-react'],
              plugins: ["@babel/plugin-transform-runtime"],
            }
          }
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
      },


};
