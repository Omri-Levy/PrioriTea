const path = require('path'),
    {CleanWebpackPlugin} = require('clean-webpack-plugin'),
    MiniCssExtractPlugin = require('mini-css-extract-plugin'),
    OptimizeCssAssetsWebpackPlugin =
        require('optimize-css-assets-webpack-plugin'),
    TerserPlugin = require('terser-webpack-plugin'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    FaviconsWebpackPlugin = require('favicons-webpack-plugin'),
    RobotstxtPlugin = require('robotstxt-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: path.resolve(__dirname, '../src/Index.jsx'),
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: '[name].[contentHash].bundle.js'
    },
    optimization: {
        minimizer: [
            new OptimizeCssAssetsWebpackPlugin(),
            new TerserPlugin(),
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, '../public/index.html'),
                minify: {
                    removeAttributeQuotes: true,
                    collapseWhitespace: true,
                    removeComments: true
                }
            })
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].[contentHash].css'
        }),
        new FaviconsWebpackPlugin({
            logo: path.resolve(__dirname, '../public/logo.png'),
            favicons: path.resolve(__dirname, '../public/favicon.ico')
        }),
        new CleanWebpackPlugin(),
        new RobotstxtPlugin()
    ],
    module: {
        rules: [
            {
                exclude: /node_modules/,
                use: 'html-loader'
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                }
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: [
                    MiniCssExtractPlugin.loader, //3
                    'css-loader', //2
                    'sass-loader' //1
                ]
            },
            {
                test: /\.(png|ico|svg|eot|otf|ttf|woff|woff2)$/,
                exclude: /node_modules/,
                use: {
                    loader: "file-loader",
                    options: {
                        name: "[name].[hash].[ext]",
                        outputPath: "assets"
                    }
                }
            }
        ]
    }
}
