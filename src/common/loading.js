import LoadingComponent from '../components/loading.vue'

let $vm 

export default {
    install(Vue, options) {        
        if (!$vm) {            
            const LoadingPlugin = Vue.extend(LoadingComponent)
                        
            $vm = new LoadingPlugin({                
                el: document.createElement('div')            
            });            
            
            document.body.appendChild($vm.$el)      
        }        
        
        $vm.show = false       
        
        let loading = {            
            show(text) {                
                $vm.show = true;                
                $vm.text = text;            
            },            
            hide() {                
                $vm.show = false;            
            }        
        }       
        // 添加全局的方法
        if (!Vue.$loading) {            
            Vue.$loading = loading        
        }        
        
        // Vue.prototype.$loading = Vue.$loading;        
        // 添加组件选项
        Vue.mixin({            
            created() {                
                this.$loading = Vue.$loading       
            }        
        })    
    }
}