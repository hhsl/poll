<template>
    <div>
        <h1>
             Hi welcome to the new poll app
        </h1>
        <h2>
            yes its awesome!
        </h2>
        <div v-if="!isLoggedIn">
            provide username:
            <input v-model="newUserName" placeholder="new UserName" />
            <button @click="onCreateUser(newUserName)">login</button>
        </div>
        <div v-else>
            user is logged in: {{ isLoggedIn }}
        </div>
        <p>
            {{ status }}
        </p>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { State, Action, Getter } from 'vuex-class';
import { UserState } from '@/store/modules/user/types';
import UserService from '@/services/user.service';
import { User } from '@/components/admin/types';
import { LOCAL_STORAGE_USERID } from '@/store/modules/user/mutations';

const namespace: string = 'user';

@Component({})
export default class AppHome extends Vue {
    @State('user') private userState!: UserState;
    @Action('login', { namespace }) private loginAction!: any;
    @Action('logout', { namespace }) private logoutAction!: any;

    private newUserName: string = '';
    private status: string = '';
    private userService!: UserService;

    public async mounted() {
        this.userService = new UserService(this.$apollo);

        const userId = localStorage.getItem(LOCAL_STORAGE_USERID);
        if (userId) {
            const user = await this.userService.get(userId);
            if (user.data.User.length !== 0) {
                this.loginAction(userId);
                this.status = `User ${user.data.User[0].name} logged in!`;
            } else {
                this.logoutAction();
                this.status = 'User not logged in!';
            }
        }
    }

    private async onCreateUser(username: string) {
        const response = await this.userService.add(username);

        if (response.data.insert_User.affected_rows === 0) {
            this.status = 'Adding user failed';
            return;
        }

        const insertedUser = response.data.insert_User.returning[0];
        const newUser = {
            id: insertedUser.id,
            name: insertedUser.name
        } as User;

        this.loginAction(newUser.id);
        this.status = `Added user ${newUser.name} successfully with id: ${newUser.id}`;
    }

    get isLoggedIn() {
        return this.userState.isLoggedIn;
    }
}
</script>
