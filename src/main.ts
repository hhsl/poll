import Vue from 'vue';
import App from '@/App.vue';
import router from '@/router';
import apolloProvider from '@/apollo';
import './class-component-hooks';
import VueApollo from 'vue-apollo';
import VueRouter from 'vue-router';


Vue.config.productionTip = false;
Vue.use(VueRouter);
Vue.use(VueApollo);

new Vue({
    router,
    apolloProvider,
    render: (h) => h(App)
}).$mount('#app');
