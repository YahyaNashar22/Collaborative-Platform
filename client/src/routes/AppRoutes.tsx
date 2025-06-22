import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import Loading from "../shared/Loading/Loading.tsx";
import MainLayout from "./MainLayout.tsx";
import DashboardLayout from "./DashboardLayout.tsx";
import AboutPage from "../pages/AboutPage/AboutPage.tsx";
import TermsPage from "../pages/TermsPage/TermsPage.tsx";
import FAQPage from "../pages/FAQPage/FAQPage.tsx";
import ContactPage from "../pages/ContactPage/ContactPage.tsx";

const HomePage = lazy(() => import("../pages/HomePage/HomePage.tsx"));
const ClientSignupPage = lazy(
  () => import("../pages/SignupClient/ClientSignupPage.tsx")
);
const ProviderSignupPage = lazy(
  () => import("../pages/SignupProvider/ProviderSignupPage.tsx")
);
const LoginPage = lazy(() => import("../pages/Login/LoginPage.tsx"));

const DashboardPage = lazy(
  () => import("../pages/Dashboard/DashboardPage.tsx")
);
const ActiveProjectsPage = lazy(
  () => import("../pages/ActiveProjects/ActiveProjects.tsx")
);
const RequestManagerPage = lazy(
  () => import("../pages/RequestManager/RequestManager.tsx")
);
const ManageServicesPage = lazy(
  () => import("../pages/ManageServices/ManageServices.tsx")
);
const UsersListPage = lazy(() => import("../pages/UsersList/UsersList.tsx"));
const ServicesPagePage = lazy(
  () => import("../pages/ServicesPage/ServicesPage.tsx")
);

const NotFound = lazy(() => import("../pages/NotFound/NotFound.tsx"));

const AppRoutes = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/FAQ" element={<FAQPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Route>

        <Route path="/client-sign-up" element={<ClientSignupPage />} />
        <Route path="/provider-sign-up" element={<ProviderSignupPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* protected routes */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route
            path="/dashboard/active-projects"
            element={<ActiveProjectsPage />}
          />
          <Route
            path="/dashboard/request-manager"
            element={<RequestManagerPage />}
          />
          <Route
            path="/dashboard/manage-services"
            element={<ManageServicesPage />}
          />
          <Route path="/dashboard/users-list" element={<UsersListPage />} />
          <Route path="/dashboard/services" element={<ServicesPagePage />} />
        </Route>
        {/* Not Found Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
