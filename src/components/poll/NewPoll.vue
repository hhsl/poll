<template>
    <div>
        <p>
            new poll headline please
        </p>
        <input v-model="newPollName">
        <button @click="onNewPoll()">go!</button>
        <p v-if="status" class="status">
            {{status}}
        </p>
        <ul>
            <li v-for="poll in Poll" :key="poll.id">
                <router-link :to="'/poll/' + poll.id">
                    {{poll.title}}
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import PollService from '@/services/poll.service';
import { State } from 'vuex-class';
import { UserState } from '@/store/modules/user/types';
import POLL_GET from '@/graphql/PollGet.gql';
import POLL_SUBSCRIPTION from '@/graphql/PollSubscription.gql';
import { Poll } from '@/services/poll.types';

@Component({})
export default class NewPoll extends Vue {
    @State('user') private userState!: UserState;
    private status: string = '';
    private newPollName: string = '';
    private pollService!: PollService;
    private Poll: Poll[] = [];

    public mounted() {
        this.pollService = new PollService(this.$apollo);
        this.addPollSubscription();
    }

    private addPollSubscription() {
        const id = this.userState.id;

        this.$apollo.addSmartQuery('Poll', {
            query: POLL_GET,
            variables() {
                return { id };
            },
            fetchPolicy: 'cache-and-network',
            subscribeToMore: {
                document: POLL_SUBSCRIPTION,
                variables() {
                    return { id };
                },
                updateQuery: (prevResult, { subscriptionData }) => {
                    return {
                        Poll: [...subscriptionData.data.Poll]
                    };
                }
            }
        });
    }

    private async onNewPoll() {
        if (!this.userState.id) {
            return;
        }

        const response = await this.pollService.create(this.newPollName, this.userState.id);

        if (response.data.insert_Poll.affected_rows !== 0) {
            this.status = 'New Poll Added';
        }
    }
}
</script>

