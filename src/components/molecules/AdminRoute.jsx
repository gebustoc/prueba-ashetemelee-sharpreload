import React from 'react';
import { Navigate } from 'react-router-dom';
import UserService from '../../services/UserService';

const AdminRoute = ({children}) => {
    if (UserService.isAuthenticated() && UserService.isAdmin()) {
        return children
    } else {
        return <Navigate to="/"/>
    }
};

export default AdminRoute
