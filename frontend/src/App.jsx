import { useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import AppRoutes from "./routes/AppRoutes";

function App() {
  const location = useLocation();

  // List of admin routes where Navbar should be hidden
  const adminRoutes = ["/admin/login", "/admin/dashboard", "/fixpolitics", "/thepeoplesopposition", "/obidientmovement"];

  return (
    <div className="font-archivo">
      {/* Hide Navbar for Admin Pages */}
      {!adminRoutes.includes(location.pathname) && <Navbar />}
      <AppRoutes />
    </div>
  );
}

export default App;
