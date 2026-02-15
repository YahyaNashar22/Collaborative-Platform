import { ToastContainer } from "react-toastify";
import "./App.css";
import AppRoutes from "./routes/AppRoutes";
import { UserProvider } from "./context/UserContext";
import { useEffect } from "react";
import { useLanguageStore } from "./translation/langStore";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";

function App() {
  const { language, setLanguage } = useLanguageStore();
  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

  useEffect(() => {
    document.body.setAttribute("dir", language === "ar" ? "rtl" : "ltr");

    const root = document.documentElement;

    if (language === "ar") {
      root.style.fontSize = "120%"; // 1.2x
    } else {
      root.style.fontSize = "100%";
    }
  }, [language]);

  return (
    <>
      <I18nextProvider i18n={i18n}>
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

          <div className="language-btn-container">
            <button onClick={() => setLanguage("en")}>English</button>
            <button onClick={() => setLanguage("ar")}>العربية</button>
          </div>
        </UserProvider>
      </I18nextProvider>
    </>
  );
}

export default App;
