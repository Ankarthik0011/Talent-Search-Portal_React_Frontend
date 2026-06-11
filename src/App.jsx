import { Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";

import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import CandidatesPage from "./pages/CandidatesPage";
import CandidateProfile from "./pages/CandidateProfile";
import AddCandidate from "./pages/AddCandidate";
import EditCandidate from "./pages/EditCandidate";
import Reports from "./pages/Reports";
import Analytics from "./pages/Analytics";
import Login from "./pages/Login";
import Footer from "./components/Footer";
import Home from "./pages/Home";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const role = localStorage.getItem("role");
  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        backgroundColor: "#0f172a",
        color: "white"

      }}
    >

      {role && <Sidebar />}

      <div
        style={{
          marginLeft: role ? "220px" : "0",
          width: role ? "calc(100% - 220px)" : "100%",
          minHeight: "100vh"
        }}
      >
        {role && <Topbar />}
        <div
          style={{
            padding: "20px",
            width: "100%",
            maxWidth: "100%",
            boxSizing: "border-box"
          }}
        >
          <Routes>

            <Route
              path="/login"
              element={<Login />}
            />

            <Route
              path="/"
              element={<UserDashboard />}
            />
            <Route
              path="/home"
              element={<Home />}
            />
            <Route
              path="/admin"
              element={
                <ProtectedRoute allowedRole="ADMIN">
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/candidates"
              element={<CandidatesPage />}
            />

            <Route
              path="/profile/:id"
              element={<CandidateProfile />}
            />

            <Route
              path="/edit-candidate/:id"
              element={
                <ProtectedRoute allowedRole="ADMIN">
                  <EditCandidate />
                </ProtectedRoute>
              }
            />

            <Route
              path="/add-candidate"
              element={
                <ProtectedRoute allowedRole="ADMIN">
                  <AddCandidate />
                </ProtectedRoute>
              }
            />

            <Route
              path="/reports"
              element={
                <ProtectedRoute allowedRole="ADMIN">
                  <Reports />
                </ProtectedRoute>
              }
            />

            <Route
              path="/analytics"
              element={
                <ProtectedRoute allowedRole="ADMIN">
                  <Analytics />
                </ProtectedRoute>
              }
            />

          </Routes>
          <Footer />
        </div>

      </div>

    </div>
  );
}

export default App;