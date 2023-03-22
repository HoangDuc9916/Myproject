import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import { listTodoAPI } from "../../config/baseAPI"
import { toast } from "react-toastify"
import { toastCss } from "../toastCss"
import axiosInstance from "../../config/customAxios";
import { UPDATE_SUCCESS, UPDATE_FAIL, DELETE_SUCCESS, DELETE_FAIL } from "../../config/constant"

const initState = {
    listTodo: [],
    pagination: [],
    status: false,
    index: 0,
    pageSize: 3,
    totalPage: 10,
    statusUpdateTodo: false,
    isUpdateTodo: false,
    statusDeleteTodo: false,
    isDeleteTodo: false,
    statusAddTodo: false,
    isAddTodo: false,
    message: ''
}

const listTodoSlice = createSlice({
    name: 'listTodo',
    initialState: initState,
    reducers: {
        setlistTodo: (state, action) => {
            state.listTodo = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllTodo.pending, (state, action) => {
                state.status = true
            })
            .addCase(fetchAllTodo.fulfilled, (state, action) => {
                state.listTodo = action.payload;
                state.status = false;
                state.pageNumber = action.payload.pageNumber;
                // state.totalPage = action.payload.totalPages;
                // state.isUpdateTodo = false;
                // state.isDeleteTodo = false;
                // state.isAddTodo = false;
                state.message = action.payload.message
            })
            // .addCase(updateTodo.pending, (state, action) => {
            //     state.statusUpdateTodo = true
            // })
            // .addCase(updateTodo.fulfilled, (state, action) => {
            //     state.isUpdateTodo = true
            // })
            // .addCase(deleteTodo.pending, (state, action) => {
            //     state.statusDeleteTodo = true
            // })
            // .addCase(deleteTodo.fulfilled, (state, action) => {
            //     state.isDeleteTodo = true
            // })
            // .addCase(addTodo.pending, (state, action) => {
            //     state.statusAddTodo = true
            // })
            // .addCase(addTodo.fulfilled, (state, action) => {
            //     state.isAddTodo = true
            // })
    }
})

export const fetchAllTodo = createAsyncThunk('listTodo/fetchAllTodo', async (paramsSearch) => {
    try {
        const res = await axiosInstance.get(listTodoAPI, {
            params: paramsSearch,
        })
        return res.data
    } catch (error) {
        console.log(error)
    }
})

// export const updateTodo = createAsyncThunk('listTodo/updateTodo', async (data) => {
//     // console.log(data.TodoId)
//     try {
//         const res = await axiosInstance.put(
//             updateTodoAPI + data.id, data
//         )
//         console.log(res)
//         toast.success(UPDATE_SUCCESS, toastCss)
//         return res.data
//     } catch (error) {
//         console.log(error)
//         toast.error(UPDATE_FAIL, toastCss)

//     }
// })

// export const deleteTodo = createAsyncThunk('listTodo/deleteTodo', async (TodoId) => {
//     console.log(TodoId)
//     try {
//         const res = await axiosInstance.delete(deleteTodoAPI + TodoId)
//         toast.success(DELETE_SUCCESS, toastCss)
//         return TodoId
//     } catch (error) {
//         toast.error(DELETE_FAIL, toastCss)

//     }
// })

// export const addTodo = createAsyncThunk('listTodo/addTodo', async (values) => {
//     try {
//         const formValue = {
//             name: values.name,
//             email: values.email,
//             gender: values.gender,
//             status: values.status

//         }
//         console.log(values)
//         const res = await axiosInstance.Todo(addTodoAPI, formValue)
//         toast.success("Thêm mới thành công !!!!!", toastCss)
//         console.log(res.data)
//         return res.data
//     } catch (error) {
//         console.log(error)
//         toast.error('Thêm mới thất bại :(', toastCss)
//     }
// })
export const { setlistTodo } = listTodoSlice.actions;
export default listTodoSlice.reducer;