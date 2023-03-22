import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import { listCommentAPI } from "../../config/baseAPI"
import { toast } from "react-toastify"
import { toastCss } from "../toastCss"
import axiosInstance from "../../config/customAxios";
import { UPDATE_SUCCESS, UPDATE_FAIL, DELETE_SUCCESS, DELETE_FAIL } from "../../config/constant"

const initState = {
    listComment: [],
    pagination: [],
    status: false,
    index: 0,
    pageSize: 3,
    totalPage: 10,
    statusUpdateComment: false,
    isUpdateComment: false,
    statusDeleteComment: false,
    isDeleteComment: false,
    statusAddComment: false,
    isAddComment: false,
    message: ''
}

const listCommentSlice = createSlice({
    name: 'listComment',
    initialState: initState,
    reducers: {
        setlistComment: (state, action) => {
            state.listComment = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllComment.pending, (state, action) => {
                state.status = true
            })
            .addCase(fetchAllComment.fulfilled, (state, action) => {
                state.listComment = action.payload;
                state.status = false;
                state.pageNumber = action.payload.pageNumber;
                // state.totalPage = action.payload.totalPages;
                // state.isUpdateComment = false;
                // state.isDeleteComment = false;
                // state.isAddComment = false;
                state.message = action.payload.message
            })
            // .addCase(updateComment.pending, (state, action) => {
            //     state.statusUpdateComment = true
            // })
            // .addCase(updateComment.fulfilled, (state, action) => {
            //     state.isUpdateComment = true
            // })
            // .addCase(deleteComment.pending, (state, action) => {
            //     state.statusDeleteComment = true
            // })
            // .addCase(deleteComment.fulfilled, (state, action) => {
            //     state.isDeleteComment = true
            // })
            // .addCase(addComment.pending, (state, action) => {
            //     state.statusAddComment = true
            // })
            // .addCase(addComment.fulfilled, (state, action) => {
            //     state.isAddComment = true
            // })
    }
})

export const fetchAllComment = createAsyncThunk('listComment/fetchAllComment', async (paramsSearch) => {
    try {
        const res = await axiosInstance.get(listCommentAPI, {
            params: paramsSearch,
        })
        return res.data
    } catch (error) {
        console.log(error)
    }
})

// export const updateComment = createAsyncThunk('listComment/updateComment', async (data) => {
//     // console.log(data.CommentId)
//     try {
//         const res = await axiosInstance.put(
//             updateCommentAPI + data.id, data
//         )
//         console.log(res)
//         toast.success(UPDATE_SUCCESS, toastCss)
//         return res.data
//     } catch (error) {
//         console.log(error)
//         toast.error(UPDATE_FAIL, toastCss)

//     }
// })

// export const deleteComment = createAsyncThunk('listComment/deleteComment', async (CommentId) => {
//     console.log(CommentId)
//     try {
//         const res = await axiosInstance.delete(deleteCommentAPI + CommentId)
//         toast.success(DELETE_SUCCESS, toastCss)
//         return CommentId
//     } catch (error) {
//         toast.error(DELETE_FAIL, toastCss)

//     }
// })

// export const addComment = createAsyncThunk('listComment/addComment', async (values) => {
//     try {
//         const formValue = {
//             name: values.name,
//             email: values.email,
//             gender: values.gender,
//             status: values.status

//         }
//         console.log(values)
//         const res = await axiosInstance.Comment(addCommentAPI, formValue)
//         toast.success("Thêm mới thành công !!!!!", toastCss)
//         console.log(res.data)
//         return res.data
//     } catch (error) {
//         console.log(error)
//         toast.error('Thêm mới thất bại :(', toastCss)
//     }
// })
export const { setlistComment } = listCommentSlice.actions;
export default listCommentSlice.reducer;