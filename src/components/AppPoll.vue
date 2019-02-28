<template>
    <ApolloQuery :query="getPollQuery" :variables="{ id: pollId }">
        <ApolloSubscribeToMore
            :document="pollVoteAddedSubscription"
            :variables="{ pollId }"
            :updateQuery="onPollVoteAdded"
        />
        <template slot-scope="{ result: { loading, error, data } }">
            <div v-if="loading" class="loading apollo">Loading...</div>
            <div v-else-if="error" class="error apollo">An error occured {{error}}</div>
            <div v-else-if="data" class="result apollo">
                <ThePoll :poll="transformToPoll(data)"></ThePoll>
            </div>
            <div v-else class="no-result apollo">No result :(</div>
        </template>
    </ApolloQuery>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { UUID, HasuraQuery, HasuraPoll, Poll, HasuraSubscription, HasuraPollVote } from '@/components/poll/types';
import POLL_GET from '@/graphql/PollGet.gql';
import POLL_VOTE_ADDED from '@/graphql/PollVoteAddedToPoll.gql';
import ThePoll from '@/components/poll/ThePoll.vue';

@Component({
    components: {
        ThePoll
    }
})
export default class AppPoll extends Vue {
    @Prop() public pollId!: UUID;

    public getPollQuery = POLL_GET;
    public pollVoteAddedSubscription = POLL_VOTE_ADDED;

    public onPollVoteAdded(
        hasuraPoll: HasuraQuery<HasuraPoll>,
        { subscriptionData }: HasuraSubscription<HasuraPollVote>
    ): HasuraQuery<HasuraPoll> {
        const newPoll = hasuraPoll.Poll;
        newPoll[0].polloptionssBypollId.map((polloption) => {
            const voteCount = subscriptionData.data.PollVote.filter((pollVote) =>
                pollVote.VoteForOption.id === polloption.id
            ).length;
            polloption.pollvotesBycreatedFor_aggregate.aggregate.count = voteCount;
        });

        return {
            Poll: [...newPoll]
        };
    }

    public transformToPoll(hasuraPoll: HasuraQuery<HasuraPoll>): Poll {

        return {
            title: hasuraPoll.Poll[0].title,
            created_at: hasuraPoll.Poll[0].created_at,
            id: hasuraPoll.Poll[0].id,
            options: hasuraPoll.Poll[0].polloptionssBypollId.map((pollOption) => {
                return {
                    text: pollOption.text,
                    id: pollOption.id,
                    count: pollOption.pollvotesBycreatedFor_aggregate.aggregate.count
                };
            })
        };
    }
}
</script>
