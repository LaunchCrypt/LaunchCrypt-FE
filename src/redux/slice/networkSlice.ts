import { createSlice } from '@reduxjs/toolkit'

export const networkSlice = createSlice({
  name: 'network',
  initialState: {
    value: "Avalanche",
  },
  reducers: {
    changeNetwork: (state, action) => {
      state.value = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { changeNetwork } = networkSlice.actions

export default networkSlice.reducer