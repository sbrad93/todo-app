import React, { useState, useEffect } from "react";
import { StyleSheet, FlatList} from 'react-native';
import ITodo from '../models/todo';
import { IconButton, List } from 'react-native-paper';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { getTodosQuery } from "../graphql/hooks/use-get-todos-query";
import { useDeleteTodoMutation } from '../graphql/hooks/use-delete-todo-mutation';
import { useUpdateTodoMutation } from "../graphql/hooks/use-update-todo-status-mutation";

interface ITodoListProps {
  data: ITodo[] | undefined
}

export default function TodoList(props: ITodoListProps) {
  const {data, loading, error, refetch} = getTodosQuery();
  const [isLoading, setLoading] = useState(true);
  const deleteTodo = useDeleteTodoMutation();
  const updateTodoStatus = useUpdateTodoMutation();

  useEffect(() => {
    refetch();
    setLoading(false);
  }, []);

  const toggleCheck = (isChecked: boolean, id: string) => {
    try {
      updateTodoStatus({id: id, isCompleted: isChecked})
        .then((response) => {
          console.log(response);
      });
    } catch (err) {
      throw (err);
    };
  };
  
  return (
    <FlatList 
        data={props.data}
        renderItem={({item}) => (
            <List.Item 
              style={styles.element}
              key={item.id}
              title={""}
              right={props => <IconButton 
                                icon='close-circle-outline'
                                size={18}
                                style={{ marginRight: 10 }}
                                onPress={() => {
                                  try{
                                    deleteTodo({
                                      id: item.id
                                    })
                                  } catch(err) {
                                      throw (err);
                                  }
                                }}/>}
              left={props => <BouncyCheckbox
                                fillColor="black"
                                unfillColor="#FFFFFF"
                                text={item.title}
                                textStyle={{color:'black'}}
                                iconStyle={{ borderColor: "black" }}
                                isChecked={item.isCompleted}
                                onPress={(isChecked: boolean) => {toggleCheck(isChecked, item.id)}}
                            />}
              onPress={() => console.log("edit todo")}/>
          )}
          onRefresh={refetch}
          refreshing={isLoading}/>
  );
};

const styles = StyleSheet.create({
  element: {
    padding: 0,
    paddingLeft: 5,
    marginLeft: 5,
    marginBottom: 5
  },
});