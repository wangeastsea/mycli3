const configs = require('./config')
const merge = require('webpack-merge')
const cfg = process.env.NODE_ENV === 'production' ? configs.build.env : configs.dev.env
const utils = require('./build/utils')
module.exports = {
    // 二级目录
    baseUrl: '/wangdonghai',
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
