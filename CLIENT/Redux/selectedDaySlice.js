import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: {"dateString": "2023-08-23", "day": 23, "month": 8, "timestamp": 1692748800000, "year": 2023},
}

export const selectedDaySlice = createSlice({
  name: 'selectedDay',
  initialState,
  reducers: {
    setDay: (state, action) => {
      state.value = action.payload
    },
  },
})

export const { setDay } = selectedDaySlice.actions

export default selectedDaySlice.reducer