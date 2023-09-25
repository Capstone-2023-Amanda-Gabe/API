import { useEffect, useState } from "react";
import { View, Text, Image, Button} from "react-native";
import { ActivityIndicator, StyleSheet } from "react-native";
import { useContext } from "react";
import AppContext from "../../context/appContext";
import config from "../../config";
import { useIsFocused } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
const WeatherScreen = ({ navigation }) => {
  const { selectedDay: { dateString }, location, weatherData, setWeatherData } = useContext(AppContext);
  const [weatherLoading, setWeatherLoading] = useState(true);
  // const [availableClothes, setAvailableClothes] = useState(null);


  const fetchWeather = async () => {
    try {
      const result = await fetch(
        `http://api.weatherapi.com/v1/history.json?key=${config.WEATHER_API_KEY}&q=${location.coords.latitude},${location.coords.longitude}&dt=${dateString}`
      );
      const weatherData = await result.json();
      setWeatherData({
        locationName: weatherData.location.name,
        region: weatherData.location.region,
        icon: weatherData.forecast.forecastday[0].day.condition.icon,
        condition: weatherData.forecast.forecastday[0].day.condition.text,
        maxtemp_f: weatherData.forecast.forecastday[0].day.maxtemp_f,
        mintemp_f: weatherData.forecast.forecastday[0].day.mintemp_f,
        averagetemp_f: weatherData.forecast.forecastday[0].day.avgtemp_f,
        maxwind: weatherData.forecast.forecastday[0].day.maxwind_mph,
        precipitation: weatherData.forecast.forecastday[0].day.totalprecip_in,
        humidity: weatherData.forecast.forecastday[0].day.avghumidity,
      });
    } catch (error) {
      alert(error);
      setWeatherData(null);
    } finally {
      setWeatherLoading(false);
    }
  };
  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      fetchWeather();
    }
    console.log("reload");
  }, [isFocused]);

  return weatherLoading || !weatherData ? (
    <View style={styles.container}>
      <ActivityIndicator size="large"></ActivityIndicator>
    </View>
  ) : (
    <View style={styles.container}>
      <Text>
        {weatherData.locationName}, {weatherData.region}
      </Text>
      <Image
        style={styles.weatherIcon}
        source={{
          uri: "https:" + weatherData.icon,
        }}
      />
      <Text>{weatherData.condition}</Text>
      <View style={styles.weatherDataContainer}>
        <View style={styles.weatherDataboxes}>
          <Text>{weatherData.maxtemp_f} ºF</Text>
          <Text>High</Text>
        </View>
        <View style={styles.weatherDataboxes}>
          <Text>{weatherData.mintemp_f} ºF</Text>
          <Text>Low</Text>
        </View>
        <View style={styles.weatherDataboxes}>
          <Text>{weatherData.averagetemp_f} ºF</Text>
          <Text>Average</Text>
        </View>
        <View style={styles.weatherDataboxes}>
          <Text> {weatherData.maxwind} mph</Text>
          <Text>Wind</Text>
        </View>
        <View style={styles.weatherDataboxes}>
          <Text>{weatherData.precipitation} %</Text>
          <Text>Precip.</Text>
        </View>
        <View style={styles.weatherDataboxes}> 
          <Text>{weatherData.humidity} %</Text>
          <Text>Humidity </Text>
        </View>
      </View>
      <Button title="No clohtes? Create Some" onPress={() => navigation.navigate('CreateClothes')}/>
      {/* <Button title="No clohtes? Create Some" onPress={console.log("pressed")}></Button> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  weatherIcon: {
    width: 100,
    height: 100,
  },
  weatherDataContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  weatherDataboxes: {
    width: "33%",
    height: 100,
    textAlign: "center",
    // borderWidth: 10,
    // borderStyle: "dotted",
    // borderColor: "red",
    justifyContent: "center",
    alignItems: "center",
  },
});
export default WeatherScreen;
