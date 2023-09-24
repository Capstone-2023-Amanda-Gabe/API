import { createDrawerNavigator } from "@react-navigation/drawer";
import CalendarScreen from "../Screens/Authorized/Calendar";
import ProfileScreen from "../Screens/Authorized/Profile";
import WeatherScreen from "../Screens/Authorized/Weather";
const Drawer = createDrawerNavigator();

const AuthorizedDrawer = () => {
  return (
    <Drawer.Navigator initialRouteName="Calendar">
      <Drawer.Screen name="Calendar" component={CalendarScreen}></Drawer.Screen>
      <Drawer.Screen name="Profile" component={ProfileScreen}></Drawer.Screen>
      <Drawer.Screen name="Weather" component={WeatherScreen}></Drawer.Screen>
      <Drawer.Screen name="CreateClothes" component={WeatherScreen}></Drawer.Screen>
    </Drawer.Navigator>
  );
};

export default AuthorizedDrawer;
