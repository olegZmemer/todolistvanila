const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
module.exports = {
    entry: {
        app: ['babel-polyfill', './src/app.js']
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'assets/js/[name].js',
        publicPath: './'
    },
    devServer: {
        contentBase: './dist',
        overlay: true
    },
    plugins: [
        new htmlWebpackPlugin({
            filename: './index.html',
            template: './src/index.html'
        }),
        new MiniCssExtractPlugin({
            filename: 'assets/css/[name].css',
        }),
        new CopyWebpackPlugin([{
                from: `./src/img`,
                to: `assets/img`
            },
            {
                from: `./src/static`,
                to: ''
            },
        ])
    ],
    module: {
        rules: [{
                test: /\.js$/,
                exclude: /(node_modules|bower-components)/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]'
                }
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    }, {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true,
                            config: {
                                path: `./src/js/config/postcss.config.js`
                            }
                        }
                    }
                ]
            }
        ]
    }
}