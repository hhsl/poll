import './class-component-hooks';
import Vue from 'vue';
import router from '@/router';
import apolloProvider from '@/apollo';
import VueApollo from 'vue-apollo';
import VueRouter from 'vue-router';
import App from '@/App.vue';

Vue.use(VueRouter);
Vue.use(VueApollo);

new Vue({
    router,
    apolloProvider,
    render: (h) => h(App)
}).$mount('#app');
