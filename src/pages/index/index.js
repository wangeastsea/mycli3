import Vue from 'vue'
import App from './index.vue'
import router from './router'
import store from '@/store/'
import entryConfig from '@/common/entryConfig/'
import myLoading from '@/common/loading.js' 
import '_assets/iconfont/iconfont.css'
Vue.use(myLoading)
// 调用公共方法加载配置
entryConfig(Vue)

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
