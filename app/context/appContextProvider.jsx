import React from "react";
import { useState } from "react";
import AppContext from "./appContext";
export default function AppContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [location, setLocation] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [clothingBrand, setClothingBrand] = useState(null);

  const context = {
    weatherData,
    setWeatherData,
    user,
    setUser,
    selectedDay,
    setSelectedDay,
    location,
    setLocation,
    clothingBrand,
    setClothingBrand,
  };

  return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
}
