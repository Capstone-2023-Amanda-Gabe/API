import 'react-native-gesture-handler';
import React from "react";
import { ClerkProvider, SignedIn, SignedOut, } from "@clerk/clerk-expo";
import { store } from './Redux/store'
import { Provider } from 'react-redux'
import { NavigationContainer } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "react-query";
const CLERK_PUBLISHABLE_KEY ="pk_test_cHJvbXB0LWtpdC03Ni5jbGVyay5hY2NvdW50cy5kZXYk";
import LoggedinNavigation from "./pages/Authorized";
import SignedOutNavigation from './pages/Unauthorized';
import { PaperProvider } from 'react-native-paper';
import tokenCache from './misc/tokenCashe';

export default function App() {

  const queryClient = new QueryClient();

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY} tokenCache={tokenCache}>
          <PaperProvider>
          <NavigationContainer>
            <SignedIn>
              <LoggedinNavigation/>
            </SignedIn>
            <SignedOut>
              <SignedOutNavigation/>
            </SignedOut>
          </NavigationContainer>
          </PaperProvider>
        </ClerkProvider>
      </QueryClientProvider>
    </Provider>
  );
}