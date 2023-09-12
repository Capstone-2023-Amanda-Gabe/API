import React from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import { useSignIn } from "@clerk/clerk-expo";
import { Button } from "react-native";
export default function SignInScreen({ navigation }) {
  const { signIn, setActive, isLoaded } = useSignIn();
  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const onLogInPress = async () => {
    if (!isLoaded) {
      return;
    }
    try {
      const completesignIn = await signIn.create({
        identifier: emailAddress,
        password,
      });
      await setActive({ session: completesignIn.createdSessionId });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Log In</Text>
      </View>
      
      <View style={styles.content}>
        <TextInput
          style={styles.input}
          // styles={{ color: "white" }}
          autoCapitalize="none"
          value={emailAddress}
          placeholder="Email..."
          onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
          placeholderTextColor="white"
        />
        <TextInput
          style={styles.input}
          autoCapitalize="none"
          value={password}
          placeholder="Password..."
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
          placeholderTextColor="white"
        />
        </View>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#f8146b" }]}
          onPress={onLogInPress}
        >
          <Text style={[styles.buttonText, {  fontSize: 18 }]}>
            Log In
          </Text>
        </TouchableOpacity>
        <Button
          title="Log In?"
          onPress={() => navigation.navigate("Log In?")}
        />
      </View>
    
  )
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#130c20",
  },
  header: {
    backgroundColor: "#130c20",
    padding: 15,
    alignSelf: "flex-start"
  },
  headerText: {
    color: "#f8146b",
    fontSize: 40,
    fontWeight: "bold",
    marginLeft: 20,
  },

  content: {
    flex: 1,
    justifyContent: "center",
    marginTop: 25,
    alignItems: "center",
    paddingHorizontal: 50,
    backgroundColor: "#130c20",
  },

  input: {
    width: "100%",
    marginBottom: 20,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    color: "white",
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
    fontWeight: "bold",
  },
});













// const images = [
//   "https://e1.pxfuel.com/desktop-wallpaper/292/938/desktop-wallpaper-fashion-aesthetic-fashion-collage.jpg",
//   "https://wallpaper.dog/large/20504694.png",
//   "https://wallpaperaccess.com/full/1437797.jpg",
// ];




// useEffect(() => {
//   const interval = setInterval(changeBackground, 2000);
//   return () => clearInterval(interval);
// }, []);

// const changeBackground = () => {
//   const newIndex = Math.floor(Math.random() * images.length);
//   setCurrentImageIndex(newIndex);
// };


{/* <ImageBackground
        source={{ uri: images[currentImageIndex] }}
        resizeMode="cover"
        style={styles.image}
      > */}



      // import { useState, useEffect } from "react";