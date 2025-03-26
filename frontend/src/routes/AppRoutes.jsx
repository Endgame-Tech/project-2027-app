import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import PetitionPage from "../pages/PetitionPage";
import AdvocacyPage from "../pages/AdvocacyPage";
import EvaluationPage from "../pages/EvaluationPage";
import DemandsPage from "../pages/DemandsPage";
import AdminLogin from "../admin/pages/AdminLogin";
import AdminDashboard from "../admin/pages/AdminDashboard";
import PrivateRoute from "../admin/middleware/PrivateRoute";
import FixPoliticsPetitionPage from "../pages/FixPoliticsPetitionPage";
import ObidientPetitionPage from "../pages/ObidientPetitionPage";
import PeoplesPetitionPage from "../pages/PeoplesPetitionPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/petition" element={<PetitionPage />} />
      <Route path="/advocacy" element={<AdvocacyPage />} />
      <Route path="/evaluation" element={<EvaluationPage />} />
      <Route path="/demands" element={<DemandsPage />} />
      <Route path="/fixpolitics" element={<FixPoliticsPetitionPage />} />
      <Route path="/thepeoplesopposition" element={<PeoplesPetitionPage />} />
      <Route path="/obidientmovement" element={<ObidientPetitionPage />} />

      {/* Admin Authentication Routes */}
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* Redirect /admin to /admin/dashboard when logged in */}
      <Route path="/admin" element={<PrivateRoute />}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<AdminDashboard />} />
      </Route>

      {/* Redirect /admin to login if not authenticated */}
      <Route path="/admin" element={<Navigate to="/admin/login" replace />} />
    </Routes>
  );
};

export default AppRoutes;
