class MyWebpackPlugin {
    apply(compiler) {
        // compiler.hooks.done.tap('My Plugin', stats => {
        //     console.log('MyPlugin: done');
        // })

        compiler.hooks.emit.tap('My Plugin', (compilation) => {
            const source = compilation.assets['main.js'].source();
            
            const banner =[
                '/**',
                ' * 이것은 BannerPlugin이 처리한 결과입니다.',
                ' * Build Date: 2023-11-25',
                ' */'
            ].join('\n')
            compilation.updateAsset(
                'main.js',
                () => banner + '\n\n' + source
            );
        })
        
    }
}

module.exports = MyWebpackPlugin;