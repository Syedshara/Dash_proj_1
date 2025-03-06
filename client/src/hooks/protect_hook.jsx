import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";

export const ProtectedRoute = () => {
    const userToken = Cookies.get("user_token");

    return userToken ? <Outlet /> : <Navigate to="/signin" />;
};

export default ProtectedRoute;
