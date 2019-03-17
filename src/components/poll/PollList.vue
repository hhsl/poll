<template>
    <ApolloQuery
        :query="getAllPollsQuery"
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
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import POLLS_GET_ALL from '@/graphql/PollsGet.gql';
import NEW_POLL_SUBSCRIPTION from '@/graphql/PollSubscription.gql';
import {SubscriptionResult} from '@/components/types';
import { User } from '@/components/admin/types';

@Component({})
export default class PollList extends Vue {
    @Prop() private user!: User;

    private getAllPollsQuery = POLLS_GET_ALL;
    private queryPollSub = NEW_POLL_SUBSCRIPTION;

    private onPollSub(prevResult: any, result: SubscriptionResult) {
        return {
            Poll: [...result.subscriptionData.data.Poll]
        };
    }
}
</script>
