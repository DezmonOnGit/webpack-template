//prod config

const webpack = require('webpack');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.config.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const buildWebpackConfig = merge(baseWebpackConfig, {
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.(sass|scss)$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: 'css-loader',
                        options: { sourceMap: true }
                    },
                    // {
                    //    loader: 'postcss-loader',
                    //    options: { sourceMap: true, config: { path: `${PATHS.config}/postcss.config.js` } }
                    // },
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
        new MiniCssExtractPlugin({
            filename: 'css/[name].min[contenthash].css',
        })
    ]
})

module.exports = buildWebpackConfig
