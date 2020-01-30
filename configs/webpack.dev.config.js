//dev config

const webpack = require('webpack');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.config.js');

const devWebpackConfig = merge(baseWebpackConfig, {
    mode: 'development',
    // devtool: 'cheap-module-eval-source-map',
    // devServer: {
    //     contentBase: baseWebpackConfig.externals.paths.dist,
    //     overlay: {
    //         warnings: true,
    //         errors: true
    //     }
    // },
    plugins: [
        new webpack.SourceMapDevToolPlugin({
            filename: '[file].map'
        })
    ]
})

module.exports = devWebpackConfig
