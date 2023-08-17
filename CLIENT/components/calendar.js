import { Calendar } from 'react-native-calendars';
import { StyleSheet } from 'react-native';
import { useState } from 'react';
import { useUser } from '@clerk/clerk-react';

export default function CalendarComponent({setSelected}) {
  const { isLoaded, isSignedIn, user } = useUser();
  
    return (
        <Calendar
    style={{
      borderWidth: 1,
      borderColor: 'gray',
      heigth: 350
    }}
    current={'2023-08-01'}
    // onDayPress={day => {
    //   console.log('selected day', day)
    // }}
    markedDates={{
      '2012-03-01': {selected: true, marked: true, selectedColor: 'blue'},
      '2012-03-02': {marked: true},
      '2012-03-03': {selected: true, marked: true, selectedColor: 'blue'}
    }}
      onDayPress={day => {
        setSelected(day.dateString);
      }}
      // markedDates={{
      //   [selected]: {selected: true, disableTouchEvent: true, selectedDotColor: 'orange'}
      // }}
    />
    )
}


const styles = StyleSheet.create({ 
    calendar: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 10,
        height: 400,
      },
  });