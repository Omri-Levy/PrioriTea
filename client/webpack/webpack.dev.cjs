const path = require('path'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    WebPackManifestPlugin = require('webpack-manifest-plugin'),
    FaviconsWebpackPlugin = require('favicons-webpack-plugin');

module.exports = {
    mode: 'development',
    devServer: {
        contentBase: path.resolve(__dirname, '../src'),
        historyApiFallback: true,
        open: true,
        compress: true,
        hot: true
    },
    entry: ['@babel/polyfill', path.resolve(__dirname,
        '../src/components/Index.jsx')],
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: '[name].bundle.js',
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../public/index.html')
        }),
        new WebPackManifestPlugin(),
        new FaviconsWebpackPlugin({
            logo: path.resolve(__dirname, '../public/logo.png'),
            favicons: path.resolve(__dirname, '../public/favicon.ico')
        })
    ],
    module: {
        rules: [
            {
                test: /\.html$/,
                exclude: /node_modules/,
                use: 'html-loader'
            },
            {
                test: /\.(js|jsx)$/,
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
                    'style-loader', //3
                    'css-loader', //2
                    'sass-loader' //1
                ]
            },
            {
                test: /\.(png|ico|svg|eot|ttf|woff|woff2)$/,
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
