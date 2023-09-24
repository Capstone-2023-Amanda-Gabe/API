import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../Screens/Unauthorized/Login";

const Stack = createNativeStackNavigator();

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

export default UnauthorizedStack;
