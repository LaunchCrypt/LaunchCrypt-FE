import { configureStore } from '@reduxjs/toolkit'
import networkReducer from "./slice/networkSlice"
export default configureStore({
  reducer: {
    network: networkReducer,
  },
})