import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Loading from "../shared/Loading/Loading.tsx";

import FAQPage from "../pages/MainPages/FAQPage/FAQPage.tsx";

import SignUpPage from "../pages/MainAuthPages/Signup/SignUpPage.tsx";
import AboutPage from "../pages/MainPages/AboutPage/AboutPage.tsx";
import TermsPage from "../pages/MainPages/TermsPage/TermsPage.tsx";
import ContactPage from "../pages/MainPages/ContactPage/ContactPage.tsx";
import MainLayout from "../Layouts/MainLayout/MainLayout.tsx";
import EntryPage from "../pages/MainAuthPages/Entry/EntryPage.tsx";
import DashboardEntryLayout from "../Layouts/DashboardEntryLayout.tsx";
import DashboardSideLayout from "../Layouts/DashboardSideLayout.tsx";
import ProjectsPage from "../pages/Dashboard/ProjectsPage/ProjectsPage.tsx";
import RequestsPage from "../pages/Dashboard/RequestsPage/RequestsPage.tsx";
import ProposalsPage from "../pages/Dashboard/ProposalsPage/ProposalsPage.tsx";
import ServicesPage from "../pages/Dashboard/ServicesPage/ServicesPage.tsx";

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

        <Route path="/client-register" element={<ClientSignupPage />} />
        <Route path="/provider-register" element={<ProviderSignupPage />} />

        {/* AUthorization routes */}
        {/* Layout for EntryPage without sidebar */}
        <Route path="auth/:role" element={<DashboardEntryLayout />}>
          <Route index element={<EntryPage />} />
        </Route>

        {/* Layout for SignUp and Login with sidebar */}
        <Route path="auth/:role" element={<DashboardSideLayout />}>
          {/* partner route */}
          <Route path="register" element={<SignUpPage />} />
          {/* user route */}
          <Route path="register/:plan" element={<SignUpPage />} />
          <Route path="login" element={<LoginPage />} />
        </Route>

        {/* protected routes */}
        <Route path="/dashboard" element={<DashboardSideLayout />}>
          <Route index element={<Navigate to="projects" replace />} />
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="requests" element={<RequestsPage />} />
          <Route path="proposals" element={<ProposalsPage />} />
          <Route path="services" element={<ServicesPage />} />
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
