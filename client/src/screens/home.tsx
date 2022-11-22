import React, { useState } from "react"
import { StyleSheet, View, Text } from 'react-native';
import { Caption } from 'react-native-paper';
import Menu from '../components/menu';
import TodoList from '../components/todo-list';
import EditTodoView from '../screens/edit-todo';
import { getTodosQuery } from "../graphql/hooks/use-get-todos-query";
export default function HomeScreen() {
  const [isEditTodoVisible, setIsEditorVisible] = useState(false);
  const {data, loading, error, refetch} = getTodosQuery();

  const createTodo = () => {   
      setIsEditorVisible(true);
  }

  const closeEditTodo = () => {
      setIsEditorVisible(false);
  }

  const saveTodo = () => {
    refetch();
    setIsEditorVisible(false);
  }

  return (
      <View style={styles.container}>
        <Text style={styles.title}>My Todo List</Text>
        {!data?.getTodos.length && <Caption style={{textAlign: 'center', marginTop: 20}}>Tap '+ Add Task' to create a task</Caption>}
        <TodoList data={data?.getTodos}/>
        <Menu onAddTodo={createTodo}/>
        <EditTodoView isVisible={isEditTodoVisible} 
          onClose={closeEditTodo}
          onSave={saveTodo}
        />
      </View>
  );
}

const styles = StyleSheet.create({
    container: {
      display: 'flex',
      height: '100%',
    },
    title: {
      fontSize: 25,
      fontWeight: 'bold',
      padding: 10,
      paddingBottom: 0,
      marginBottom: 15,
      color: '#1E1A3C',
      textAlign: 'center'
    },
  });