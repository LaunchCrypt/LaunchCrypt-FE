import { configureStore } from '@reduxjs/toolkit'
import networkReducer from "./slice/networkSlice"
import userReducer from "./slice/userSlice"
export default configureStore({
  reducer: {
    network: networkReducer,
    user: userReducer,
  },
})