import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import UserManagement from "../components/UserComponent/UserManagement";
import PostManagement from "../components/PostComponent/PostManagement";
import CommentManagement from "../components/CommentComponent/CommentManagement";
import TodoManagement from "../components/TodoComponent/TodoManagement";

const Routing = () => {
  return (
    <Router>
      <Routes>
        <Route path="/todo" element={<TodoManagement />} />
        <Route path="/comment" element={<CommentManagement />} />
        <Route path="/post" element={<PostManagement />} />
        <Route path="/" element={<UserManagement />} />
        <Route path="*" element={<>404 Error</>} />
      </Routes>
    </Router>
  );
};

export default Routing;
