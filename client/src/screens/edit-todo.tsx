import React, { useState } from "react";
import { Modal, StyleSheet, View, Text, KeyboardAvoidingView, ScrollView } from 'react-native';
import ITodo from "../models/todo";
import { TextInput, Button, Snackbar } from 'react-native-paper';
import { useCreateTodoMutation } from "../graphql/hooks/use-create-todo-mutation";
import DatePicker from "../components/date-picker";
import { useUpdateTodoContentMutation } from "../graphql/hooks/use-update-todo-content-mutation";

interface IEditTodoProps {
  isVisible: boolean
  onClose: () => void
  onSave: () => void
  data?: ITodo
}

export default function EditTodoView (props: IEditTodoProps)  {
  const header = props.data ? 'Edit Task' : 'Add Task';
  const submitText = props.data ? 'Update' : 'Save';
  const createTodo = useCreateTodoMutation();
  const updateTodoContent = useUpdateTodoContentMutation();
  const [title, setTitle] = useState('');
  const [date, setDate] = useState("");
  const [message, setMessage] = useState('');

  const save = () => {
    if (title.trim().length === 0) {
      setMessage('Please title your task');
      return;
    }

    // update todo
    if (props.data) {                                  
      const newData = {
        ...props.data,
        title,
        dueDate: date
      }
      try {
        updateTodoContent(newData)
          .then((response) => {
            console.log(response);
            props.onSave();
            setDate('');
            setTitle('');
          });
      } catch(err) {
        throw (err)
      };
    }

    // create new todo
    else {                                        
      const newData = {
        title,
        description: "",
        dueDate: date
      }
      try {
        createTodo(newData)
          .then((response) => {
            console.log(response);
            props.onSave();
            setDate('');
            setTitle('');
          });
      } catch (err) {
        throw (err);
      };
    };
  };

  return (
    <Modal visible={props.isVisible} 
            onShow={() => {if (props.data?.title) {
                              setTitle(props.data?.title)
                            }}}
            onDismiss={() => {setTitle('')}}
            animationType="slide">
      <ScrollView>
        <KeyboardAvoidingView 
            style={styles.container}
            behavior={"padding"}>
        <Text style={styles.title}>{header}</Text>
        <View>
            <TextInput
                label={"Title"}
                    style={styles.input}
                    onChangeText={setTitle}
                    value={title}
                    theme={{ colors: { placeholder: 'gray', 
                                            text: 'black', 
                                            primary: '#363478'}}}
            />
            <DatePicker setDate={(date) => {setDate(date)}}
                        data={props.data}></DatePicker>
        </View>
        <Button  
            style={styles.btn}
            mode="contained" 
            color="#363478"
            onPress={() => {save()}}>
            {submitText}
        </Button>
        <Button  
            style={[styles.btn, { marginTop: 10 }]}
            mode="outlined" 
            color="#363478"
            onPress={() => {props.onClose(); 
                            setDate('');}}>
            Cancel
        </Button>
        </KeyboardAvoidingView>
      </ScrollView>
      <Snackbar visible={message.length > 0} 
                onDismiss={() => setMessage('')}
                duration={1500}>{message}</Snackbar>
    </Modal>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: '100%', 
      height: '100%',
      backgroundColor: '#fff',
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        padding: 20,
        paddingBottom: 0,
        marginTop: 55,
        marginBottom: 10,
        color: '#363478',
    },
    btn: {
      margin: 50,
      marginBottom: 0
    },
    input: {
        marginTop: 20,
        marginBottom: 0,
        margin: 15,
        backgroundColor: '#fff',
    }
  });