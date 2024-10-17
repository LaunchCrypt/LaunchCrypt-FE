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
  },
})

// Action creators are generated for each case reducer function
export const { updateUserBalance } = userSlice.actions

export default userSlice.reducer