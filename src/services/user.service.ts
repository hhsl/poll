import { DollarApollo, QueryResult } from 'vue-apollo/types/vue-apollo';
import USER_ADD from '@/graphql/UserAdd.gql';
import USER_REMOVE from '@/graphql/UserRemove.gql';
import USER_GET from '@/graphql/UserGet.gql';
import { InsertUserQuery, GetUserQuery } from './user.types';

export default class UserService {

    constructor(private $apollo: DollarApollo<any>) {
    }

    public get(id: string): Promise<QueryResult<GetUserQuery>> {
        return this.$apollo.query({
            query: USER_GET,
            variables: {
                id
            }
        });
    }

    public add(username: string): Promise<QueryResult<InsertUserQuery>> {
        return this.$apollo.mutate({
            mutation: USER_ADD,
            variables: {
                username
            }
        });
    }

    public remove(id: string): Promise<QueryResult<any>> {
        return this.$apollo.mutate({
            mutation: USER_REMOVE,
            variables: {
                id
            }
        });
    }
}
