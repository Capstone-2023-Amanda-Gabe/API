import { useUser } from "@clerk/clerk-expo";
import { Image, View, Text, Button } from "react-native";
import { useQuery } from 'react-query'
import axios from 'axios'
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet } from "react-native";
import { useAuth } from "@clerk/clerk-expo";
import { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import CalendarComponent from "../../components/calendar";


export default function LandingPage({ navigation }) {
    const [location, setLocation] = useState({coords:{latitude:"40.7128", longitude:"40.7128"}});
    const [selectedDay, setSelected] = useState('');
    
    useEffect(() => {
        const getPermissions = async () => {
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {

            return;
          }
          let currentLocation = await Location.getCurrentPositionAsync({});
          setLocation(currentLocation);
        };
        getPermissions();
      }, []);


    const { data, error, isLoading } = useQuery({
        queryKey: ["WeatherData"],
        queryFn: async () => {
            const { data } = await axios.get(`http://api.weatherapi.com/v1/current.json?key=bb35fe2b500548f0a6b124415232008&q=${location.coords.latitude},${location.coords.longitude}&aqi=no`)
            return data
        }
    })

    if (isLoading) return (
        <Text>'Loading...'</Text>
    )

    if (error) return (<Text>
        'An error has occurred: ' + {error.message}
    </Text>)
const SignOut = () => {
  const { isLoaded,signOut } = useAuth();
  if (!isLoaded) {
    return null;
  }
  return (
    <View>
      <Butto
      n
        title="Sign Out"
        onPress={() => {
          signOut();
        }}
      />
    </View>
  );
};
    return (
        <View
            style={{
                flex: 1,
                // justifyContent: 'center',
                // alignItems: 'center',
                backgroundColor: '#130c20'
            }}
        >
            {/* <LinearGradient
                colors={['white', '#130c20']}
                style={styles.background}
            /> */}
            <CalendarComponent setSelected={setSelected} navigation={navigation}></CalendarComponent>
            {/* <View style={{  
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#130c20'
            }}>
                        <SignOut></SignOut>
            <Image
                style={styles.image}
                source={{
                    uri: "https:" + data.current.condition.icon
                }}
            />
            <Text style={{ fontSize: 50 }}>{data.current.condition.text}</Text>
            <Text style={{ fontSize: 50 }}>{data.current.temp_f} °F</Text>

            </View> */}

        </View>
    );
}

const styles = StyleSheet.create({
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: 50,
    },
    image: {
        width: 200,
        height: 200,
    },
    calendar: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 10,
        height: 200,
      },
      calenderContainer: {
        flex: 1,
        width: "100",
      },
});