import React, { useState } from "react";
import { StyleSheet, FlatList } from 'react-native';
import ITodo from '../models/todo';
import { IconButton, List } from 'react-native-paper';

import BouncyCheckbox from "react-native-bouncy-checkbox";
interface ITodoListProps {
  data: ITodo[];
}

const TodoList = (props: ITodoListProps) => {
  const [isDone, setDone] = useState(false);
  
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
                                onPress={setDone}
                            />}
              onPress={() => console.log("edit todo")}
              />
          )} 
      />
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