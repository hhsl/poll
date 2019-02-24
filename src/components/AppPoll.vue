<template>
    <ApolloQuery :query="getPollQuery" :variables="{ id: pollId }">
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
import { Poll, UUID, PollOption, PollBackend } from '@/components/poll/types';
import POLL_GET from '@/graphql/PollGet.gql';
import ThePoll from '@/components/poll/ThePoll.vue';

@Component({
    components: {
        ThePoll
    }
})
export default class AppPoll extends Vue {
    @Prop() public pollId!: UUID;

    public getPollQuery = POLL_GET;

    public transformToPoll(data: any): Poll {
        const pollBackend: PollBackend = data.Poll[0];
        const pollOptions: PollOption[] = pollBackend.polloptionssBypollId.map((pollOption) => {
            return {
                text: pollOption.text,
                id: pollOption.id,
                count: pollOption.pollvotesBycreatedFor_aggregate.aggregate.count
            };
        });

        return {
            title: pollBackend.title,
            created_at: pollBackend.created_at,
            id: pollBackend.id,
            options: pollOptions
        };
    }
}
</script>
