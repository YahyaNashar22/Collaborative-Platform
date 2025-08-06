import { jsx as _jsx } from "react/jsx-runtime";
import { Navigate, Outlet } from "react-router-dom";
const PrivateRoute = ({ user, loading, redirectPath = "/", }) => {
    if (loading)
        return _jsx("small", { className: "loader" });
    if (!user)
        return _jsx(Navigate, { to: redirectPath, replace: true });
    return _jsx(Outlet, {});
};
export default PrivateRoute;
