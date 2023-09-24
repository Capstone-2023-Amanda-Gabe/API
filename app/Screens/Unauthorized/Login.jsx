import {
  View,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  Button,
  KeyboardAvoidingView,
} from "react-native";
import { useState } from "react";
import { FIREBASE_AUTH } from "../../FirebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import React from "react";
  

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const logIn = async () => {
    setLoading(true);
    try {
      const respone = await signInWithEmailAndPassword(
        FIREBASE_AUTH,
        email,
        password
      );
      console.log(respone);
    } catch (error) { 
      console.log(error);
      alert("sign in failed" + error.message);
    } finally {
      setLoading(false);
    }
  };

  const signUp = async () => {
    setLoading(true);
    try {
      const respone = await createUserWithEmailAndPassword(
        FIREBASE_AUTH,
        email,
        password
      );
      console.log(respone);
      alert("check your email");
    } catch (error) {
      console.log(error);
      alert("sign up failed" + error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <View style={styles.container}>
      <KeyboardAvoidingView behavior="padding">
        <TextInput
          style={styles.input}
          placeholder="Email"
          autoCapitalize="none"
          onChangeText={(text) => setEmail(text)}
        ></TextInput>
        <TextInput
          style={styles.input}
          placeholder="Password"
          autoCapitalize="none"
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
        ></TextInput>
        {loading ? (
          <ActivityIndicator size={"large"} color="#0000f"></ActivityIndicator>
        ) : (
          <>
            <Button title="Login" onPress={logIn}></Button>
            <Button title="Create Account" onPress={signUp}></Button>
          </>
        )}
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    flex: 1,
    // backgroundColor: "#fff",
    justifyContent: "center",
  },
  input: {
    marginVertical: 4,
    height: 50,
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    backgroundColor: "#fff",
  },
});
