<template>
    <div>
        <input v-model="username" placeholder="your username" />
        <button v-on:click="createUser()">create</button>
        {{ error }}
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import USER_ADD from '@/graphql/UserAdd.gql';
import USER_GET from '@/graphql/UserGet.gql';
import { User } from '@/components/admin/types';

export const LOCAL_STORAGE_USERID: string = 'userid';

@Component({})
export default class CreateUser extends Vue {
    private username: string = '';
    private error: string = '';

    private async createUser() {
        const response = await this.$apollo.mutate({
            mutation: USER_ADD,
            variables: {
                username: this.username
            },
            update: (store, { data: { insert_User } }) => {
                const newUser: User = insert_User.returning[0];
                localStorage.setItem(LOCAL_STORAGE_USERID, newUser.id);
                location.reload();
            },
        });

        if (response.errors) {
            this.error = 'Error: ' + response.errors;
        }
    }
}
</script>
