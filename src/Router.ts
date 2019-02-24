import VueRouter from 'vue-router';

import AppAdmin from '@/components/AppAdmin.vue';
import AppHome from '@/components/AppHome.vue';
import AppPoll from '@/components/AppPoll.vue';

const routes = [
    {
        path: '/admin',
        component: AppAdmin
    },
    {
        path: '/',
        component: AppHome,
        name: 'home'
    },
    { path: '/poll/:pollId', component: AppPoll, props: true }
];



export default new VueRouter({
    mode: 'history',
    routes
});
