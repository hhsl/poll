import Vue from 'vue';
import VueRouter from 'vue-router';
import AppAdmin from '@/components/AppAdmin.vue';
import AppHome from '@/components/AppHome.vue';

const routes = [
    { path: '/admin', component: AppAdmin },
    { path: '/', component: AppHome }
];

Vue.use(VueRouter);

export default new VueRouter({
    mode: 'history',
    routes
});
