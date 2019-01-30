var path = require('path');

module.exports = {
    entry: './src/UI/index.js',
    output: {
        path: path.resolve(__dirname, './src/CDN Resources/UI')
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.svg$/,
                use: {
                    loader: 'svg-url-loader',
                    options: {
                        noquotes: true
                    }
                }
            },
            {
                test: /\.(ttf|eot|woff|woff2)$/,
                use: {
                    loader: 'url-loader',
                },
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: {
                    loader: 'url-loader',
                },
            }
        ]
    }
};