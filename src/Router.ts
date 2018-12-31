import VueRouter from 'vue-router';
import UserList from '@/components/UserList.component.vue';

const routes = [
    { path: '/user', component: UserList }
];

export const router = new VueRouter({
    mode: 'history',
    routes
});
