import { Navigate, Route, Routes } from "react-router-dom";
import SiteLayout from "./components/layout/SiteLayout";
import Home from "./CompanyPages/Home";
import About from "./CompanyPages/About";
import Blog from "./CompanyPages/Blog";
import Career from "./CompanyPages/Career";
import Team from "./CompanyPages/Team";
import Events from "./CompanyPages/Events";
import Clients from "./CompanyPages/Clients";
import DirectorMessage from "./CompanyPages/DirectorMessage";
import FAQ from "./CompanyPages/FAQ";
import MissionVision from "./CompanyPages/MissionVision";
import ScrollToTop from "./components/routing/ScrollToHash";
import AppDevelopment from "./ServicePages/AppDevelopment";
import OfflineSoftware from "./ServicePages/OfflineSoftware";
import OnlineSoftware from "./ServicePages/OnlineSoftware";
import Ecommerce from "./ServicePages/Ecommerce";
import WebDevelopment from "./ServicePages/WebDevelopment";
import WebsiteDesigning from "./ServicePages/WebsiteDesigning";
import Contact from "./components/pages/Contact";
import AdminDashboard from "./admin/AdminDashboard"
import AdminLogin from "./admin/AdminLogin";
import ProtectedRoute from "./admin/ProtectedRoute";
import AdminLogout from "./admin/AdminLogout";
function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<SiteLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/career" element={<Career />} />
          <Route path="/team" element={<Team />} />
          <Route path="/events" element={<Events />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/director-message" element={<DirectorMessage />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/mission-vision" element={<MissionVision />} />
          <Route
            path="/services/app-development"
            element={<AppDevelopment />}
          />
          <Route
            path="/services/offline-software"
            element={<OfflineSoftware />}
          />
          <Route
            path="/services/online-software"
            element={<OnlineSoftware />}
          />
          <Route path="/services/ecommerce" element={<Ecommerce />} />
          <Route
            path="/services/web-development"
            element={<WebDevelopment />}
          />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/services/website-designing"
            element={<WebsiteDesigning />}
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-logout" element={<AdminLogout />} />
        <Route
          path="/admin/cislive"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}
export default App;
