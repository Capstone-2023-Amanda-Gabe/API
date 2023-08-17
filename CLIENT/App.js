import React from "react";
import { SafeAreaView, Text, StyleSheet } from "react-native";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";
import { useState } from "react";
import { View } from "react-native";
import { Calendar } from 'react-native-calendars';
import SignInScreen from "./pages/signIn";
import SignUpScreen from "./pages/signUp";


const CLERK_PUBLISHABLE_KEY = "pk_test_cHJvbXB0LWtpdC03Ni5jbGVyay5hY2NvdW50cy5kZXYk"

export default function App() {
  const [selected, setSelected] = useState('');

  return (
    <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY}>
      <SafeAreaView style={styles.container}>
        <SignedIn>
          <Text style={styles.signedInText}>You are Signed in</Text>
          <View style={styles.calenderContainer}>
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
          </View>
        </SignedIn>
        <SignedOut>
         <SignInScreen/>
        </SignedOut>
      </SafeAreaView>
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
  calendar: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    height: 400,
  },
}); 