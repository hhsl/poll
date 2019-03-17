<template>
    <div>
        <input type="text" v-model="newOptionTitle" placeholder="New Option Title" />
        <button v-on:click="onNewOptionTitle()">
            create
        </button>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import ADD_OPTION from '@/graphql/PollOptionAdd.gql';
import { UUID } from '@/components/poll/types';

@Component({})
export default class NewPollOption extends Vue {
    public newOptionTitle: string = '';
    @Prop() public pollId!: UUID;

    private async onNewOptionTitle() {
        return await this.$apollo.mutate({
            mutation: ADD_OPTION,
            variables: {
                poll_id: this.pollId,
                text: this.newOptionTitle
            }
        });
    }
}
</script>
