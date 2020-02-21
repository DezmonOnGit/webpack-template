//dev config

const webpack = require('webpack');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.config.js');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

const devWebpackConfig = merge(baseWebpackConfig, {
    mode: 'development',
    // devServer: {
    //     contentBase: baseWebpackConfig.externals.paths.src + '/pug/',
    //     watchContentBase: true,
    //     watchOptions: {
    //         aggregateTimeout: 300,
    //         // poll: 1000,
    //         // ignored: ['../src/**/*.sass', 'node_modules'],
    //     },
    //     hot: true,
    //     open: true,
    //     overlay: {
    //         warnings: true,
    //         errors: true
    //     }
    // },
    module: {
        rules: [
            {
                test: /\.(sass|scss)$/,
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                        options: { sourceMap: true }
                    },
                    {
                        loader: 'sass-loader',
                        options: { sourceMap: true }
                    },
                    {
                        loader: 'import-glob-loader',
                        options: { sourceMap: true }
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.SourceMapDevToolPlugin({
            filename: '[file].map'
        }),
        // new BrowserSyncPlugin({
        //   // browse to http://localhost:3000/ during development,
        //   // ./public directory is being served
        //   host: 'localhost',
        //   port: 3000,
        //   server: { baseDir: ['dist'] }
        // })
    ]
})

module.exports = devWebpackConfig
