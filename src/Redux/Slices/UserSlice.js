import { createSlice } from "@reduxjs/toolkit";

const UserSlice = createSlice({
  name: "userSlice",
  initialState: {
    values: [],
  },
  reducers: {
    AddUser: (state, action) => {
      state.values = action.payload;
    },
    setLogin: (state, action) => {
      localStorage.setItem("webToken", JSON.stringify(action.payload));
    },
    setLogout: (state, action) => {
      localStorage.clear();
    },
  },
});

export const { setLogin, setLogout, AddUser } = UserSlice.actions;
export default UserSlice.reducer;
