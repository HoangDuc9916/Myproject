import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  listUserAPI,
  addUserAPI,
  updateUserAPI,
  deleteUserAPI,
  getUserByIdAPI,
} from "../../config/baseAPI";
import { toast } from "react-toastify";
import { toastCss } from "../toastCss";
import axiosInstance from "../../config/customAxios";
import {
  UPDATE_SUCCESS,
  UPDATE_FAIL,
  DELETE_SUCCESS,
  DELETE_FAIL,
} from "../../config/constant";

const initState = {
  listUser: [],
  pagination: [],
  status: false,
  index: 0,
  pageSize: 3,
  totalPage: 10,
  statusUpdateUser: false,
  isUpdateUser: false,
  statusDeleteUser: false,
  isDeleteUser: false,
  statusAddUser: false,
  isAddUser: false,
  message: "",
};

const listUserSlice = createSlice({
  name: "listUser",
  initialState: initState,
  reducers: {
    setListUser: (state, action) => {
      state.listUser = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUser.pending, (state, action) => {
        state.status = true;
      })
      .addCase(fetchAllUser.fulfilled, (state, action) => {
        state.listUser = action.payload;
        state.status = false;
        state.pageNumber = action.payload.pageNumber;
        state.totalPage = action.payload.totalPages;
        state.isUpdateUser = false;
        state.isDeleteUser = false;
        state.isAddUser = false;
        state.message = action.payload.message;
      })
      .addCase(updateUser.pending, (state, action) => {
        state.statusUpdateUser = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isUpdateUser = true;
      })
      .addCase(deleteUser.pending, (state, action) => {
          state.statusDeleteUser = true
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
          state.isDeleteUser = true
      })
      .addCase(addUser.pending, (state, action) => {
        state.statusAddUser = true;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.isAddUser = true;
      });
  },
});

export const fetchAllUser = createAsyncThunk(
  "listUser/fetchAllUser",
  async (paramsSearch) => {
    try {
      const res = await axiosInstance.get(listUserAPI, {
        params: paramsSearch,
      });
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const updateUser = createAsyncThunk(
  "listUser/updateUser",
  async (data) => {
    // console.log(data.userId)
    try {
      const res = await axiosInstance.put(updateUserAPI + data.id, data);
      console.log(res);
      toast.success(UPDATE_SUCCESS, toastCss);
      return res.data;
    } catch (error) {
      console.log(error);
      toast.error(UPDATE_FAIL, toastCss);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "listUser/deleteUser",
  async (userId) => {
    console.log(userId);
    try {
      const res = await axiosInstance.delete(deleteUserAPI + userId);
      toast.success(DELETE_SUCCESS, toastCss);
      return userId;
    } catch (error) {
      toast.error(DELETE_FAIL, toastCss);
    }
  }
);

export const addUser = createAsyncThunk("listUser/addUser", async (values) => {
  try {
    const formValue = {
      name: values.name,
      email: values.email,
      gender: values.gender,
      status: values.status,
    };
    console.log(values);
    const res = await axiosInstance.post(addUserAPI, formValue);
    toast.success("Thêm mới thành công !!!!!", toastCss);
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error);
    toast.error("Thêm mới thất bại :(", toastCss);
  }
});

export const fetchUserById = createAsyncThunk(
  "listUser/fetchUserById",
  async (userId, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const res = await axiosInstance.get(getUserByIdAPI + userId);
      dispatch(setLoading(false));
      return res.data;
    } catch (error) {
      dispatch(setLoading(false));
      console.log(error);
    }
  }
);

export const { setListUser,setLoading } = listUserSlice.actions;
export default listUserSlice.reducer;
