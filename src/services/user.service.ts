import { DollarApollo, QueryResult } from 'vue-apollo/types/vue-apollo';
import USER_ADD from '@/graphql/UserAdd.gql';
import USER_REMOVE from '@/graphql/UserRemove.gql';
import USER_GET from '@/graphql/UserGet.gql';
import { InsertUserQuery, GetUserQuery, UserId, UserName } from './user.types';

const LOCAL_STORAGE_USERID: string = 'userid';

export default class UserService {

    constructor(private $apollo: DollarApollo<any>) {
    }

    public getFromLocalStorage(): UserId | null {
        return localStorage.getItem(LOCAL_STORAGE_USERID);
    }

    public get(id: UserId): Promise<QueryResult<GetUserQuery>> {
        return this.$apollo.query({
            query: USER_GET,
            variables: {
                id
            }
        });
    }

    public add(username: UserName): Promise<QueryResult<InsertUserQuery>> {
        return this.$apollo.mutate({
            mutation: USER_ADD,
            variables: {
                username
            }
        });
    }

    public remove(id: UserId): Promise<QueryResult<any>> {
        return this.$apollo.mutate({
            mutation: USER_REMOVE,
            variables: {
                id
            }
        });
    }
}
