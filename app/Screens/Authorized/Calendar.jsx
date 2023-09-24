import { CalendarList } from "react-native-calendars";
import { View, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import * as Location from "expo-location";
import { useContext } from "react";
import AppContext from "../../context/appContext";

export default function CalendarScreen({ navigation }) {
  const { location, setWeatherData, setLocation, setSelectedDay } = useContext(AppContext);

  useEffect(() => {
    const getPermissions = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        alert("weather funtionality unavailable until permissions are granted");
        return;
      }
      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
    };
    getPermissions();
  }, []);

  return (
    <View style={styles.calenderContainer}>
      <CalendarList
        style={{
          borderWidth: 1,
          borderColor: "gray",
        }}
        current={"2023-08-01"}
        markedDates={{
          "2012-03-01": { selected: true, marked: true, selectedColor: "blue" },
          "2012-03-02": { marked: true },
          "2012-03-03": { selected: true, marked: true, selectedColor: "blue" },
        }}
        onDayPress={(day) => {
          setSelectedDay(day);
          // setWeatherData(null);
          navigation.navigate('Weather');
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  calendar: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 10,
    height: 400,
  },
  calenderContainer: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
  },
});
