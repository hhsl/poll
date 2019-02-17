<template>
    <div>
        <h1>
            Hi welcome to the new poll app
        </h1>
        <h2>
            yes its awesome!
        </h2>
        <div v-if="user">
            {{user.name}} please create new poll
            <!-- <NewPoll></NewPoll> -->
        </div>
        <p v-if="status" class="status">
            {{ status }}
        </p>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { UserId } from '@/services/user.types';
import { User } from '@/components/admin/types';
import USER_GET from '@/graphql/UserGet.gql';

@Component({
    components: {
        // NewPoll
    }
})
export default class AppHome extends Vue {
    private userId!: UserId | null;
    @Prop() private user!: User;
    private status: string = '';

    constructor() {
        super();
    }
}
</script>
