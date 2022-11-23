import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { IconButton } from 'react-native-paper';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import ITodo from "../models/todo";

interface IDatePicker {
    setDate: (date: string) => void
    data: ITodo | undefined
}

export default function DatePicker(props: IDatePicker) {
    const [color, setColor] = props.data?.dueDate ? useState('#363478') : useState('#fff');
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [date, setDate] = props.data?.dueDate ? useState(props.data?.dueDate) : useState('')
  
    const showDatePicker = () => {
      setDatePickerVisibility(true);
    };
  
    const hideDatePicker = () => {
      setDatePickerVisibility(false);
    };
  
    const confirmDate = (date: string | number | Date) => {
      date = new Date(date).toDateString();
      setDate(date);
      props.setDate(date);
      setColor('#363478');
      hideDatePicker();
    };
  
    const clearDate = () => {
      setDate('');
      props.setDate('');
      setColor('#fff');
    };

    return (
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
    );
};

const styles = StyleSheet.create({
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