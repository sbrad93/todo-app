import React, { useState, useEffect } from "react"
import { Modal, StyleSheet, View, Text, KeyboardAvoidingView, ScrollView, TouchableOpacity } from 'react-native';
import ITodo from "../models/todo";
import { TextInput, Button, IconButton } from 'react-native-paper';
import { useCreateTodoMutation } from "../graphql/hooks/use-create-todo-mutation";
import { CreateTodoVariables } from "../graphql/typings/create-todo-variables";
import DateTimePickerModal from "react-native-modal-datetime-picker";

interface IEditTodoProps {
  isVisible: boolean
  onClose: () => void
  onSave: (data: CreateTodoVariables) => void
  data?: ITodo
}

export default function EditTodoView (props: IEditTodoProps)  {
  const header = props.data ? 'Edit Task' : 'Add Task';
  const createTodo = useCreateTodoMutation();
  const [title, setTitle] = useState(props.data?.title || '');
  const [color, setColor] = useState('#fff');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [date, setDate] = useState("");

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const confirmDate = (date: string | number | Date) => {
    date = new Date(date).toDateString();
    setDate(date);
    setColor('#363478');
    console.log("A date has been picked: ", date);
    hideDatePicker();
  };

  const clearDate = () => {
    setDate('');
    setColor('#fff');
  }

  const onSave = () => {
    if (title.trim().length === 0) {
      props.onClose();
      setTitle('');
      return;
    }

    if (props.data) {                                   // update todo
      const newData = {
        ...props.data,
        title
      }
      props.onSave(newData);
    } else {                                            // create new todo
      const newData = {
        title,
        description: "",
        dueDate: date
      }

      try {
        createTodo(newData)
        .then((response) => {
          console.log(response);
          props.onSave(newData);
        });
      } catch (err) {
        throw (err);
      }
    }
  }

  return (
    <Modal visible={props.isVisible} 
            style={styles.modal} 
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
                    value={props.data?.title}
                    theme={{ colors: { placeholder: 'gray', 
                                            text: 'black', 
                                            primary: '#363478'}}}
            />
          <View style={styles.row}>
            <IconButton icon='calendar'
                        color={'#363478'}></IconButton>
            <TouchableOpacity onPress={showDatePicker}>
                <Text
                  style={styles.text}>
                  Assign A Due Date
                </Text>
              </TouchableOpacity>
                <DateTimePickerModal
                  isVisible={isDatePickerVisible}
                  mode="date"
                  onConfirm={confirmDate}
                  onCancel={hideDatePicker}
                />
                <Text style={[styles.text, {textDecorationLine: 'none', marginLeft: 60}]}>{date}</Text>
                <IconButton icon='close-circle-outline'
                            style={styles.icon}
                            size={18}
                            color={color}
                            onPress={clearDate}></IconButton>
          </View>
        </View>
        <Button  
            style={styles.btn}
            mode="contained" 
            color="#363478"
            onPress={onSave}>
            Save
        </Button>
        <Button  
            style={[styles.btn, { marginTop: 10 }]}
            mode="outlined" 
            color="#363478"
            onPress={() => props.onClose()}>
            Cancel
        </Button>
        </KeyboardAvoidingView>
      </ScrollView>
    </Modal>
  );
}

const styles = StyleSheet.create({
    modal: {
        backgroundColor: 'red'
    },
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
    },
    text: {
      margin: 14,
      marginRight: 0,
      marginLeft: 0,
      textDecorationLine: 'underline',
    },
    row: {
      flex: 1,
      marginTop: 10,
      flexDirection: 'row'
    },
    icon: {
      marginTop: 8,
      marginLeft: 0,
    }
  });