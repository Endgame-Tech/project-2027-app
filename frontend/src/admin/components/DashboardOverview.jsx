import { useState, useEffect } from "react";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";

const DashboardOverview = () => {
  const [totalCounts, setTotalCounts] = useState({
    petitions: 0,
    advocacyEvents: 0,
    evaluations: 0,
    demands: 0,
  });
  const backendURL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [petitionsRes, advocacyRes, evaluationsRes, demandsRes] = await Promise.all([
          axios.get(`${backendURL}/api/petition/all`),
          axios.get(`${backendURL}/api/advocacy/all`),
          axios.get(`${backendURL}/api/evaluation/all`),
          axios.get(`${backendURL}/api/demands/all`),
        ]);

        setTotalCounts({
          petitions: petitionsRes.data.count,
          advocacyEvents: advocacyRes.data.count,
          evaluations: evaluationsRes.data.count,
          demands: demandsRes.data.count,
        });
      } catch (error) {
        console.error("Error fetching total counts:", error);
      }
    };

    fetchCounts();
  }, [backendURL]);

  // Prepare Data for Chart
  const chartData = [
    { name: "Petitions", count: totalCounts.petitions },
    { name: "Advocacy Events", count: totalCounts.advocacyEvents },
    { name: "Evaluations", count: totalCounts.evaluations },
    { name: "Demands", count: totalCounts.demands },
  ];

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Dashboard Overview</h2>

      {/* Total Counts Display */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {Object.entries(totalCounts).map(([key, value]) => (
          <div key={key} className="bg-blue-100 p-4 py-12 rounded-lg text-center shadow">
            <h3 className="text-lg font-semibold capitalize">{key.replace(/([A-Z])/g, " $1").trim()}</h3>
            <p className="text-3xl font-bold text-blue-600">{value}</p>
          </div>
        ))}
      </div>

      {/* Graph Representation */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-2">Total Engagements Overview</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#3182CE" barSize={40} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DashboardOverview;
