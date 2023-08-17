import React from "react";
import { Text, TextInput, TouchableOpacity, View, StyleSheet } from "react-native";
import { useSignIn } from "@clerk/clerk-expo";

export default function SignInScreen() {
  const { signIn, setActive, isLoaded } = useSignIn();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");

  const onSignInPress = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignIn = await signIn.create({
        identifier: emailAddress,
        password,
      });
      // This is an important step,
      // This indicates the user is signed in
      await setActive({ session: completeSignIn.createdSessionId });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    // <View style={styles.container}>
    <ImageBackground 
    source={require}>

    
      {/* <View styles={styles.inputContainer}> */}
        <TextInput
        styles={styles.input}
          autoCapitalize="none"
          value={emailAddress}
          placeholder="Email..."
          onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
        />
      {/* </View> */}

      {/* <View styles={styles.inputContainer}> */}
        <TextInput
        style={styles.input}
          value={password}
          placeholder="Password..."
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
      {/* </View> */}

      <TouchableOpacity styles={styles.button}onPress={onSignInPress}>
        <Text styles={styles.buttonText}>Sign in</Text>
      </TouchableOpacity>
      </ImageBackground>
    {/* // </View> */}
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  input: {
    width: "100%",
    marginBottom: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    color:"#FFD700",

  },
  button:{
    backgroundColor: "#007bff",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center"

  },
});