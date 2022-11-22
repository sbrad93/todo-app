import React, { useState, useEffect } from "react";
import { StyleSheet, FlatList} from 'react-native';
import ITodo from '../models/todo';
import { IconButton, List } from 'react-native-paper';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { getTodosQuery } from "../graphql/hooks/use-get-todos-query";

interface ITodoListProps {
  data: ITodo[] | undefined
}

const TodoList = (props: ITodoListProps) => {
  const [isCompleted, setCompleted] = useState(false);
  const {data, loading, error, refetch} = getTodosQuery();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    refetch();
    setLoading(false);
}, []);
  
  return (
    <FlatList 
        style={styles.container}
        data={props.data}
        renderItem={({item}) => (
            <List.Item 
              style={styles.element}
              key={item.id}
              title={item.title}
              right={props => <IconButton icon='delete'/>}
              left={props => <BouncyCheckbox
                                fillColor="black"
                                unfillColor="#FFFFFF"
                                iconStyle={{ borderColor: "black" }}
                                onPress={setCompleted}
                            />}
              onPress={() => console.log("edit todo")}/>
          )}
          onRefresh={refetch}
          refreshing={isLoading}/>
  );
}
export default TodoList;

const styles = StyleSheet.create({
  container: {
  },
  element: {
    padding: 0,
    paddingLeft: 10
  }
});