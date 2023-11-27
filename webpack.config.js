const path = require('path')
const webpack = require('webpack'); 
const childProcess = require('child_process');

module.exports = {
    mode : 'development', 
    entry: {
        main: './src/app.js',
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
                    'style-loader',
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
                    publicPath: './dist/cnd-assets/',
                    outputPath: 'cnd-assets/',
                }
            }
        ]
    },
    plugins: [
        new webpack.BannerPlugin({
            banner: `
              Buiild Date: ${new Date().toLocaleString()}
              Author: ${childProcess.execSync('git config user.name')}
            `
        }),
        new webpack.DefinePlugin({
            TWO: "1+1", 
            STR_TWO: JSON.stringify("1+1"),
            VERSION: JSON.stringify("v1.2.3"),
            PRODUCTION: JSON.stringify(false),
            MAX_COUNT: JSON.stringify(999),
            "api_domain": JSON.stringify("https://dev.api.domain.com")
        })
    ],
}