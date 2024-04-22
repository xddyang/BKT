const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = (env) => {
    const isDevelopment = env && env.WEBPACK_SERVE || false;

    return {
        mode: isDevelopment ? 'development' : 'production',
        entry: './main.js',
        output: {
            path: path.resolve(__dirname, 'dist'),
        },
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env', '@babel/preset-react'],
                            cacheDirectory: true // 开启babel-loader缓存
                        }
                    }
                },
                {
                    test: /\.less$/i,
                    use: [
                        'style-loader',
                        'css-loader',
                        'less-loader',
                    ],
                },
                {
                    test: /\.css$/,
                    use: [
                        'style-loader',
                        'css-loader',
                    ]
                }
            ]
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: './public/index.html' // 指定HTML模板文件
            }),
            new webpack.HotModuleReplacementPlugin()
        ],
        devtool: isDevelopment ? 'eval-source-map' : false, // 开发环境错误定位转换
        devServer: {
            static: {
                directory: path.join(__dirname, 'dist'),
            },
            compress: true,
            port: 9000,
            hot: true,
            historyApiFallback: true    // 兼容BrowserRouter
        }
    };
};


