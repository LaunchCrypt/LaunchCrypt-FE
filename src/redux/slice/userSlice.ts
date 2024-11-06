import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    address: "",
    balance: 0,
  },
  reducers: {
    updateUserBalance: (state, action) => {
      state.balance = action.payload
    },

    updateUserAddress: (state, action) => {
      state.address = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { updateUserBalance, updateUserAddress } = userSlice.actions

export default userSlice.reducer