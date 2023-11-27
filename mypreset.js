module.exports = function mypreset() {
    return {
        plugins : [
            "@babel/plugin-transform-block-scoping",   // const, let => var
            "@babel/plugin-transform-arrow-functions",   // 화살표 함수 변환
            "@babel/plugin-transform-strict-mode",     // 엄격 모드
        ]
    }
}