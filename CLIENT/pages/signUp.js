import * as React from "react";
import TypingAnimation from "../components/TypeAnimation";
import { Text, TextInput, TouchableOpacity, View, Button, StyleSheet } from "react-native";
import { useSignUp } from "@clerk/clerk-expo";

export default function SignUpScreen({ navigation }) {
  const { isLoaded, signUp, setActive } = useSignUp();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [pendingVerification, setPendingVerification] = React.useState(false);
  const [code, setCode] = React.useState("");


  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      await signUp.create({
        emailAddress,
        password,
      });

      // send the email.
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      // change the UI to our pending section.
      setPendingVerification(true);
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  // This verifies the user using email code that is delivered.
  const onPressVerify = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      await setActive({ session: completeSignUp.createdSessionId });
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Sign Up</Text>
      </View>


      
    <TypingAnimation>

    </TypingAnimation>



      <View style={styles.content}>
        <TypingAnimationComponent/>
          <TextInput
            style={styles.input}
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
            placeholderTextColor="white"
            secureTextEntry={true}
            onChangeText={(password) => setPassword(password)}
          />

          <TouchableOpacity
            style={[styles.button, { backgroundColor: "#f8146b" }]}
            onPress={onSignUpPress}
          >
            <Text style={[styles.buttonText, { color: "white", fontSize: 18 }]}>
              Sign Up
            </Text>
          </TouchableOpacity>
       
      </View>

      {pendingVerification && (
        <View>
          <TextInput
            value={code}
            placeholder="Code..."
            onChangeText={(code) => setCode(code)}
          />
          <TouchableOpacity onPress={onPressVerify}>
            <Text>Verify Email</Text>
          </TouchableOpacity>
        </View>
      )}
      <Button
        title="Already have an account?"
        onPress={() => navigation.navigate("Log In?")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#130c20",
  },

  header: {
    backgroundColor: "#130c20",
    padding: 15,
    alignSelf: "flex-start", // Align to the left
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
    alignItems: "center",
    paddingHorizontal: 20,
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