import Vue from 'vue'
import App from './page2.vue'
import router from './router'
import store from '@/store/'
import entryConfig from '@/common/entryConfig/'

// 调用公共方法加载配置
entryConfig(Vue)

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
