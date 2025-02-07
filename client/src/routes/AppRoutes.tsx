import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import Loading from "../components/Loading/Loading.tsx";
import MainLayout from "./MainLayout.tsx";

const HomePage = lazy(() => import("../pages/HomePage/HomePage.tsx"));
const ClientSignupPage = lazy(
  () => import("../pages/SignupClient/ClientSignupPage.tsx")
);

const NotFound = lazy(() => import("../pages/NotFound/NotFound.tsx"));

const AppRoutes = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
        </Route>

        <Route path="/client-sign-up" element={<ClientSignupPage />} />

        {/* protected routes */}

        {/* Not Found Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
