const path = require('path')
const webpack = require('webpack'); 
const childProcess = require('child_process');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode : 'development', 
    entry: {
        main: './app.js',
        // testBuild: './src/app.js'
    },
    output: {
        path: path.resolve('./dist/'),
        filename: '[name].js',
        assetModuleFilename: 'images/[hash][ext][query]'    // 출력 파일 이름을 변경함 (default: [hash][ext][query])
        // publicPath: './dist/'                            // 요청 시 앞에 붙힐 경로명
    },
    // loader - module.rules에 추가
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    // 여러개의 로더 설정 가능 (순서는 뒤에서 부터)
                    process.env.NODE_ENV === 'production' 
                      ? MiniCssExtractPlugin.loader // 프로덕션 환경 
                      : 'style-loader', // 개발 환경
                    'css-loader'
                ]
            },
            // {
            //     test: /\.(png|jpg|gif)$/,
            //     type: 'asset/resource',
            //     generator: {
            //         filename: '[name][ext]?[hash][query]',       // 파일 명
            //         publicPath: './dist/cnd-assets/',            // 요청 시 앞에 붙힐 경로명
            //         outputPath: 'cnd-assets/'                    // 파일 저장할 경로
            //     }
            // },
            // {
            //     test:  /\.(png|jpg|gif)$/,
            //     type: 'asset/inline',                            // 기본 인코딩이 base64로 변환됨 (테스트 결과 : svg만 가능)
            //     generator: {
            //         dataUrl: content => {                        // 인코딩 알고리즘 변경
            //             content = content.toString();
            //             return svgToMiniDataURI(content);        // base64 to mini-svg-data-uri
            //         }
            //     }
            // },
            {
                test: /\.(png|jpg|gif|svg)$/,
                type: 'asset',              // webpack4 버전에선 file-loader과 url-loader을 병행해서 사용한 것과 동일
                parser: {                   // 기본적으로 8kb 미만은 inline에서 처리 이상은 resource 
                    dataUrlCondition: { 
                      maxSize: 20 * 1024     // 4kb (inline 설정 값 변경, defaultValue : 8kb)
                    }
                },
                generator: {
                    filename: '[name][ext]?[hash][query]',
                    publicPath: './cnd-assets/',
                    outputPath: 'cnd-assets/',
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
            },
        ]
    },
    plugins: [
        // 빌드 된 결과물에 정보, 커밋 버전과 같은 것들을 추가할 수 있음
        new webpack.BannerPlugin({
            banner: `
              Buiild Date: ${new Date().toLocaleString()}
              Author: ${childProcess.execSync('git config user.name')}
            `
        }),
        // 개발환경, 운영환경에 맞게 나눠서 배포 가능, 전역 변수를 애플리케이션에 주입한다.
        new webpack.DefinePlugin({
            TWO: "1+1", 
            STR_TWO: JSON.stringify("1+1"),
            VERSION: JSON.stringify("v1.2.3"),
            PRODUCTION: JSON.stringify(false),
            MAX_COUNT: JSON.stringify(999),
            "api_domain": JSON.stringify("https://dev.api.domain.com")
        }),
        // HTML 후처리에 사용한다.
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            templateParameters: {
                temp: "(test)",
                env : process.env.NODE_ENV === 'development' ? '(개발용)' : '',
            },
            minify: process.env.NODE_ENV === 'production' ? {
                collapseWhitespace: true,   // 빈칸 제거
                removeComments: true,       // 주석 제거
            } : false,
            hash: true      // 정적 파일 부를 시 쿼리문자열에 웹팩 해쉬값 추가
        }),
        // 빌드 이전 결과물을 제거 후 빌드한다. (덮어쓰기가 되지 않는 결과물로 인한 문제 발생 해결)
        new CleanWebpackPlugin(),
        // CSS 파일을 JS 빌드파일에서 분리하여 별도의 CSS 빌드파일로 만듬 (로더도 추가 필요)
        ...( process.env.NODE_ENV === 'production' 
            ?
            [new MiniCssExtractPlugin({ filename: `[name].css` })] 
            : [] ),
    ],
}