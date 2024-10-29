import { createSlice } from '@reduxjs/toolkit'

export const newTokenSlice = createSlice({
    name: 'newToken',
    initialState: {
        name: "",
        symbol: "",
        image:"",
        description: "",
        fee:0,
        totalSupply: 1000000000,
        website: "",
        social: [],
        whitepaper: "",
    },
    reducers: {
        changeNewTokenData: (state, action) => {
            state = action.payload;
        },
    },
})

// Action creators are generated for each case reducer function
export const { changeNewTokenData } = newTokenSlice.actions

export default newTokenSlice.reducer