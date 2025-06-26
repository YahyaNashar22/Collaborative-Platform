import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import Loading from "../shared/Loading/Loading.tsx";
import DashboardLayout from "../Layouts/DashboardLayout.tsx";

import FAQPage from "../pages/MainPages/FAQPage/FAQPage.tsx";

import SignUpPage from "../pages/MainAuthPages/Signup/SignUpPage.tsx";
import AboutPage from "../pages/MainPages/AboutPage/AboutPage.tsx";
import TermsPage from "../pages/MainPages/TermsPage/TermsPage.tsx";
import ContactPage from "../pages/MainPages/ContactPage/ContactPage.tsx";
import MainLayout from "../Layouts/MainLayout.tsx";
import EntryPage from "../pages/MainAuthPages/Entry/EntryPage.tsx";

const HomePage = lazy(() => import("../pages/MainPages/HomePage/HomePage.tsx"));
const ClientSignupPage = lazy(
  () => import("../pages/SignupClient/ClientSignupPage.tsx")
);
const ProviderSignupPage = lazy(
  () => import("../pages/SignupProvider/ProviderSignupPage.tsx")
);
const LoginPage = lazy(
  () => import("../pages/MainAuthPages/Login/LoginPage.tsx")
);

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
  () => import("../pages/MainPages/ServicesPage/ServicesPage.tsx")
);

const NotFound = lazy(() => import("../pages/NotFound/NotFound.tsx"));

const AppRoutes = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/FAQ" element={<FAQPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Route>

        <Route path="/client-sign-up" element={<ClientSignupPage />} />
        <Route path="/provider-sign-up" element={<ProviderSignupPage />} />

        {/* AUthorization routes */}
        <Route path="/auth" element={<DashboardLayout />}>
          <Route index element={<EntryPage />} />
          <Route path="sign-up" element={<SignUpPage />} />
          <Route path="login" element={<LoginPage />} />
        </Route>

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
