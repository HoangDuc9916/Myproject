import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { getUserByIdAPI } from "../../config/baseAPI";
import axiosInstance from "../../config/customAxios";

const initState = {
  choosenUser: {},
  status: false,
  statusUser: false,
  statusDeleteUser: false,
  name: "",
  email: "",
  gender: false,
//   status: false,
};
const choosenUserSlice = createSlice({
  name: "choosenUser",
  initialState: initState,
  reducers: {
    setChoosenUser: (state, action) => {
      state.choosenUser = action.payload;
    },
    setName: (state, action) => {
      state.name = action.payload;
    },

    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setGender: (state, action) => {
      state.gender = action.payload;
    },
    setStatus: (state, action) => {
      state.statusUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state, action) => {
        state.status = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.choosenUser = action.payload;
        state.name = action.payload.name;
        state.email = action.payload.email;
        state.gender = action.payload.gender;
        state.status = false;
        state.statusUser = action.payload.statusUser;
      })
;
  },
});
export const fetchUser = createAsyncThunk("users/fetchUser", async (userId) => {
  try {
    const res = await axiosInstance.get(getUserByIdAPI + userId);
    return res.data;
  } catch (error) {
    console.log(error);
  }
});

export const {
  setChoosenUser,
  setName,
  setEmail,
  setGender,
  setStatus
} = choosenUserSlice.actions;
export default choosenUserSlice.reducer;
