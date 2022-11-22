import React, { useState, useEffect } from "react"
import { Modal, StyleSheet, View, Text, TouchableOpacity, KeyboardAvoidingView, ScrollView } from 'react-native';
import ITodo from "../models/todo";
import { TextInput, Button } from 'react-native-paper';

interface IEditTodoProps {
  isVisible: boolean
  onClose: () => void
  onSave: (data: ITodo) => void
  data?: ITodo
}

export default function EditTodoView (props: IEditTodoProps)  {
  const header = props.data ? 'Edit Todo' : 'Add Todo'
  const [title, setTitle] = useState(props.data?.title || '')


  const onSave = () => {
    if (title.trim().length === 0) {
      props.onClose();
      setTitle('');
      return;
    }

    if (props.data) {
      const newData = {
        ...props.data,
        title
      }
      props.onSave(newData);
    } else {
      const newData = {
        id: Math.floor(Math.random() * 10000000)+"",
        title,
        isCompleted: false,
      }
      props.onSave(newData);
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
                                            primary: '#1E1A3C'}}}
            />
        </View>
        <Button  
            style={styles.btn}
            mode="contained" 
            color="#1E1A3C"
            onPress={onSave}>
            Save
        </Button>
        <Button  
            style={[styles.btn, { marginTop: 10 }]}
            mode="outlined" 
            color="#1E1A3C"
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
      flexDirection: 'column',
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
  });