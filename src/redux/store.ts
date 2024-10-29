import { configureStore } from '@reduxjs/toolkit'
import networkReducer from "./slice/networkSlice"
import userReducer from "./slice/userSlice"
import newTokenReducer from "./slice/newTokenSlice"
export default configureStore({
  reducer: {
    network: networkReducer,
    user: userReducer,
    newToken: newTokenReducer,
  },
})