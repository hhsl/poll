<template>
    <ApolloQuery :query="getPollQuery" :variables="{ id: pollId }">
        <ApolloSubscribeToMore
            :document="pollVoteAddedSubscription"
            :variables="{ pollId }"
            :updateQuery="onPollVoteAdded"
        />
        <ApolloSubscribeToMore
            :document="pollOptionAddedSubscription"
            :variables="{ pollId }"
            :updateQuery="onOptionAdded"
        />
        <template slot-scope="{ result: { loading, error, data } }">
            <div v-if="loading" class="loading apollo">Loading...</div>
            <div v-else-if="error" class="error apollo">An error occured {{error}}</div>
            <div v-else-if="data" class="result apollo">
                <h2>
                    {{ data.Poll[0].title }}
                </h2>

                <div v-if="user">
                    <p>Hi {{user.name}}</p>
                    <NewPollOption :pollId="data.Poll[0].id"></NewPollOption>
                </div>
                <div v-else>
                    Please create a Username
                    <CreateUser></CreateUser>
                </div>

                <ThePoll :poll="transformToPoll(data)"></ThePoll>
            </div>
            <div v-else class="no-result apollo">No result :(</div>
        </template>
    </ApolloQuery>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import {
    UUID,
    HasuraQuery,
    HasuraPoll,
    Poll,
    HasuraSubscription,
    HasuraPollVote,
    HasuraPollOption,
    HasuraPollOptions
} from '@/components/poll/types';
import POLL_GET from '@/graphql/PollGet.gql';
import USER_GET from '@/graphql/UserGet.gql';
import POLL_VOTE_ADDED from '@/graphql/PollVoteAddedToPoll.gql';
import POLL_OPTION_ADDED from '@/graphql/PollOptionAddSubscription.gql';
import ThePoll from '@/components/poll/ThePoll.vue';
import NewPollOption from '@/components/poll/NewPollOption.vue';
import CreateUser from '@/components/user/CreateUser.vue';
import { LOCAL_STORAGE_USERID } from '@/components/user/CreateUser.vue';
import { User } from '@/components/admin/types';

@Component({
    components: {
        ThePoll,
        NewPollOption,
        CreateUser
    }
})
export default class AppPoll extends Vue {
    @Prop() public pollId!: UUID;

    private getPollQuery = POLL_GET;
    private pollVoteAddedSubscription = POLL_VOTE_ADDED;
    private pollOptionAddedSubscription = POLL_OPTION_ADDED;
    private user!: User;

    get apollo() {
        return {
            user: {
                query: USER_GET,
                variables: {
                    id: localStorage.getItem(LOCAL_STORAGE_USERID)
                },
                update(data: any) {
                    return data.User[0];
                },
                skip() {
                    return !localStorage.getItem(LOCAL_STORAGE_USERID);
                }
            }
        };
    }

    private onPollVoteAdded(
        hasuraPoll: HasuraQuery<HasuraPoll>,
        { subscriptionData }: HasuraSubscription<HasuraPollVote>
    ): HasuraQuery<HasuraPoll> {
        if (!hasuraPoll) {
            return {
                Poll: []
            };
        }
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

    private onOptionAdded(
        hasuraPoll: HasuraQuery<HasuraPoll>,
        { subscriptionData }: HasuraSubscription<HasuraPollOptions>): HasuraQuery<HasuraPoll> {
        const newPoll = hasuraPoll.Poll;
        newPoll[0].polloptionssBypollId = [...subscriptionData.data.PollOptions];

        return {
            Poll: [...newPoll]
        };
    }

    private transformToPoll(hasuraPoll: HasuraQuery<HasuraPoll>): Poll {

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
