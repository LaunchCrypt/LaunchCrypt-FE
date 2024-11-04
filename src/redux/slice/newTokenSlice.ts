import { createSlice } from '@reduxjs/toolkit'

export const newTokenSlice = createSlice({
    name: 'newToken',
    initialState: {
        name: "",
        symbol: "",
        image: File,
        description: "",
        fee: 0,
        totalSupply: 1000000000,
        socialLinks: {website: "", twitter: "", telegram: "", discord: "", medium: ""},
    },
    reducers: {
        changeNewTokenData: (state, action) => {
            return { ...state, ...action.payload };
        },
    },
})

// Action creators are generated for each case reducer function
export const { changeNewTokenData } = newTokenSlice.actions

export default newTokenSlice.reducer