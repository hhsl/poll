<template>
    <div>
        <h2>
           {{user.name}}, please create a new poll
        </h2>

        <div class="c-input-group">
            <input v-model="newPollTitle" placeholder="title" />
            <button @click="onNewPoll()">go</button>
        </div>

        <ApolloQuery
            :query="queryPollsGet"
            :variables="{ id: user.id }"
            >
            <ApolloSubscribeToMore
                :document="queryPollSub"
                :variables="{ id: user.id }"
                :updateQuery="onPollSub"
                />
            <template slot-scope="{ result: { loading, error, data } }">
                <div v-if="loading" class="loading apollo">Loading...</div>
                <div v-else-if="error" class="error apollo">An error occured</div>
                <div v-else-if="data" class="result apollo">
                    <h3>
                        or visit your other polls
                    </h3>
                    <ul>
                        <li v-for="poll in data.Poll" :key="poll.id">
                            <router-link :to="'/poll/' + poll.id">
                                {{poll.title}}
                            </router-link>
                        </li>
                    </ul>
                </div>
                <div v-else class="no-result apollo">No result :(</div>
            </template>
        </ApolloQuery>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import POLL_ADD from '@/graphql/PollAdd.gql';
import POLLS_GET from '@/graphql/PollsGet.gql';
import POLL_SUBSCRIPTION from '@/graphql/PollSubscription.gql';
import { User } from '@/components/admin/types';
import {SubscriptionResult} from '@/components/types';
import { Poll } from '@/services/poll.types';

@Component({})
export default class NewPoll extends Vue {
    @Prop() private user!: User;
    private queryPollsGet = POLLS_GET;
    private queryPollSub = POLL_SUBSCRIPTION;
    private newPollTitle: string = '';

    private onPollSub(prevResult: any, result: SubscriptionResult) {
        return {
            Poll: [...result.subscriptionData.data.Poll]
        };
    }

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

