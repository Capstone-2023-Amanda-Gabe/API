import React, { useState, useEffect } from 'react';
import { View, Text, Image } from 'react-native';
import config from '../config';
const WeatherComponent = ({ day }) => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const apiKey = "bb35fe2b500548f0a6b124415232008";
    const baseURL = "http://api.weatherapi.com/v1/future.json?key=bb35fe2b500548f0a6b124415232008&q=40.65786840,-74.00477610&dt=2023-09-22"
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        const dayForecast = data.forecast.forecastday[day];
        setWeatherData(dayForecast);
      })
      .catch(error => console.error('Error fetching weather data:', error));
  }, [day]);

  if (!weatherData) {
    return <Text>Loading...</Text>;
  }

  const { day: forecastDay, condition, avgtemp_c } = weatherData;

  return (
    <View>
      <Text>Day: {forecastDay}</Text>
      <Text>Temperature: {avgtemp_c}°C</Text>
      <Image source={{ uri: condition.icon }} style={{ width: 50, height: 50 }} />
    </View>
  );
};

export default WeatherComponent;