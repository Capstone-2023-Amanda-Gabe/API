import React from "react";
import { ImageBackground,Text, TextInput, TouchableOpacity, View, StyleSheet } from "react-native";
import { useSignIn } from "@clerk/clerk-expo";
import { Button } from "react-native";

export default function SignInScreen({ navigation }) {
  const image = {url : 'https://i.pinimg.com/originals/b6/76/ba/b676ba0be8f3dab0d464d83ea0d2ba14.jpg'}
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
      await setActive({ session: completeSignIn.createdSessionId });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <View style={styles.content}>
     
        <TextInput
        styles={styles.input}
        style={{color: 'white'}}
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
        
        <TouchableOpacity style={[styles.button, { backgroundColor: '#40050d' }]} onPress={onSignInPress}>
  <Text style={[styles.buttonText, { color: 'white',fontSize: 18 }]}>Sign In</Text>
</TouchableOpacity>


      {/* <Button
        title="Sign Up?"
        onPress={() => navigation.navigate('Sign Up?')}
      /> */}
      </View>
     
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    width: "100%",
    // alignItems: "center",
    // justifyContent: "center",
    // paddingHorizontal: 20,
   
  },
  image:{
    flex: 1,
    width: "100%",
    
  },
  content:{
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "rgba(0,0,0,0.5)",
  },

  input: {
    width: "100%",
    marginBottom: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    color:"white",
   
  },
  button:{
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    color: "white",
  },
  buttonText: {
    color: "white",
    fontSize: 50,
    textAlign: "center"
  },
 
});