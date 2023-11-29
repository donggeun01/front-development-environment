module.exports = {
    presets: [ 
        [
            '@babel/preset-env', // ECMAScript 버전 호환
            { 
                targets: { 
                    chrome: '79',
                    ie: '11'
                },
                useBuiltIns: 'usage',    // 'entry', false
                corejs: {
                    version: 2,
                }
            }
        ]
    ]
}