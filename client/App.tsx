import { StyleSheet, Text, View } from 'react-native';
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';

// Initialize Apollo Client
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache()
});

    // testing connection
    client.mutate({
      mutation: gql`
      mutation {
        create (input: { title: "Todo 1", dueDate: "2019-10-01T00:00:00.000Z"}) {
          id,
          title,
          description,
          dueDate,
          isCompleted,
          userID
        }
      }
      `,
    }).then((result) => console.log(result));

    client.query({
      query: gql`
      query GetTodos {
        getTodos {
          id,
          title,
          description,
          dueDate,
          isCompleted,
          userID
        }
      }
      `,
    }).then((result) => console.log(JSON.stringify(result)));

export default function App() {
  return (
    <ApolloProvider client={client}>
    <View style={styles.container}>
      <Text>Hello</Text>
    </View>
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
