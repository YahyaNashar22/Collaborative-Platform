import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { ToastContainer } from "react-toastify";
import "./App.css";
import AppRoutes from "./routes/AppRoutes";
function App() {
    return (_jsxs(_Fragment, { children: [_jsx(AppRoutes, {}), _jsx(ToastContainer, { position: "bottom-right", autoClose: 1000, hideProgressBar: true, newestOnTop: true, closeOnClick: true, pauseOnFocusLoss: true, draggable: true, pauseOnHover: true })] }));
}
export default App;
