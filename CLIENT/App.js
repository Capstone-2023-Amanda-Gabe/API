import React from "react";
import { Text, StyleSheet } from "react-native";
import { ClerkProvider, SignedIn, SignedOut, } from "@clerk/clerk-expo";
import { useState } from "react";
import { View } from "react-native";
import CalendarComponent from "./components/calendar";
import SignInScreen from "./pages/signIn";
import SignUpScreen from "./pages/signUp";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as SecureStore from "expo-secure-store";
import WeatherComponent from "./components/WeatherComponent";
const CLERK_PUBLISHABLE_KEY = "pk_test_cHJvbXB0LWtpdC03Ni5jbGVyay5hY2NvdW50cy5kZXYk"

const tokenCache = {
  async getToken(key) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key, value) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

const Stack = createNativeStackNavigator();
export default function App() {

  const [selectedDay, setSelected] = useState('');
  
  return (
    <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY} tokenCache={tokenCache}>
      <NavigationContainer>
        <SignedIn>
          <View style={styles.calenderContainer}>
            <CalendarComponent setSelected={setSelected}/>
            <WeatherComponent></WeatherComponent>
            <Text>{selectedDay}</Text>
          </View>
        </SignedIn>
        <SignedOut>
            <Stack.Navigator initialRouteName="Sign In?">
              <Stack.Screen name="Sign In?" component={SignInScreen} />
              <Stack.Screen name="Sign Up?" component={SignUpScreen} />
            </Stack.Navigator>
        </SignedOut>
      </NavigationContainer>
    </ClerkProvider>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  signedInText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  calenderContainer: {
    flex: 1,
    width: "100",
  },
});