import Vue from 'vue';
import VueRouter from 'vue-router';
import UserList from '@/components/UserList.component.vue';
import Home from '@/components/Home.vue';

const routes = [
    { path: '/admin', component: UserList },
    { path: '/', component: Home }
];

Vue.use(VueRouter);

export default new VueRouter({
    mode: 'history',
    routes
});
