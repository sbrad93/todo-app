import React, { useState } from "react"
import { StyleSheet, View, Text } from 'react-native';
import { Caption } from 'react-native-paper';
import Menu from '../components/menu';
import TodoList from '../components/todo-list';
import EditTodoView from '../screens/edit-todo';
import { getTodosQuery } from "../graphql/hooks/use-get-todos-query";
import ITodo from "../models/todo";

export default function HomeScreen() {
  const [isEditTodoVisible, setIsEditorVisible] = useState(false);
  const {data, loading, error, refetch} = getTodosQuery();
  const [todo, setTodo] = useState<ITodo | undefined>();

  const createTodo = () => {  
      setTodo(undefined); 
      setIsEditorVisible(true);
  }

  const editTodo = (todo: ITodo) => {
    console.log(todo);
    setTodo(todo);
    setIsEditorVisible(true);
  }

  const closeEditTodo = () => {
      setTodo(undefined);
      setIsEditorVisible(false);
  }

  const saveTodo = () => {
    refetch();
    setTodo(undefined);
    setIsEditorVisible(false);
  }

  return (
      <View style={styles.container}>
        <Text style={styles.title}>My Todo List</Text>
        {!data?.getTodos.length && <Caption style={{textAlign: 'center'}}>Tap '+ Add Task' to create a task</Caption>}
        <TodoList data={data?.getTodos}
                  editTodo={editTodo}/>
        <Menu onAddTodo={createTodo}/>
        <EditTodoView isVisible={isEditTodoVisible} 
          onClose={closeEditTodo}
          onSave={saveTodo}
          data={todo}
        />
      </View>
  );
};

const styles = StyleSheet.create({
    container: {
      display: 'flex',
      height: '100%',
    },
    title: {
      fontSize: 30,
      fontWeight: 'bold',
      padding: 10,
      paddingBottom: 0,
      marginBottom: 20,
      color: '#363478',
      textAlign: 'center'
    },
  });