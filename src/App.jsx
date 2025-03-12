import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Collections from "./pages/Collections";
import About from "./pages/About";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Contact from "./pages/Contact";
import supabase from "./config/supabaseClient";

export default function App() {
  console.log(supabase);

  // const [instruments, setInstruments] = useState([]);

  // useEffect(() => {
  //   async function fetchInstruments() {
  //     const { data, error } = await supabase.from("instruments").select();
  //     if (error) {
  //       console.error("Error fetching instruments:", error.message);
  //     } else {
  //       setInstruments(data);
  //     }
  //   }
  //   fetchInstruments();
  // }, []);

  return (
    <Router>
      <div>
        {/* Optional: Display fetched data globally */}
        {/* <h1>Instruments</h1>
        <ul>
          {instruments.map((instrument) => (
            <li key={instrument.id}>{instrument.name}</li>
          ))}
        </ul> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/collections" element={<Collections />} />
          <Route path="/about" element={<About />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  );
}
