import React from 'react';
import Dashboard from '../HomeComponent/HomePage';
import PostManagementContent from './PostManagementContent';

const PostManagement = () => {
    return (
        <>
            <Dashboard component={<PostManagementContent />} />
        </>
    )
}

export default PostManagement;