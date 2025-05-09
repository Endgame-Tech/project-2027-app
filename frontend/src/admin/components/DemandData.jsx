import { useState, useEffect } from "react";
import axios from "axios";
import { CSVLink } from "react-csv";

const DemandData = () => {
  const [demands, setDemands] = useState([]);
  const [totalDemands, setTotalDemands] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredDemands, setFilteredDemands] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const demandsPerPage = 10;

  const backendURL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchDemands = async () => {
      try {
        const response = await axios.get(`${backendURL}/api/demands/all`);
        if (response.data?.demands && Array.isArray(response.data.demands)) {
          setDemands(response.data.demands);
          setFilteredDemands(response.data.demands);
          setTotalDemands(response.data.count);
        } else {
          console.error("API response format incorrect:", response.data);
        }
      } catch (error) {
        console.error("Error fetching demands:", error);
      }
    };
    fetchDemands();
  }, [backendURL]);

  useEffect(() => {
    const lowercasedQuery = searchQuery.toLowerCase();
    setFilteredDemands(
      demands.filter((demand) =>
        demand.personalInfo.fullName?.toLowerCase().includes(lowercasedQuery)
      )
    );
  }, [searchQuery, demands]);

  const totalPages = Math.ceil(filteredDemands.length / demandsPerPage);
  const indexOfLastDemand = currentPage * demandsPerPage;
  const indexOfFirstDemand = indexOfLastDemand - demandsPerPage;
  const currentDemands = filteredDemands.slice(indexOfFirstDemand, indexOfLastDemand);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const csvHeaders = [
    { label: "Full Name", key: "personalInfo.fullName" },
    { label: "Email", key: "personalInfo.email" },
    { label: "Phone", key: "personalInfo.phone" },
    { label: "State", key: "personalInfo.state" },
    { label: "LGA", key: "personalInfo.lga" },
    { label: "Key Issues", key: "keyIssues.topIssues" },
    { label: "Infrastructure Needs", key: "infrastructureNeeds.neededInfrastructure" },
    { label: "Government Assistance", key: "governmentAssistance.assistanceTypes" },
  ];

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Project 2027 - Citizen Demands</h2>
      <p className="text-lg font-semibold mb-4">Total Demands: {totalDemands}</p>

      <input
        type="text"
        className="w-full p-2 border rounded mb-4"
        placeholder="Search by Name..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <CSVLink
        data={filteredDemands}
        headers={csvHeaders}
        filename="Project2027_Demands.csv"
        className="bg-green-600 text-white px-4 py-2 rounded mb-4 inline-block"
      >
        Download CSV
      </CSVLink>

      <h3 className="p-2">
        Showing <span className="font-bold">{indexOfFirstDemand + 1}</span> -{" "}
        <span className="font-bold">{Math.min(indexOfLastDemand, filteredDemands.length)}</span>{" "}
        of <span className="font-bold">{filteredDemands.length}</span> demands
      </h3>

      {/* Desktop Table View */}
      <div className="overflow-x-auto hidden sm:block">
        <table className="w-full border-collapse border border-gray-300 text-sm">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="border p-2">Full Name</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Phone</th>
              <th className="border p-2">State</th>
              <th className="border p-2">LGA</th>
              <th className="border p-2">Key Issues</th>
              <th className="border p-2">Infrastructure Needs</th>
              <th className="border p-2">Government Assistance</th>
            </tr>
          </thead>
          <tbody>
            {currentDemands.length > 0 ? (
              currentDemands.map((demand, index) => (
                <tr key={index} className="text-center">
                  <td className="border p-2">{demand.personalInfo.fullName}</td>
                  <td className="border p-2">{demand.personalInfo.email}</td>
                  <td className="border p-2">{demand.personalInfo.phone}</td>
                  <td className="border p-2">{demand.personalInfo.state}</td>
                  <td className="border p-2">{demand.personalInfo.lga}</td>
                  <td className="border p-2">{demand.keyIssues.topIssues.join(", ")}</td>
                  <td className="border p-2">{demand.infrastructureNeeds.neededInfrastructure.join(", ")}</td>
                  <td className="border p-2">{demand.governmentAssistance.assistanceTypes.join(", ")}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center border p-4 text-gray-500">
                  No demands found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="block sm:hidden space-y-4">
        {currentDemands.length > 0 ? (
          currentDemands.map((demand, index) => (
            <div key={index} className="border rounded p-4 shadow-sm bg-white text-sm">
              <p><strong>Full Name:</strong> {demand.personalInfo.fullName}</p>
              <p><strong>Email:</strong> {demand.personalInfo.email}</p>
              <p><strong>Phone:</strong> {demand.personalInfo.phone}</p>
              <p><strong>State:</strong> {demand.personalInfo.state}</p>
              <p><strong>LGA:</strong> {demand.personalInfo.lga}</p>
              <p><strong>Key Issues:</strong> {demand.keyIssues.topIssues.join(", ")}</p>
              <p><strong>Infrastructure Needs:</strong> {demand.infrastructureNeeds.neededInfrastructure.join(", ")}</p>
              <p><strong>Govt Assistance:</strong> {demand.governmentAssistance.assistanceTypes.join(", ")}</p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No demands found.</p>
        )}
      </div>

      {/* Responsive Pagination */}
      {filteredDemands.length > demandsPerPage && (
        <div className="flex flex-wrap justify-center items-center gap-2 mt-6 text-sm">
          <button
            onClick={() => paginate(1)}
            disabled={currentPage === 1}
            className="px-4 py-2 min-w-[70px] rounded bg-gray-200 disabled:opacity-50"
          >
            First
          </button>

          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 min-w-[70px] rounded bg-gray-200 disabled:opacity-50"
          >
            Prev
          </button>

          {currentPage > 1 && (
            <button
              onClick={() => paginate(currentPage - 1)}
              className="px-4 py-2 min-w-[40px] rounded bg-gray-300"
            >
              {currentPage - 1}
            </button>
          )}

          <button className="px-4 py-2 min-w-[40px] rounded bg-gray-600 text-white font-semibold">
            {currentPage}
          </button>

          {currentPage < totalPages && (
            <button
              onClick={() => paginate(currentPage + 1)}
              className="px-4 py-2 min-w-[40px] rounded bg-gray-300"
            >
              {currentPage + 1}
            </button>
          )}

          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 min-w-[70px] rounded bg-gray-200 disabled:opacity-50"
          >
            Next
          </button>

          <button
            onClick={() => paginate(totalPages)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 min-w-[70px] rounded bg-gray-200 disabled:opacity-50"
          >
            Last
          </button>
        </div>
      )}
    </div>
  );
};

export default DemandData;
