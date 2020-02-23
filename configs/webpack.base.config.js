//base config

const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlBeautifyPlugin = require('html-beautify-webpack-plugin');


const PATHS = {
    src: path.join(__dirname, '../src'),
    dist: path.join(__dirname, '../dist')
};
const pages_dir = `${PATHS.src}/pug/pages/`;
const pages = fs.readdirSync(pages_dir).filter(fileName => fileName.endsWith('.pug'));

module.exports = {
    externals: {
        paths: PATHS
    },
    entry: `${PATHS.src}/app.js`,
    output: {
        filename: `js/[name].min.[hash].js`,
        path: PATHS.dist,
        publicPath: '/'
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          vendor: {
            name: "vendors",
            test: /node_modules/,
            chunks: "all",
            enforce: true
          }
        }
      }
    },
    module: {
        rules: [
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
