import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import { listPostAPI } from "../../config/baseAPI"
import { toast } from "react-toastify"
import { toastCss } from "../toastCss"
import axiosInstance from "../../config/customAxios";
import { UPDATE_SUCCESS, UPDATE_FAIL, DELETE_SUCCESS, DELETE_FAIL } from "../../config/constant"

const initState = {
    listPost: [],
    pagination: [],
    status: false,
    index: 0,
    pageSize: 3,
    totalPage: 10,
    statusUpdatePost: false,
    isUpdatePost: false,
    statusDeletePost: false,
    isDeletePost: false,
    statusAddPost: false,
    isAddPost: false,
    message: ''
}

const listPostSlice = createSlice({
    name: 'listPost',
    initialState: initState,
    reducers: {
        setListPost: (state, action) => {
            state.listPost = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllPost.pending, (state, action) => {
                state.status = true
            })
            .addCase(fetchAllPost.fulfilled, (state, action) => {
                state.listPost = action.payload;
                state.status = false;
                state.pageNumber = action.payload.pageNumber;
                // state.totalPage = action.payload.totalPages;
                // state.isUpdatePost = false;
                // state.isDeletePost = false;
                state.isAddPost = false;
                state.message = action.payload.message
            })
            // .addCase(updatePost.pending, (state, action) => {
            //     state.statusUpdatePost = true
            // })
            // .addCase(updatePost.fulfilled, (state, action) => {
            //     state.isUpdatePost = true
            // })
            // .addCase(deletePost.pending, (state, action) => {
            //     state.statusDeletePost = true
            // })
            // .addCase(deletePost.fulfilled, (state, action) => {
            //     state.isDeletePost = true
            // })
            // .addCase(addPost.pending, (state, action) => {
            //     state.statusAddPost = true
            // })
            // .addCase(addPost.fulfilled, (state, action) => {
            //     state.isAddPost = true
            // })
    }
})

export const fetchAllPost = createAsyncThunk('listPost/fetchAllPost', async (paramsSearch) => {
    try {
        const res = await axiosInstance.get(listPostAPI, {
            params: paramsSearch,
        })
        return res.data
    } catch (error) {
        console.log(error)
    }
})

// export const updatePost = createAsyncThunk('listPost/updatePost', async (data) => {
//     // console.log(data.PostId)
//     try {
//         const res = await axiosInstance.put(
//             updatePostAPI + data.id, data
//         )
//         console.log(res)
//         toast.success(UPDATE_SUCCESS, toastCss)
//         return res.data
//     } catch (error) {
//         console.log(error)
//         toast.error(UPDATE_FAIL, toastCss)

//     }
// })

// export const deletePost = createAsyncThunk('listPost/deletePost', async (PostId) => {
//     console.log(PostId)
//     try {
//         const res = await axiosInstance.delete(deletePostAPI + PostId)
//         toast.success(DELETE_SUCCESS, toastCss)
//         return PostId
//     } catch (error) {
//         toast.error(DELETE_FAIL, toastCss)

//     }
// })

// export const addPost = createAsyncThunk('listPost/addPost', async (values) => {
//     try {
//         const formValue = {
//             name: values.name,
//             email: values.email,
//             gender: values.gender,
//             status: values.status

//         }
//         console.log(values)
//         const res = await axiosInstance.post(addPostAPI, formValue)
//         toast.success("Thêm mới thành công !!!!!", toastCss)
//         console.log(res.data)
//         return res.data
//     } catch (error) {
//         console.log(error)
//         toast.error('Thêm mới thất bại :(', toastCss)
//     }
// })
export const { setListPost } = listPostSlice.actions;
export default listPostSlice.reducer;