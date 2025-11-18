import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import productReducer from "./productSlice";
import vendorReducer from "./vendorSlice";
import adminReducer from "./adminSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    product: productReducer,
    vendor: vendorReducer,
    admin: adminReducer,
  },
});
