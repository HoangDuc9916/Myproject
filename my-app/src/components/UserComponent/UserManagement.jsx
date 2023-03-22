import React from 'react';
import Dashboard from '../HomeComponent/HomePage';
import UserManagementContent from './UserManagementContent';

const UserManagement = () => {
    return (
        <>
            <Dashboard component={<UserManagementContent />} />
        </>
    )
}

export default UserManagement;