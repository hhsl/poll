<template>
    <div id="app">
        <router-link to="/">
            home
        </router-link>
        <router-link v-if="User" to="/admin">
            admin
        </router-link>
        <router-link v-if="User" to="/new-poll">
            new poll
        </router-link>

        <div v-if="$apollo.loading">Loading...</div>
        <router-view v-else></router-view>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import USER_GET from '@/graphql/UserGet.gql';
import { User } from '@/components/admin/types';
import { UserId } from '@/services/user.types';
import CreateUser, { LOCAL_STORAGE_USERID } from '@/components/user/CreateUser.vue';

@Component({
    components: {
        CreateUser
    }
})
export default class App extends Vue {
    private User!: User;

    public mounted() {
        if (!this.User) {
            this.$router.replace({ name: 'home' });
        }
    }

    get apollo() {
        return {
            User() {
                return {
                    query: USER_GET,
                    variables: {
                        id: localStorage.getItem(LOCAL_STORAGE_USERID)
                    },
                    update(data: any) {
                        return data.User[0];
                    }
                };
            }
        };
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
