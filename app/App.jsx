import { NavigationContainer } from "@react-navigation/native"; 
import "react-native-gesture-handler";
import AppContextProvider from "./context/appContextProvider";
import Router from "./routing/routing";
export default function App() {

  return (
    <AppContextProvider>
      <NavigationContainer>
        <Router/>
      </NavigationContainer>
    </AppContextProvider>
  );
}
