import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import Homepage from "./page/user/home/Homepage";
import UserAppLayout from "./ui/user/AppLayout";
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
import ScholarshipList from "./page/admin/manageScholarship/ScholarshipList";
import AdminDashboard from "./page/admin/dashboard/AdminDashboard";
import AuthDebug from "./debug/AuthDebug";
import ScholarshipDetailPage from "./page/user/scholarshipDetail/ScholarshipDetailPage";

export default function App() {
  return (
    <Router>
      <UserDataProvider>
        <ScholarshipDataProvider>
          <Routes>
            {/* Debug route - remove in production */}
            <Route path="/debug-auth" element={<AuthDebug />} />
            
            {/* Admin login route - accessible to all */}
            <Route path="/admin/login" element={<AdminLogin />} />
            
            {/* Protected Admin Routes */}
            <Route element={<AdminPrivateRoute />}>
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/manageScholarship" element={<ScholarshipList />} />
            </Route>
            
            {/* User Routes */}
            <Route element={<UserAppLayout />}>
              <Route index element={<Homepage />} />
              <Route path="/browse" element={<BrowseScholarships />} />
              <Route path="/scholarship/:id" element={<ScholarshipDetailPage />} />
              <Route path="/chatbot" element={<ChatbotPage />} />
              <Route path="/scholarship" element={<Scholarship />} />
              <Route path="/authentication" element={<Authentication />} />
              <Route element={<PrivateRoutes />}>
                <Route path="/account" element={<Account />} />
              </Route>
            </Route>
            
            {/* Catch all route */}
            <Route path="/*" element={<RouteNotFound />} />
          </Routes>
        </ScholarshipDataProvider>
      </UserDataProvider>
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
    </Router>
  );
}
