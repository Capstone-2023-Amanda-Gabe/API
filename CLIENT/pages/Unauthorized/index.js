import { createNativeStackNavigator } from '@react-navigation/native-stack';


export default function SignedOutNavigation() {

    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator initialRouteName="Splash">
                <Stack.Screen name="Splash" component={SplashScreen} />
                <Stack.Screen name="Sign Up?" component={SignUpScreen} />
                <Stack.Screen name="Log In?" component={LogInScreen} />
        </Stack.Navigator>
    )
}