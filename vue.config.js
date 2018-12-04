const configs = require('./config')
const merge = require('webpack-merge')
const cfg = process.env.NODE_ENV === 'production' ? configs.build.env : configs.dev.env
const utils = require('./build/utils')
const isPro = process.env.NODE_ENV === 'production'
const { DefinePlugin } = require('webpack')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
module.exports = {
    // 二级目录
    baseUrl: 'vue',
    // 打包输出目录
    outputDir: 'output',
    // 配置项用于设置是否为生产环境构建生成 source map
    productionSourceMap: true,
    chainWebpack: config => {
        config.plugin('define')
            .tap(args => {
                let name = 'process.env'
                console.log("###########")
                console.log(args)
                console.log(cfg)
                args[0][name] = merge(args[0][name], cfg)
                // console.log(args)
                return args
            })
    },
    // 但是需要注意的是对于在样式及 html 模板中引用路径的简写时，前面需要加上 ～ 符，否则路径解析会失败
    // chainWebpack: config => {
    //     config.resolve.alias
    //         .set('@', resolve('src'))
    //         .set('_lib', resolve('src/common'))
    //         .set('_com', resolve('src/components'))
    //         .set('_img', resolve('src/images'))
    //         .set('_ser', resolve('src/services'))
    // },
    configureWebpack: config => {
        if (isPro) {
            return {
                plugins: [
                    new CompressionWebpackPlugin({
                        // 目标文件名称。[path] 被替换为原始文件的路径和 [query] 查询
                        // 如果是1.X的版本，那么参数如你所写不会出现什么问题。如果是2.x的版本，那么参数 asset必须换成 filename
                        filename: '[path].gz[query]',
                        // 使用 gzip 压缩
                        algorithm: 'gzip',
                        // 处理与此正则相匹配的所有文件
                        test: new RegExp(
                            '\\.(js|css)$'
                        ),
                        // 只处理大于此大小的文件
                        threshold: 10240,
                        // 最小压缩比达到 0.8 时才会被压缩
                        minRatio: 0.8
                    })
                ]
            }
        }
    },
    // 多页应用配置
    // configureWebpack: config => {
    //     config.entry = utils.getEntries()
    //     // 使用 return 一个对象会通过 webpack-merge 进行合并，plugins 不会置空
    //     return {
    //         plugins: [...utils.htmlPlugin()]
    //     }
    // },
    // pages多页设置
    pages: utils.setPages(),
    // 开发模式下启动本地服务
    devServer: {
        open: true,
        port: 8081,
        https: false,
        proxy: {
            '/repos': {
                target: 'https://api.github.com',
                changeOrigin: true,
                // pathRewrite: {'^api': ''}
            }
        }
    }
}
// env.[mode].local > .env.[mode] > .env.local > .env
console.log(process.env.NODE_ENV)
