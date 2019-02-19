<template>
    <div>
        <h1>
            Hi welcome to the new poll app
        </h1>

        <div v-if="User">
            <h2>
                yes its awesome!
            </h2>
            {{User.name}} please create new poll
        </div>
        <div v-else>
            <h2>
                first you need to create a new user
            </h2>
            <CreateUser></CreateUser>
        </div>

        <p v-if="status" class="status">
            {{ status }}
        </p>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { User } from '@/components/admin/types';
import USER_GET from '@/graphql/UserGet.gql';
import CreateUser, { LOCAL_STORAGE_USERID } from '@/components/user/CreateUser.vue';

@Component({
    components: {
        CreateUser
    }
})
export default class AppHome extends Vue {
    private User: User | null = null;
    private status: string = '';

    get apollo() {
        return {
            User() {
                return {
                    query: USER_GET,
                    variables: {
                        id: localStorage.getItem(LOCAL_STORAGE_USERID)
                    },
                    update({ User }: any) {
                        return User[0];
                    }
                };
            }
        };
    }
}
</script>
