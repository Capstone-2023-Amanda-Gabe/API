import { useAuth } from "@clerk/clerk-expo";
import { View, Button } from "react-native";


export default function () {
    const SignOut = () => {
        const { isLoaded,signOut } = useAuth();
    
        if (!isLoaded) {
          return null;
        }
        return (
          <View>
            <Button
              title="Sign Out"
              onPress={() => {
                signOut();
              }}
            />
          </View>
        );
      };
    
    return (
        <>
        <SignOut></SignOut>
        </>
    )
}