import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./features/loginSlice";
import logger from "redux-logger";

const store = configureStore({
  reducer: {
    login: loginReducer,
  },
  middleware: [logger],
})

export default store;
