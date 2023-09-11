// import React from 'react';
import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from "react-native";

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate("Sign Up?");
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: "https://ucarecdn.com/c3085489-a0fb-45d3-8e96-819c44eae0eb/",
        }}
        style={styles.logo}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#001f3f",
  },

  logo: {
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
});

// import React from 'react';
// import { StyleSheet, Text, TextInput, TouchableOpacity, View, Button} from 'react-native';

// export default function WelcomeScreen({ navigation }) {
//     return(
//         <View style = {styles.container}>
//             <TouchableOpacity
//             style={styles.button}
//             onPress={() => navigation.navigate('Sign In?')}>

//             <Text style={styles.text}  onPress={() => navigation.navigate('Sign In?')}>Welcome To LookLog</Text>
//          </TouchableOpacity>
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: '#f2f2',
//     },

//     button:{
//         backgroundColor: '#FF3366',
//         paddingVertical: 15,
//         paddingHorizontal: 30,
//         borderRadius: 8,
//         elevation: 3,
//         shadowColor: 'black',
//         shadowOffset: { width: 1, height: 1 },
//         shadowOppacity: 0.4,
//         shadowRadius: 2
//     },
//     text: {
//         fontSize: 20,
//         fontWeight: 'bold',
//         color: 'white',
//     },
// });
