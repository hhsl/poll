import { DollarApollo, QueryResult } from 'vue-apollo/types/vue-apollo';
import POLL_ADD from '@/graphql/PollAdd.gql';
import POLL_GET from '@/graphql/PollGet.gql';
import { InsertPollQuery, GetPollQuery } from './poll.types';

export default class PollService {

    constructor(private $apollo: DollarApollo<any>) {
    }

    public create(title: string, id: string): Promise<QueryResult<InsertPollQuery>> {
        return this.$apollo.mutate({
            mutation: POLL_ADD,
            variables: {
                title,
                id
            }
        });
    }

    public get(id: string): Promise<QueryResult<GetPollQuery>> {
        return this.$apollo.query({
            query: POLL_GET,
            variables: {
                id
            }
        });
    }

}
