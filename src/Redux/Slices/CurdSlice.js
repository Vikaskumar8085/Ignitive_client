import { createSlice } from "@reduxjs/toolkit";

const CurdSlice = createSlice({
  name: "CurdSlice",
  initialState: {
    value: [],
  },

  reducers: {
    addTask: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { addTask } = CurdSlice.actions;

export default CurdSlice.reducer;
