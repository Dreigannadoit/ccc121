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
import AddBook from "./pages/AddBook";
import AddUser from "./pages/AddUser";

function App() {
  return (
    <BrowserRouter basename="/ccc121">
      <ConditionalNavbar /> 
      <Routes>
        <Route path="/" element={<Registration />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/resources/addbook" element={<AddBook />} />
        <Route path="/members" element={<Members />} />
        <Route path="/members/adduser" element={<AddUser />} />
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
