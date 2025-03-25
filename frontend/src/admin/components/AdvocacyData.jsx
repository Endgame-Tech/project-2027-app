import { useState, useEffect } from "react";
import axios from "axios";
import { CSVLink } from "react-csv";

const AdvocacyData = () => {
  const [advocacies, setAdvocacies] = useState([]);
  const [totalAdvocacies, setTotalAdvocacies] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredAdvocacies, setFilteredAdvocacies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const advocaciesPerPage = 10;

  const backendURL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchAdvocacies = async () => {
      try {
        const response = await axios.get(`${backendURL}/api/advocacy/all`);

        if (response.data?.advocacies && Array.isArray(response.data.advocacies)) {
          setAdvocacies(response.data.advocacies);
          setFilteredAdvocacies(response.data.advocacies);
          setTotalAdvocacies(response.data.count);
        } else {
          console.error("API response format incorrect:", response.data);
          setAdvocacies([]);
          setFilteredAdvocacies([]);
        }
      } catch (error) {
        console.error("Error fetching advocacy events:", error);
        setAdvocacies([]);
        setFilteredAdvocacies([]);
      }
    };

    fetchAdvocacies();
  }, [backendURL]);

  useEffect(() => {
    const lowercasedQuery = searchQuery.toLowerCase();
    setFilteredAdvocacies(
      advocacies.filter(
        (advocacy) =>
          advocacy.fullName?.toLowerCase().includes(lowercasedQuery) ||
          advocacy.email?.toLowerCase().includes(lowercasedQuery) ||
          advocacy.phone?.toLowerCase().includes(lowercasedQuery)
      )
    );
  }, [searchQuery, advocacies]);

  const totalPages = Math.ceil(filteredAdvocacies.length / advocaciesPerPage);
  const indexOfLastAdvocacy = currentPage * advocaciesPerPage;
  const indexOfFirstAdvocacy = indexOfLastAdvocacy - advocaciesPerPage;
  const currentAdvocacies = filteredAdvocacies.slice(indexOfFirstAdvocacy, indexOfLastAdvocacy);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const csvHeaders = [
    { label: "Full Name", key: "fullName" },
    { label: "Email", key: "email" },
    { label: "Phone", key: "phone" },
  ];

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Project 2027 - Advocacy Events</h2>

      <p className="text-lg font-semibold mb-4">Total Registrations: {totalAdvocacies}</p>

      <input
        type="text"
        className="w-full p-2 border rounded mb-4"
        placeholder="Search by Name, Email, or Phone..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <CSVLink
        data={filteredAdvocacies}
        headers={csvHeaders}
        filename="Project2027_AdvocacyEvents.csv"
        className="bg-green-600 text-white px-4 py-2 rounded mb-4 inline-block"
      >
        Download CSV
      </CSVLink>

      <h3 className="p-2">
        Showing <span className="font-bold">{indexOfFirstAdvocacy + 1}</span> -
        <span className="font-bold"> {Math.min(indexOfLastAdvocacy, filteredAdvocacies.length)} </span>
        of <span className="font-bold">{filteredAdvocacies.length}</span>
      </h3>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="border p-2">Full Name</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Phone</th>
            </tr>
          </thead>
          <tbody>
            {currentAdvocacies.length > 0 ? (
              currentAdvocacies.map((advocacy, index) => (
                <tr key={index} className="text-center text-sm">
                  <td className="border p-2">{advocacy.fullName || "N/A"}</td>
                  <td className="border p-2">{advocacy.email || "N/A"}</td>
                  <td className="border p-2">{advocacy.phone || "N/A"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center border p-4 text-gray-500">
                  No advocacy event registrations found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {filteredAdvocacies.length > advocaciesPerPage && (
        <div className="flex justify-center mt-4">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => paginate(index + 1)}
              className={`px-3 py-1 mx-1 rounded ${currentPage === index + 1 ? "bg-gray-600 text-white" : "bg-gray-300 text-gray-700"}`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdvocacyData;
