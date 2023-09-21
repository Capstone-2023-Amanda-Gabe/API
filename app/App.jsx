import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet, Text, View } from "react-native";
import LoginScreen from "./Screens/Unauthorized/Login";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { useEffect, useState } from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH } from "./FirebaseConfig";
import CalendarScreen from "./Screens/Authorized/Calendar";
import "react-native-gesture-handler";
import ProfileScreen from "./Screens/Authorized/Profile";
import AppContextProvider from "./context/appContextProvider";
import AppContext from "./context/appContext";

const Stack = createNativeStackNavigator();

const Drawer = createDrawerNavigator();

const AuthorizedDrawer = () => {
  return (
    <Drawer.Navigator initialRouteName="Calendar">
      <Drawer.Screen name="Calendar" component={CalendarScreen}></Drawer.Screen>
      <Drawer.Screen name="Profile" component={ProfileScreen}></Drawer.Screen>
    </Drawer.Navigator>
  );
};

const UnauthorizedStack = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default function App() {
  const [user, setUser] = useState(null);
  // const { setUser, user } = useContext(AppContext)
  // console.log(useContext(AppContext));
  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      setUser(user);
    });
  }, []);

  return (
    <AppContextProvider>
      <NavigationContainer>
        {user ? <AuthorizedDrawer /> : <UnauthorizedStack />}
      </NavigationContainer>
    </AppContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
