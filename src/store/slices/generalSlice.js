import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  channelId: null,
};

export const generalSlice = createSlice({
  name: "generalSlice",
  initialState,
  reducers: {
    setGeneralFields: (state, { payload }) => ({ ...state, ...payload }),
    enterRoom: (state, action) => {
      state.channelId = action.payload.channelId;
    },
  },
});

export const { setGeneralFields, enterRoom } = generalSlice.actions;

export default generalSlice.reducer;
