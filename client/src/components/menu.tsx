import React, { useState } from "react";
import { Button, StyleSheet, Text, View, SafeAreaView } from 'react-native';

interface IMenu {
    onAddTodo: () => void
  }

export default function Menu (props: IMenu) {
  return (
    <View style={styles.container}>
      <Button 
        title="+ Add Task" 
        onPress={() => console.log("add todo")}/>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      width: '100%', height: 'auto',
      color: 'black',
      alignItems: 'center',
      justifyContent: 'center',
      display: 'flex',
      flexDirection: 'row',
      padding: 20,
    },
  });