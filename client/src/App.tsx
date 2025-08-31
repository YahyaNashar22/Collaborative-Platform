import { ToastContainer } from "react-toastify";
import "./App.css";
import AppRoutes from "./routes/AppRoutes";
import { UserProvider } from "./context/UserContext";

function App() {
  return (
    <>
      <UserProvider>
        <AppRoutes />
        <ToastContainer
          position="bottom-right"
          autoClose={1000}
          hideProgressBar={true}
          newestOnTop
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </UserProvider>
    </>
  );
}

export default App;
