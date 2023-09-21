import { Image, View, Text, Button } from "react-native";
import { useQuery } from "react-query";
import axios from "axios";
import { useSelector } from "react-redux";
import { StyleSheet } from "react-native";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { useState, useEffect } from "react";
import * as Location from "expo-location";
import * as React from "react";
import { Avatar } from "react-native-paper";
import { useIsFocused } from "@react-navigation/native";
import defaultWeatherData from "../../misc/defaultWeatherData";

export default function DayComponent({ navigation }) {
  const [result, setResult] = useState(null);
  const [data, setData] = useState(defaultWeatherData);
  const [location, setLocation] = useState({
    coords: { latitude: "40.657881", longitude: "-74.004662" },
  });
  const {user} = useUser()

  const { dateString } = useSelector((state) => state.selectedDay.value);

  useEffect(() => {
    const getPermissions = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        return;
      }
      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
    };
    getPermissions();
  }, []);

  // const { data, error, isLoading, refetch } = useQuery({
  //   queryKey: ["WeatherData"],
  //   queryFn: async () => {
  //     const { data } = await axios.get(
  //       `http://api.weatherapi.com/v1/history.json?key=708a9c30a2f44cbc91f184847231009&q=${location.coords.latitude},${location.coords.longitude}&dt=${dateString}`
  //     );
  //     return data;
  //   },
  // });

  console.log(location);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      const fetchClothes = async () => {
        const info = await fetch(`http://127.0.0.1:8900/clothes/${user.id}`);
        const result = await info.json();
        setResult(result);
      };
      fetchClothes();
    }
  }, [isFocused]);

  useEffect(() => {
    if (isFocused) {
      const fetchWeather = async () => {
        const info = await fetch(
          `http://api.weatherapi.com/v1/history.json?key=708a9c30a2f44cbc91f184847231009&q=${location.coords.latitude},${location.coords.longitude}&dt=${dateString}`
        );
        const result = await info.json();
        setData(result);
        console.log(data);
      };
      fetchWeather();
    }
  }, [isFocused]);

  // React.useEffect(() => {
  //   const fetchClothes = async() => {
  //     const result = axios.get("http://api.weatherapi.com/v1/history.json?key=708a9c30a2f44cbc91f184847231009&q=${location.coords.latitude},${location.coords.longitude}&dt=${dateString}")
  //     setResult(result);
  //   }
  //   fetchClothes()
  // }, [])

  return (
    <>
      <View
        style={{
          flex: 1,
          
          backgroundColor: "#130c20",
        }}
      >
        <Text style={{ color: "white" }}>
          {data.location.name}, {data.location.region}
        </Text>
        <Avatar.Image size={200} source={{uri: "https:" + data.forecast.forecastday[0].day.condition.icon}} />
        <Text style={{ color: "white" }}>
          {data.forecast.forecastday[0].day.condition.text}
        </Text>
        <Text style={{ color: "white" }}>
          maxtemp_f {data.forecast.forecastday[0].day.maxtemp_f}
        </Text>
        <Text style={{ color: "white" }}>
          mintemp_f {data.forecast.forecastday[0].day.mintemp_f}
        </Text>
        <Text style={{ color: "white" }}>
          avgtemp_f {data.forecast.forecastday[0].day.avgtemp_f}
        </Text>
        <Text style={{ color: "white" }}>
          maxwind_mph {data.forecast.forecastday[0].day.maxwind_mph}
        </Text>
        <Text style={{ color: "white" }}>
          totalprecip_in {data.forecast.forecastday[0].day.totalprecip_in}
        </Text>
        <Text style={{ color: "white" }}>
          avghumidity {data.forecast.forecastday[0].day.avghumidity}
        </Text>
        <View>
          {result ?   
          <View>
            <View style={{flexDirection: "row", flexWrap: 'wrap'}}>
            {result.map((piece) => {
            const {image_url} = piece
            return ( <Avatar.Image size={50} source={{uri:image_url}} />)
          })}
          </View>
          <Button
          title="Want More Clothes? Create Some!"
          onPress={() => navigation.navigate('Create Clothes')}/>
          </View> : <Button
          title="No Clothes? Create Some!"
          onPress={() => navigation.navigate('Create Clothes')}/>}
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({});
