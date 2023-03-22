import { configureStore } from "@reduxjs/toolkit";
import choosenUserSlice from "./UserSlice/choosenUserSlice";
import listUserSlice from "./UserSlice/listUserSlice";

import listPostSlice from "./PostSlice/listPostSlice";
import listCommentSlice from "./CommentSlice/listCommentSlice";
import listTodoSlice from "./TodoSlice/listTodoSlice";

import modalSlice from "./modalSlice";

const store = configureStore({
    reducer: {
        listUser: listUserSlice,
        modal: modalSlice,
        choosenUser: choosenUserSlice,  
        
        listPost: listPostSlice,

        listComment: listCommentSlice,

        listTodo: listTodoSlice
    }
})

export default store;