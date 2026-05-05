import { Outlet } from "react-router-dom";
import { useState } from "react";
import Layout from "./Layout";
import Navbar from "./Navbar";
import Footer from "./Footer";
import DemoModal from "../pages/DemoModal";
// import ScrollToHash from "../routing/ScrollToHash";

export default function SiteLayout() {
  const [demoOpen, setDemoOpen] = useState(false);

  return (
    <Layout>
      {/* <ScrollToHash /> */}
      <Navbar setDemoOpen={setDemoOpen} />
      {demoOpen && (
        <DemoModal isOpen={demoOpen} onClose={() => setDemoOpen(false)} />
      )}
      <Outlet />
      <Footer />
    </Layout>
  );
}
