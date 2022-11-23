import { ApolloClient } from '@apollo/client';
import { InMemoryCache } from '@apollo/client';

export function createApolloClient() {

    const localCache = new InMemoryCache();

    const apolloClient = new ApolloClient({
        uri: 'http://localhost:4000/graphql',
        cache: localCache,
        assumeImmutableResults: true,
    });

    return apolloClient;
}