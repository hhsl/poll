<template>
    <div id="app">
        <nav>
            <router-link v-if="user" to="/admin">
                admin
            </router-link>
        </nav>

        <h1>
            <router-link to="/">
                ref-a-rndm()
            </router-link>
        </h1>

        <div v-if="$apollo.loading">Loading...</div>
        <router-view class="wrapper" v-else></router-view>

        <Footer></Footer>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import USER_GET from '@/graphql/UserGet.gql';
import { User } from '@/components/admin/types';
import { UserId } from '@/services/user.types';
import CreateUser, { LOCAL_STORAGE_USERID } from '@/components/user/CreateUser.vue';
import Footer from '@/components/general/Footer.vue';

@Component({
    components: {
        CreateUser,
        Footer
    }
})
export default class App extends Vue {
    private user!: User;

    public mounted() {
        if (!this.user) {
            this.$router.replace({ name: 'home' });
        }
    }

    get apollo() {
        return {
            user: {
                query: USER_GET,
                variables: {
                    id: localStorage.getItem(LOCAL_STORAGE_USERID)
                },
                update(data: any) {
                    return data.User[0];
                }
            }
        };
    }
}
</script>

<style lang="scss">
html,
body {
    margin: 0;
    padding: 0;
    height: 100%;
    min-height: 100%;
    background: lightcyan;
}

#app {
    border-top: 6px solid blueviolet;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: darkblue;
    padding-top: 60px;
    position: relative;
    height: 100%;
    padding-bottom: 60px;
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

.wrapper {
    max-width: 900px;
    background: white;
    margin: 0 auto;
    height: 100%;
    padding: 12px;
}
</style>
