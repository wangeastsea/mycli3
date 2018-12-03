import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)
// require.ensure语法
// const Me = (resolve => {
//     require.ensure(['./views/me.vue'], () => {
//         resolve(require('./views/me.vue'))
//     })
// })
// import 语法
const Me = () => import('./views/me.vue')
export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [{
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/about',
            name: 'about',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import( /* webpackChunkName: "about" */ './views/About.vue')
        },
        {
            path: '/me',
            name: 'me',
            component: Me
        }
    ]
})
