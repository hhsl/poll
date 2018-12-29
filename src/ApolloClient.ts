import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

// HTTP connexion to the API
const httpLink = new HttpLink({
    // You should use an absolute URL here
    uri: process.env.VUE_APP_BACKEND_URL,
    headers: {
      'X-Hasura-Access-Key': process.env.VUE_APP_BACKEND_ACCESS_KEY
    }
});

// Cache implementation
const cache = new InMemoryCache();

// Create the apollo client
export const apolloClient = new ApolloClient({
    link: httpLink,
    cache
});
