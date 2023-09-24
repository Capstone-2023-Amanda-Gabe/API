import AuthorizedDrawer from "./authorized";
import UnauthorizedStack from "./unauthorized";
import { useContext, useEffect } from "react";
import AppContext from "../context/appContext";
import { FIREBASE_AUTH } from "../FirebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
const Router = () => {
  const { user, setUser } = useContext(AppContext);

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      setUser(user);
    });
  }, []);

  return <>{user ? <AuthorizedDrawer /> : <UnauthorizedStack />}</>;
};

export default Router;
