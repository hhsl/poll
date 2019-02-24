<template>
    <div>
        <NewPoll v-if="user" :user="user"></NewPoll>
        <CreateUser v-else></CreateUser>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { User } from '@/components/admin/types';
import USER_GET from '@/graphql/UserGet.gql';
import CreateUser, { LOCAL_STORAGE_USERID } from '@/components/user/CreateUser.vue';
import NewPoll from '@/components/poll/NewPoll.vue';

@Component({
    components: {
        CreateUser,
        NewPoll
    }
})
export default class AppHome extends Vue {
    private user: User | null = null;

    get apollo() {
        return {
            user() {
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
