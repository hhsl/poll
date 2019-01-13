<template>
    <div id="app">
        <router-link to="/">
            home
        </router-link>
        <router-link to="/admin">
            admin
        </router-link>
        <router-link v-if="isLoggedIn" to="/new-poll">
            new poll
        </router-link>

        <router-view></router-view>
        <!-- <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/> -->
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from './components/HelloWorld.vue';
import { UserState } from '@/store/modules/user/types';
import { State } from 'vuex-class';

@Component({})
export default class App extends Vue {
    @State('user') private userState!: UserState;

    get isLoggedIn() {
        return this.userState.isLoggedIn;
    }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.status {
    border: 1px solid #888888;
    background-color: #eeeeee;
    padding: 1em 1.5em;
    position: absolute;
    bottom: 1em;
    left: 50%;
    transform: translateX(-50%);
}
</style>
