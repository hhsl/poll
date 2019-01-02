<template>
  <div>
    <h2>Users:</h2>
    <input v-model="newUserName" placeholder="new UserName" />
    <button @click="addUser(newUserName)">add new user</button> {{newUserName}}
    <ul>
        <li v-for="user in User" :key="user.id">
            {{user.name}}
            <button @click="deleteUser(user.id)">delete</button>
        </li>
    </ul>
    {{ status }}
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import USERS from '@/graphql/Users.gql';
import USERS_SUBSCRIPTION from '@/graphql/UsersSubscription.gql';
import USER_ADD from '@/graphql/UserAdd.gql';
import USER_REMOVE from '@/graphql/UserRemove.gql';
import { User } from '@/components/admin/types';

@Component({})
export default class UserList extends Vue {
    private newUserName: string = '';
    private status: string = '';
    private User: User[] = [];

    public async mounted() {
        return await this.$apollo.addSmartQuery('User', {
            query: USERS,
            fetchPolicy: 'cache-and-network',
            subscribeToMore: {
                document: USERS_SUBSCRIPTION,
                updateQuery: (prevResult, { subscriptionData }) => {
                    return {
                        User: [...subscriptionData.data.User]
                    };
                }
            }
        });
    }

    public async addUser(userName: string) {
        const response = await this.$apollo.mutate({
            mutation: USER_ADD,
            variables: {
                userName
            }
        });

        if (response.data.insert_User.affected_rows === 0) {
            this.status = 'Adding user failed';
        } else {
            this.status = 'Adding user successfull';
        }
    }

    public async deleteUser(id: string) {
        const response = await this.$apollo.mutate({
            mutation: USER_REMOVE,
            variables: {
                id
            }
        });

        if (response.data.delete_User.affected_rows === 0) {
            this.status = 'This user is already deleted';
        } else {
            this.status = 'User succesfully deleted';
        }
    }
}
</script>

