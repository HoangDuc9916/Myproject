import React from 'react';
import Dashboard from '../HomeComponent/HomePage';
import CommentManagementContent from './CommentManagementContent';

const CommentManagement = () => {
    return (
        <>
            <Dashboard component={<CommentManagementContent />} />
        </>
    )
}

export default CommentManagement;