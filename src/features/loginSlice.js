import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLogined: Boolean(localStorage.getItem("user-mwm")),
  name: JSON.parse(localStorage.getItem("user-mwm")).name,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setUser(state, action) {
      const userData = action.payload;
      state.isLogined = true;
      state.name = userData.name;
    },
    removeUser(state, action) {
      state.isLogined = false;
      state.name = "";
    },
  },
});

export const { setUser, removeUser } = loginSlice.actions;
export default loginSlice.reducer;
