import { configureStore } from "@reduxjs/toolkit";
import Loaderslice from "./Slices/Loaderslice";
import UserSlice from "./Slices/UserSlice";
import CurdSlice from "./Slices/CurdSlice";
const store = configureStore({
  reducer: {
    loader: Loaderslice,
    user: UserSlice,
    curd: CurdSlice,
  },
});

export default store;
