import { CalendarList } from 'react-native-calendars';
import { View, StyleSheet } from 'react-native';
import { useUser } from '@clerk/clerk-react';
import { useDispatch } from "react-redux"
import { setDay } from '../Redux/selectedDaySlice';
export default function CalendarComponent({ navigation}) {
const dispatch = useDispatch()

  return (
    <View style={styles.calenderContainer}>
      <CalendarList
        style={{
          borderWidth: 1,
          borderColor: 'gray',
          heigth: 350
        }}
        current={'2023-08-01'}
        markedDates={{
          '2012-03-01': { selected: true, marked: true, selectedColor: 'blue' },
          '2012-03-02': { marked: true },
          '2012-03-03': { selected: true, marked: true, selectedColor: 'blue' }
        }}
        onDayPress={day => {
          dispatch(setDay(day))
          navigation.navigate('Day');
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