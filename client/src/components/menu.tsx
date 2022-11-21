import React from "react";
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { TextInput, Button } from 'react-native-paper';

interface IMenu {
    onAddTodo: () => void
  }

export default function Menu (props: IMenu) {
  return (
    <View style={styles.container}>
        <Button  
            mode="contained" 
            color="#1E1A3C"
            onPress={() => props.onAddTodo()}>
            + Add Task
        </Button>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      width: '100%',
      justifyContent: 'center',
      padding: 40,
    },
  });