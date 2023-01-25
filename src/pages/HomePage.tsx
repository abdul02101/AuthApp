import React, { useState } from 'react';
import { Navigate } from "react-router-dom";
import { useAppSelector } from '../hooks/reduxHooks';

const HomePage =  () => {
    const user = useAppSelector(state => state.user.user)

    return user ? 
    <>
        <p>Email: {user.email}</p>
        <p>Password: {user.password}</p>
    </> 
    : 
    <Navigate to="/login" replace />;
};

export default HomePage;