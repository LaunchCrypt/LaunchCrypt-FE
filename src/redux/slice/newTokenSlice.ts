import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    name: "",
    symbol: "",
    // image will be load in another place
    description: "",
    fee: 0,
    totalSupply: "1000000000",
    socialLinks: { website: "", twitter: "", telegram: "", discord: "", medium: "" },
}

export const newTokenSlice = createSlice({
    name: 'newToken',
    initialState,
    reducers: {
        changeNewTokenData: (state, action) => {
            Object.assign(state, action.payload);
        },

        resetNewTokenData: () => initialState,
    },
})

// Action creators are generated for each case reducer function
export const { changeNewTokenData, resetNewTokenData } = newTokenSlice.actions

export default newTokenSlice.reducer