import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../slices/users/userSlices";
import categoriesReducer from "../slices/category/categorySlice"

const store = configureStore({
  reducer: {
    users: usersReducer,
    category : categoriesReducer ,
  },
});


export default store;