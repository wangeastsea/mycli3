import Vue from 'vue'
import App from './page1.vue'
import router from './router'
import store from '@/store/'
import entryConfig from '@/common/entryConfig/'

// 调用公共方法加载配置
entryConfig(Vue)
if (process.env.NODE_ENV !== 'production') {
    Vue.config.performance = true
}
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
