import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.ts";

import Loading from "../shared/Loading/Loading.tsx";
import MainLayout from "../Layouts/MainLayout/MainLayout.tsx";
import DashboardEntryLayout from "../Layouts/DashboardEntryLayout.tsx";
import DashboardSideLayout from "../Layouts/DashboardSideLayout.tsx";
import PrivateRoute from "./PrivateRoute.tsx";

const FAQPage = lazy(() => import("../pages/MainPages/FAQPage/FAQPage.tsx"));
const SignUpPage = lazy(
  () => import("../pages/MainAuthPages/Signup/SignUpPage.tsx"),
);
const AboutPage = lazy(
  () => import("../pages/MainPages/AboutPage/AboutPage.tsx"),
);
const TermsPage = lazy(
  () => import("../pages/MainPages/TermsPage/TermsPage.tsx"),
);
const ContactPage = lazy(
  () => import("../pages/MainPages/ContactPage/ContactPage.tsx"),
);
const EntryPage = lazy(
  () => import("../pages/MainAuthPages/Entry/EntryPage.tsx"),
);
const HomePage = lazy(() => import("../pages/MainPages/HomePage/HomePage.tsx"));
const ProjectsPage = lazy(
  () => import("../pages/Dashboard/ProjectsPage/ProjectsPage.tsx"),
);
const NotFound = lazy(() => import("../pages/NotFound/NotFound.tsx"));
const LoginPage = lazy(
  () => import("../pages/MainAuthPages/Login/LoginPage.tsx"),
);
const DashboardPage = lazy(
  () => import("../pages/Dashboard/DashboardPage/DashboardPage.tsx"),
);
const RequestsPage = lazy(
  () => import("../pages/Dashboard/RequestsPage/RequestsPage.tsx"),
);
const ServicesPage = lazy(
  () => import("../pages/Dashboard/ServicesPage/ServicesPage.tsx"),
);
const UsersPage = lazy(
  () => import("../pages/Dashboard/UsersPage/UsersPage.tsx"),
);
const MarketPlacePage = lazy(
  () => import("../pages/MainPages/MarketPlacePage/MarketPlacePage.tsx"),
);
const ProfilePage = lazy(() => import("../pages/ProfilePage/ProfilePage.tsx"));

const AppRoutes = () => {
  const { user, loading } = useAuth();

  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route
            path="/Market_place"
            element={<MarketPlacePage user={user} />}
          />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/FAQ" element={<FAQPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Route>

        {/* Authorization routes */}
        {/* Layout for EntryPage without sidebar */}
        <Route path="auth/:role" element={<DashboardEntryLayout />}>
          <Route index element={<EntryPage />} />
        </Route>

        {/* Layout for SignUp and Login with sidebar */}
        <Route path="auth/:role" element={<DashboardSideLayout />}>
          {/* provider route */}
          <Route path="register" element={<SignUpPage />} />
          {/* user route */}
          <Route path="register/:plan" element={<SignUpPage />} />
          <Route path="login" element={<LoginPage />} />
        </Route>

        {/* protected routes */}
        <Route element={<PrivateRoute user={user} loading={loading} />}>
          <Route path="/dashboard" element={<DashboardSideLayout />}>
            {/* <Route index element={<Navigate to="projects" replace />} /> */}
            <Route index element={<DashboardPage />} />
            <Route path="projects" element={<ProjectsPage />} />
            <Route path="requests" element={<RequestsPage />} />
            {/* <Route path="proposals" element={<ProposalsPage />} /> */}
            <Route
              path="clients"
              element={<UsersPage currentUsersRole="client" />}
            />
            <Route
              path="providers"
              element={<UsersPage currentUsersRole="provider" />}
            />
            <Route path="services" element={<ServicesPage />} />
            <Route
              path="profile"
              element={<ProfilePage userId={user?._id as string} />}
            />
          </Route>
        </Route>
        {/* Not Found Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
