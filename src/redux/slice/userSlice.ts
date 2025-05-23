import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  address: "",
  balance: 0,
}
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
    },

    resetUser: () => initialState,
  },
})

// Action creators are generated for each case reducer function
export const { updateUserBalance, updateUserAddress, resetUser } = userSlice.actions

export default userSlice.reducer