import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import PrivateRoute from "./components/Authentication/PrivateRoute";
import CrimesTable from "./components/Tables/CrimesTable";

import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/crimes" element={<CrimesTable />} />
        </Route>
        <Route exact path="/login" element={<Login />} />
        {/* <Route exact path="/logout" element={<Logout />} /> */}
      </Routes>
    </Router>
  );
}
