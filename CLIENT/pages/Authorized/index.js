import { createDrawerNavigator } from "@react-navigation/drawer";
import CalendarComponent from "../../components/calendar";
import OutfitPage from "./outfitbuilder";
import CreateClothesPage from "./createClothes";
import DayComponent from "./day";
import { Button } from "react-native";
import { useSelector } from "react-redux";
export default function LoggedinNavigation() {

    const Drawer = createDrawerNavigator();
    const { dateString } = useSelector(state => state.selectedDay.value)
  return (
    <Drawer.Navigator initialRouteName="Calendar">
      {/* <Drawer.Screen name="Home" component={LandingPage} /> */}
      <Drawer.Screen name="Calendar" component={CalendarComponent} />
      <Drawer.Screen name="Outfits" component={OutfitPage} />
      <Drawer.Screen name="Create Clothes" component={CreateClothesPage} />
      <Drawer.Screen
      name="Day"
      component={DayComponent}
      options={{
        headerTitle: dateString,
        headerRight: () => (
          <Button
            onPress={() => alert("This is a button!")}
            title="Info"
            color="#fff"
          />
        ),
      }}
    />
    </Drawer.Navigator>
  );
}

