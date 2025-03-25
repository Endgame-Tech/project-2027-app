import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi"; // Import icons for mobile menu toggle
import PetitionData from "../components/PetitionData";
import AdvocacyData from "../components/AdvocacyData";
import EvaluationData from "../components/EvaluationData";
import DemandData from "../components/DemandData";
import DashboardOverview from "../components/DashboardOverview";

const AdminDashboard = () => {
  const [activePage, setActivePage] = useState("Overview");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // For mobile sidebar
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  return (
    <div className="flex h-screen">
      {/* Mobile Sidebar Toggle - Hide when menu is open */}


      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-gray-800 text-white p-4 transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform md:relative md:translate-x-0 md:w-64`}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Project 2027 Admin</h2>
          {/* Close button for mobile */}
          <button className="md:hidden text-white" onClick={() => setIsSidebarOpen(false)}>
            <FiX size={24} />
          </button>
        </div>
        <ul className="space-y-2">
          {["Overview", "Petitions", "Evaluations", "Events", "Demands"].map((item) => (
            <li
              key={item}
              onClick={() => {
                setActivePage(item);
                setIsSidebarOpen(false); // Close sidebar on mobile after clicking
              }}
              className={`p-2 rounded cursor-pointer ${activePage === item ? "bg-blue-500" : "hover:bg-gray-700"
                }`}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gray-100 p-6">
        {/* Top Navbar */}
        <div className="flex justify-between items-center bg-white p-4 rounded shadow">
          {!isSidebarOpen && (
            <button
              className="md:hidden z-50 bg-gray-800 text-white p-2 rounded"
              onClick={() => setIsSidebarOpen(true)}
            >
              <FiMenu size={24} />
            </button>
          )}
          <h2 className="text-xl font-semibold">{activePage}</h2>
          <button onClick={handleLogout} className="bg-red-500 text-white px-3 py-1 rounded">
            Logout
          </button>
        </div>

        {/* Page Content */}
        <div className="mt-6">
          {activePage === "Overview" && <DashboardOverview />}
          {activePage === "Petitions" && <PetitionData />}
          {activePage === "Evaluations" && < EvaluationData />}
          {activePage === "Events" && <AdvocacyData />}
          {activePage === "Demands" && <DemandData />}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
