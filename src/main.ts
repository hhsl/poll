import Vue from 'vue';
import App from './App.vue';
import VueApollo from 'vue-apollo';
import { apolloClient } from '@/ApolloClient';
import { router } from '@/Router';
import VueRouter from 'vue-router';

Vue.config.productionTip = false;

Vue.use(VueApollo);
Vue.use(VueRouter);

const apolloProvider = new VueApollo({
    defaultClient: apolloClient
});


new Vue({
    apolloProvider,
    router,
    render: (h) => h(App)
}).$mount('#app');
