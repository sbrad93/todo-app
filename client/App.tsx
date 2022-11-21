import { StyleSheet, Text, View } from 'react-native';
import { ApolloProvider, gql } from '@apollo/client';
import { createApolloClient } from './src/config';
import React, { useState, useEffect } from 'react';
import Menu from './src/components/menu';
import TodoList from './src/components/todo-list';
import ITodo from './src/models/todo';
import EditTodoView from './src/screens/edit-todo';
import { Caption, List, Snackbar } from "react-native-paper";

// Initialize Apollo Client
const client = createApolloClient();

    // testing connection
    // client.mutate({
    //   mutation: gql`
    //   mutation {
    //     create (input: { title: "Todo 1", dueDate: "2019-10-01T00:00:00.000Z"}) {
    //       id,
    //       title,
    //       description,
    //       dueDate,
    //       isCompleted,
    //       userID
    //     }
    //   }
    //   `,
    // }).then((result) => console.log(result));

    // client.query({
    //   query: gql`
    //   query GetTodos {
    //     getTodos {
    //       id,
    //       title,
    //       description,
    //       dueDate,
    //       isCompleted,
    //       userID
    //     }
    //   }
    //   `,
    // }).then((result) => console.log(JSON.stringify(result)));

export default function App() {

  const [data, setData] = useState<ITodo[]>([]);
  const [isEditTodoVisible, setIsEditorVisible] = useState(false)
  const [isDone, setDone] = useState(false);

  const onAddTodo = () => {   
    setIsEditorVisible(true)
  }

  const onCloseEditTodo = () => {
    setIsEditorVisible(false)
  }

  const onSaveTodo = (data: ITodo) => {
    console.log(data);
    setData((d) => [...d, data]);
    setIsEditorVisible(false);
  }

  return (
    <ApolloProvider client={client}>
      <View style={styles.container}>
          <Text style={styles.title}>My Todo List</Text>
          {!data.length && <Caption style={{textAlign: 'center', marginTop: 20}}>Tap '+ Add Task' to create a task</Caption>}
          <TodoList data={data} />
          <Menu onAddTodo={onAddTodo}/>
          <EditTodoView isVisible={isEditTodoVisible} 
            onClose={onCloseEditTodo}
            onSave={onSaveTodo}
          />
        </View>
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    height: '100%',

  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 20,
    paddingBottom: 0,
    marginTop: 50,
    marginBottom: 10,
    color: '#1E1A3C'
  },
});