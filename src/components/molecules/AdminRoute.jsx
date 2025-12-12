import React from 'react';
import { Navigate } from 'react-router-dom';
import UserService from '../../services/UserService';

const AdminRoute = ({children}) => {
    return children;
    if (UserService.isAuthenticated() && UserService.isAdmin()) {
    } else {
        return <Navigate to="/"/>
    }
};

export default AdminRoute
