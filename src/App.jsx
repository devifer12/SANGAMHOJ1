import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useRoutes,
  useLocation,
} from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Contact from "./pages/Contact";
import Collection from "./pages/Collection";
import Dashboard from "./pages/Dashboard";
import WhatsAppButton from "./components/ui/WhatsAppButton";

function AppRoutes() {
  const location = useLocation();
  const isDashboard = location.pathname === "/dashboard";

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>

      {/* WhatsApp button on all pages except dashboard */}
      {!isDashboard && <WhatsAppButton />}
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}