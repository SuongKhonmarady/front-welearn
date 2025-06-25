import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import Homepage from "./page/user/home/Homepage";
import UserAppLayout from "./ui/user/AppLayout";
import AdminAppLayout from "./ui/admin/Applayout";
import Scholarship from "./page/user/scholarshipTimeline/ScholarshipList";
import BrowseScholarships from "./page/user/browseScholarships/BrowseScholarships";
import ChatbotPage from "./page/user/chatbot/ChatbotPage";
import Authentication from "./page/user/auth/Authentication";
import AdminLogin from "./page/admin/auth/AdminLogin";
import Account from "./page/user/account/Account";
import { UserDataProvider } from "./context/user/UserContext";
import { ScholarshipDataProvider } from "./context/scholarship/ScholarshipContext";
import PrivateRoutes from "./ui/shared/PrivateRoute";
import AdminPrivateRoute from "./ui/shared/AdminPrivateRoute";
import RouteNotFound from "./ui/shared/RouteNotFound";
import { ToastContainer } from "react-toastify";
import { DashboardPage, AnalyticsPage, ScholarshipsManagementPage, CreateScholarshipPage } from "./page/admin/dashboard";
import AuthDebug from "./debug/AuthDebug";
import ScholarshipDetailPage from "./page/user/scholarshipDetail/ScholarshipDetailPage";
import AdminScholarshipDetailPage from "./page/admin/dashboard/ScholarshipDetailPage";
import EditScholarshipPage from "./page/admin/dashboard/EditScholarshipPage";
import CookieConsent from "./components/CookieConsent";
import PrivacyPolicySimple from "./page/user/privacy/PrivacyPolicySimple";
import ScrollToTop from "./components/ScrollToTop";
import DataSources from "./page/user/sources/DataSources";

export default function App() {
  return (
    <HelmetProvider>
      <Router>
        <ScrollToTop />
        <UserDataProvider>
          <ScholarshipDataProvider>
          <Routes>
            {/* Debug route - remove in production */}
            <Route path="/debug-auth" element={<AuthDebug />} />
            
            {/* Admin login route - accessible to all */}
            <Route path="/admin/login" element={<AdminLogin />} />
            
            {/* Protected Admin Routes */}
            <Route element={<AdminPrivateRoute />}>
              <Route element={<AdminAppLayout />}>
                <Route path="/admin" element={<DashboardPage />} />
                <Route path="/admin/dashboard" element={<DashboardPage />} />
                <Route path="/admin/analytics" element={<AnalyticsPage />} />
                <Route path="/admin/scholarships-management" element={<ScholarshipsManagementPage />} />
                <Route path="/admin/scholarships-management/create" element={<CreateScholarshipPage />} />
                <Route path="/admin/scholarships-management/:id" element={<AdminScholarshipDetailPage />} />
                <Route path="/admin/scholarships-management/:slug" element={<AdminScholarshipDetailPage />} />
                <Route path="/admin/scholarships-management/edit/:id" element={<EditScholarshipPage />} />
                <Route path="/admin/scholarships-management/edit/:slug" element={<EditScholarshipPage />} />
              </Route>
            </Route>
            
            {/* User Routes */}
            <Route element={<UserAppLayout />}>
              <Route index element={<Homepage />} />
              <Route path="/browse-scholarships" element={<BrowseScholarships />} />
              <Route path="/scholarship/:id" element={<ScholarshipDetailPage />} />
              <Route path="/:slug" element={<ScholarshipDetailPage />} />
              <Route path="/chatbot" element={<ChatbotPage />} />
              <Route path="/scholarship-timeline" element={<Scholarship />} />
              <Route path="/authentication" element={<Authentication />} />
              <Route path="/privacy-policy" element={<PrivacyPolicySimple />} />
              <Route path="/data-sources" element={<DataSources />} />
              <Route element={<PrivateRoutes />}>
                <Route path="/account" element={<Account />} />
              </Route>
            </Route>
            
            {/* Catch all route */}
            <Route path="/*" element={<RouteNotFound />} />
          </Routes>
          <ToastContainer
            position="top-center"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
          <CookieConsent />
        </ScholarshipDataProvider>
      </UserDataProvider>
    </Router>
  </HelmetProvider>
  );
}
