import { ENV } from "@/config";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authReducer";
import cacheReducer from "./cacheReducer";

const reducer = {
  auth: authReducer,
  cache: cacheReducer,
};
const store = configureStore({
  reducer,
  // middleware: (getDefaultMiddlware) => getDefaultMiddlware().concat(...[]),
  devTools: import.meta.env.VITE_ENV === "development",
});
export default store;
