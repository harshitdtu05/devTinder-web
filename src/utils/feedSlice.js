import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: null,
  reducers: {
    addToFeed: (state, action) => {
      return action.payload;
    },
    removeFromFeed: (state, action) => {
      const newArray = state.filter((user) => user._id !== action.payload);
      return newArray;
    },
  },
});

export const { addToFeed, removeFromFeed } = feedSlice.actions;
export default feedSlice.reducer;
