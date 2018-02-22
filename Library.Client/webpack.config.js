/// <binding />
const ExtractTextPlugin = require('./my-app/node_modules/extract-text-webpack-plugin');
const webpack = require('./my-app/node_modules/webpack');
const HtmlWebpackPlugin = require('./my-app/node_modules/html-webpack-plugin');
const CleanWebpackPlugin = require('./my-app/node_modules/clean-webpack-plugin');
const path = require('path');

module.exports = {
    entry: {
        'polyfills': './my-app/src/polyfills.ts',
        'app': './my-app/src/main.ts',
        'vendor' : './my-app/src/vendor.ts'
    },
    devtool: 'cheap-module-eval-source-map',
    performance: {
        hints: false
    },
    resolve: {
        extensions: ['.ts', '.js', '.json'],
    },
    output: {
        path: path.join(__dirname, 'wwwroot'),
        filename: 'js/[name].bundle.js'
    },

    module: {
        rules: [
            {
                test: /\.ts$/,
                use: [
                    './my-app/node_modules/awesome-typescript-loader?configFileName=./my-app/tsconfig.json',
                    {
                        loader: './my-app/node_modules/ng-router-loader',
                        options: {}
                    },
                    './my-app/node_modules/angular-router-loader',
                    './my-app/node_modules/angular2-template-loader',
                    './my-app/node_modules/source-map-loader',
                    './my-app/node_modules/tslint-loader'
                ]
            },
            {
                test: /\.html$/,
                use: './my-app/node_modules/html-loader',
            },
            {
                test: /\.(png|jpg|gif|ico|woff|woff2|ttf|svg|eot)$/,
                use: './my-app/node_modules/file-loader?name=assets/[name].[ext]'
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "./my-app/node_modules/style-loader",
                    use: "./my-app/node_modules/css-loader"
                })
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('css/[name].bundle.css'),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: ['app', 'vendor', 'polyfills']
        }),
        new CleanWebpackPlugin(
            [
                './wwwroot/js/',
                './wwwroot/css/',
                './wwwroot/assets/',
                './wwwroot/index.html'
            ]
        ),
        new HtmlWebpackPlugin({
            template: './my-app/src/index.html',
            inject: 'body',
            filename: 'index.html'
        }),
        new webpack.ContextReplacementPlugin(
            /angular(\\|\/)core(\\|\/)@angular/,
            path.resolve(__dirname, '../src')
        ),
        new webpack.ProvidePlugin({
            jQuery: 'jquery',
            $: 'jquery',
            jquery: 'jquery'
        })
    ],
    devServer: {
        historyApiFallback: true,
        stats: 'minimal'
    }
};
