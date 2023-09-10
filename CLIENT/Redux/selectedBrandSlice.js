import { createSlice } from '@reduxjs/toolkit'

export const selectedBrandSlice = createSlice({
  name: 'selectedBrand',
  initialState: { "label": "OTHER", "value": 0 },
  reducers: {
    setBrand: (state, action) => {
      state.value = action.payload
    },
  },  
})

export const { setBrand } = selectedBrandSlice.actions

export default selectedBrandSlice.reducer