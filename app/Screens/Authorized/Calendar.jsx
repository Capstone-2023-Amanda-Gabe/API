import { CalendarList } from 'react-native-calendars';
import { View, StyleSheet } from 'react-native';
import React from 'react';
export default function CalendarComponent({ navigation}) {

  return (
    <View style={styles.calenderContainer}>
      <CalendarList
        style={{
          borderWidth: 1,
          borderColor: 'gray'
        }}
        current={'2023-08-01'}
        markedDates={{
          '2012-03-01': { selected: true, marked: true, selectedColor: 'blue' },
          '2012-03-02': { marked: true },
          '2012-03-03': { selected: true, marked: true, selectedColor: 'blue' }
        }}
        onDayPress={day => {
            console.log(day)
        }}
      />
    </View>
  )
}


const styles = StyleSheet.create({
  calendar: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    height: 400,
  },
  calenderContainer: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
   
  },
});