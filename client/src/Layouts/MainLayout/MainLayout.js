import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Outlet } from "react-router-dom";
import Header from "../../shared/Header/Header";
import Footer from "../../shared/Footer/Footer";
import { useAuth } from "../../hooks/useAuth";
const MainLayout = () => {
    const { user } = useAuth();
    return (_jsxs(_Fragment, { children: [_jsx(Header, { user: user }), _jsx(Outlet, { context: { user } }), _jsx(Footer, {})] }));
};
export default MainLayout;
