const webpack = require('webpack');
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin'); // 압축 및 난독화

const port = process.env.PORT || 3000;

module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',

    entry: './src/index.js',

    output: {
        path: __dirname + "/public/dist/",
        filename: 'bundle.js',
        publicPath: '/dist/', // HMR 사용하려면 설정해야한다.  Hot reloading 은 중첩된 경로에서 동작하지 않는다.
    },

    devServer: {
        hot: true,
        open: true,
        host: 'localhost',
        historyApiFallback: true,
        contentBase: __dirname + '/public/', // 정적 파일 경로 설정 , node의 express.static 같은 것
        publicPath: '/dist/',
    },


    resolve: {
        // 지정된 절대경로로 임포트하기 위해 설정함
        modules: [
            path.join(__dirname, "src"), // classfield 사용을 위해 설정한다.
            "node_modules"
        ]
    },

    module: {
        rules: [
            {
                test: /\.(js)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                // 정적 자원을 import 구문을 이용해 코드로 로드할 수 있다.
                // 로드된 파일은 webpack에 의해 번들링 된다.
                // 번들링될 때 파일명에 MD5 해시 값을 적용할 수 있다.
                test: /\.(ico|png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'url-loader',
                options: {
                    publicPath: '/dist/',
                    name: '[hash].[ext]',
                    limit: 10000,
                }
            }

        ]
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.EnvironmentPlugin(['NODE_ENV']), // 요즘은 위의 DefinePlugin보다 이렇게 하는 추세입니다.
        new UglifyJsPlugin()
    ]
}