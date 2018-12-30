import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { WebSocketLink } from 'apollo-link-ws';
import { split } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';

const headers = {
    'X-Hasura-Access-Key': process.env.VUE_APP_BACKEND_ACCESS_KEY
};

const httpLink = new HttpLink({
    uri: process.env.VUE_APP_BACKEND_URL,
    headers
});

const wsLink = new WebSocketLink({
    uri: process.env.VUE_APP_BACKEND_URL_WS as string,
    options: {
        reconnect: true,
        connectionParams: {
            headers
        }
    }
});

const link = split(
    // split based on operation type
    ({ query }) => {
        const mainDefinition = getMainDefinition(query);

        return mainDefinition.kind === 'OperationDefinition'
            && mainDefinition.operation === 'subscription';
    },
    wsLink,
    httpLink
);

// Cache implementation
const cache = new InMemoryCache();

// Create the apollo client
export const apolloClient = new ApolloClient({
    link,
    cache
});
