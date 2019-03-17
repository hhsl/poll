<template>
    <div class="c-input-group">
        <input v-model="newPollTitle" placeholder="title" />
        <button @click="onNewPoll()">create new poll</button>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import POLL_ADD from '@/graphql/PollAdd.gql';

import { User } from '@/components/admin/types';
import { Poll } from '@/services/poll.types';

@Component({})
export default class NewPoll extends Vue {
    @Prop() private user!: User;

    private newPollTitle: string = '';

    private async onNewPoll() {
        return await this.$apollo.mutate({
            mutation: POLL_ADD,
            variables: {
                title: this.newPollTitle,
                id: this.user.id
            }
        });
    }
}
</script>

<style lang="scss">
.c-input-group {
    display: flex;
    justify-content: center;
    padding: 12px;
}

input,
button {
    padding: 12px;
    margin: 0;
    border: 0;
    box-shadow: 0px 4px 10px -4px rgba(0,0,0, 0.25);
}

input {
    width: 100%;
    max-width: 550px;
    font-size: 22px;
    border-radius: 12px;
    border: 1px solid lightblue;
    margin-right: 12px;
}

button {
    background: blue;
    font-size: 16px;
    color: aquamarine;
    font-weight: bold;
    border-radius: 12px;
    width: 100px;
    cursor: pointer;
}
</style>

