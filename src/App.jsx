import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Contact from "./pages/Contact";
import Collection from "./pages/Collection";
import { SpeedInsights } from "@vercel/speed-insights/react"

function AppRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={ <SpeedInsights url="https://sangamjewels.com" token={import.meta.env.VITE_SPEED_INSIGHTS_TOKEN}/> } />
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/collection" element={<Collection />} />
      </Routes>
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
