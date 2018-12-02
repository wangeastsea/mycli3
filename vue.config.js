const configs = require('./config')
const merge = require('webpack-merge')
const cfg = process.env.NODE_ENV === 'production' ? configs.build.env : configs.dev.env
module.exports = {
    baseUrl: '/',
    outputDir: 'output',
    productionSourceMap: true,
    chainWebpack: config => {
        config.plugin('define')
            .tap(args => {
                let name = 'process.env'
                // console.log("###########c")
                // console.log(args)
                // console.log(cfg)
                args[0][name] = merge(args[0][name], cfg)
                // console.log(args)
                return args
            })
    },
    devServer: {
        open: true,
        port: 8081,
        https: false,
        proxy: null
    }
}
console.log(process.env)
