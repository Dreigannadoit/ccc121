import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Registration from "./pages/Registration";
import Dashboard from "./pages/Dashboard";
import Resources from "./pages/Resources";
import Members from "./pages/Members";
import Borrow from "./pages/Borrow";
import Navbar from "./components/Navbar";


import './css/app.css'

function App() {
  return (
    <BrowserRouter basename="/ccc121">
      <ConditionalNavbar /> {/* Render Navbar conditionally */}
      <Routes>
        <Route path="/" element={<Registration />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/members" element={<Members />} />
        <Route path="/borrow" element={<Borrow />} />
      </Routes>
    </BrowserRouter>
  );
}

// Component to conditionally render the Navbar
function ConditionalNavbar() {
  const location = useLocation();

  // Define the routes where Navbar should be displayed
  const navbarRoutes = ["/dashboard", "/resources", "/members", "/borrow"];

  return navbarRoutes.includes(location.pathname) ? <Navbar /> : null;
}

export default App;
