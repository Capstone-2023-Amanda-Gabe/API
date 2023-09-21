import React from "react";
import { useState } from "react";
import AppContext from "./appContext";
export default function AppContextProvider({ children }) {
  const [user, setUser] = useState(null);

  const context = { user, setUser };

  return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
}
