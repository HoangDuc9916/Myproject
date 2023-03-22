import React from 'react';
import Dashboard from '../HomeComponent/HomePage';
import TodoManagementContent from './TodoManagementContent';

const TodoManagement = () => {
    return (
        <>
            <Dashboard component={<TodoManagementContent />} />
        </>
    )
}

export default TodoManagement;