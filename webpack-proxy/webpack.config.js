const webpack = require('webpack');
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin'); // 압축 및 난독화

module.exports = {
    mode: 'production',

    /* 
        처음 로드하는 파일을 지정합니다.
        진입 파일은 단일 파일 또는 여러개의 파일로 지정이 가능하다
    */
    entry: [
        "./src/index.js",
    ],

    /* 
        번들링된 결과물의 출력 방법을 지정한다.
        publicPath 옵션에서는 웹서버에서 이용될 때 사용 경로이다.
    */
    output: {
        path: __dirname + "/public/dist/",
        filename: 'bundle.js', // 생성하는 파일명 지정
        publicPath: '/dist/'
    },

    // 모듈을 해석하는데 있어 영향을 미치는 옵션
    resolve: {
        // 지정된 절대경로로 임포트하기 위해 설정함
        modules: [
            path.join(__dirname, "src"),
            "node_modules"
        ],

        // 모듈을 처리하는데 사용해야 하는 확장에 관련된 배열 
        // extensions:[]
    },
    module: {
        rules: [{
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.html$/,
                loader: 'html-loader',
                options: {
                    minimize: true
                }
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
                test: /\.(ico|png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
                loader: 'url-loader',
                options: {
                    publicPath:'/dist/',
                    name: '[hash].[ext]',
                    limit: 10000,
                } 
            }
        ]
    },

    /* 
        이 옵션은 프로젝트 내부에서 사용하는 다양한 유형의 모듈을 수행하는
        방법을 지정한다. 특히 로더에 대해 설정을 많이한다.
    */
    plugins: [
        new UglifyJsPlugin(),
        new webpack.EnvironmentPlugin(['NODE_ENV']), // 요즘은 위의 DefinePlugin보다 이렇게 하는 추세입니다.
    ]
}