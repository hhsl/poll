<template>
  <div>
    <h2>Users:</h2>
    <ul>
        <li v-for="user in User" :key="user.id">
            {{user.name}}
            <button @click="onRemoveUser(user.id)">delete</button>
        </li>
    </ul>
    <p v-if="status" class="status">
        {{ status }}
    </p>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import USERS_GET from '@/graphql/UsersGet.gql';
import USERS_SUBSCRIPTION from '@/graphql/UsersSubscription.gql';
import { User } from '@/components/admin/types';
import UserService from '@/services/user.service';


@Component({})
export default class UserList extends Vue {
    private newUserName: string = '';
    private status: string = '';
    private User: User[] = [];
    private userService!: UserService;

    public async mounted() {
        this.userService = new UserService(this.$apollo);

        return await this.$apollo.addSmartQuery('User', {
            query: USERS_GET,
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

    public async onRemoveUser(id: string) {
        const response = await this.userService.remove(id);

        if (response.data.delete_User.affected_rows === 0) {
            this.status = 'This user is already deleted';
        } else {
            this.status = 'User succesfully deleted';
        }
    }
}
</script>

