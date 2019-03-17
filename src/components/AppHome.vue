<template>
    <div v-if="user">
        <h2>
            {{user.name}}, please create a new poll
        </h2>
        <NewPoll :user="user"></NewPoll>
        <PollList :user="user"></PollList>
    </div>
    <CreateUser v-else></CreateUser>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { User } from '@/components/admin/types';
import USER_GET from '@/graphql/UserGet.gql';
import CreateUser, { LOCAL_STORAGE_USERID } from '@/components/user/CreateUser.vue';
import NewPoll from '@/components/poll/NewPoll.vue';
import PollList from '@/components/poll/PollList.vue';

@Component({
    components: {
        CreateUser,
        NewPoll,
        PollList
    }
})
export default class AppHome extends Vue {
    private user: User | null = null;

    get apollo() {
        return {
            user: {
                query: USER_GET,
                variables: {
                    id: localStorage.getItem(LOCAL_STORAGE_USERID)
                },
                update(data: any) {
                    return data.User[0];
                },
                skip() {
                    return !localStorage.getItem(LOCAL_STORAGE_USERID);
                }
            }
        };
    }
}
</script>
