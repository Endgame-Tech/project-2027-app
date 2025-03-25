import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import PetitionPage from "../pages/PetitionPage";
import AdvocacyPage from "../pages/AdvocacyPage";
import EvaluationPage from "../pages/EvaluationPage";
import DemandsPage from "../pages/DemandsPage";
import AdminLogin from "../admin/pages/AdminLogin"
import AdminDashboard from "../admin/pages/AdminDashboard";
import PrivateRoute from "../admin/middleware/PrivateRoute";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/petition" element={<PetitionPage />} />
      <Route path="/advocacy" element={<AdvocacyPage />} />
      <Route path="/evaluation" element={<EvaluationPage />} />
      <Route path="/demands" element={<DemandsPage />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/*" element={<PrivateRoute />}>
        <Route path="dashboard" element={<AdminDashboard />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
