import { configureStore } from '@reduxjs/toolkit'
import selectedDayReducer from './selectedDaySlice'
import selectedBrandReducer from './selectedBrandSlice'
export const store = configureStore({
  reducer: {
    selectedDay: selectedDayReducer,
    selectedBrand: selectedBrandReducer,
  },
})
