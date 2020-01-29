const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlBeautifyPlugin = require('html-beautify-webpack-plugin');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');


const PATHS = {
    src: './src',
    dist: './dist'
};
const pages_dir = `${PATHS.src}\\pug\\pages\\`;
const pages = fs.readdirSync(pages_dir).filter(fileName => fileName.endsWith('.pug'));

module.exports = {
    mode: 'production',
    entry: './src/app.js',
    output: {
        filename: 'js/bundle.min.js'
    },
    module: {
        rules: [
            {
                test: /\.(sass|scss)$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader', 'import-glob-loader']
            },
            {
                test: /\.pug$/,
                loader: 'pug-loader'
            },
            {
                test: /\.m?js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '/css/[name].min.css',
        }),
        ...pages.map(page => new HtmlWebpackPlugin({
            template: `${pages_dir}/${page}`,
            filename: `./${page.replace(/\.pug/,'.html')}`,
            minify: false
        })),
        new HtmlBeautifyPlugin({
            config: {
                html: {
                    end_with_newline: true,
                    indent_size: 4,
                    indent_with_tabs: false,
                    indent_inner_html: true,
                    preserve_newlines: true,
                    unformatted: ['p', 'i', 'b', 'span']
                }
            },
            replace: [ ' type="text/javascript"' ]
        })
    ]
};
