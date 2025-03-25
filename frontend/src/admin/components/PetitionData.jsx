import { useState, useEffect } from "react";
import axios from "axios";
import { CSVLink } from "react-csv";

const PetitionData = () => {
  const [petitions, setPetitions] = useState([]); // Stores petition data
  const [totalPetitions, setTotalPetitions] = useState(0); // Stores count of petitions
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPetitions, setFilteredPetitions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const petitionsPerPage = 10;

  const backendURL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchPetitions = async () => {
      try {
        const response = await axios.get(`${backendURL}/api/petition/all`);

        if (response.data?.petitions && Array.isArray(response.data.petitions)) {
          setPetitions(response.data.petitions);
          setFilteredPetitions(response.data.petitions);
          setTotalPetitions(response.data.count); // Store total petition count
        } else {
          console.error("API response format incorrect:", response.data);
          setPetitions([]);
          setFilteredPetitions([]);
        }
      } catch (error) {
        console.error("Error fetching petitions:", error);
        setPetitions([]);
        setFilteredPetitions([]);
      }
    };

    fetchPetitions();
  }, [backendURL]);

  // Handle search filtering
  useEffect(() => {
    const lowercasedQuery = searchQuery.toLowerCase();
    setFilteredPetitions(
      petitions.filter(
        (petition) =>
          petition.fullName?.toLowerCase().includes(lowercasedQuery) ||
          petition.phone?.toLowerCase().includes(lowercasedQuery) ||
          petition.state?.toLowerCase().includes(lowercasedQuery) ||
          petition.lga?.toLowerCase().includes(lowercasedQuery) ||
          petition.ward?.toLowerCase().includes(lowercasedQuery)
      )
    );
  }, [searchQuery, petitions]);

  // Handle Pagination
  const totalPages = Math.ceil(filteredPetitions.length / petitionsPerPage);
  const indexOfLastPetition = currentPage * petitionsPerPage;
  const indexOfFirstPetition = indexOfLastPetition - petitionsPerPage;
  const currentPetitions = filteredPetitions.slice(indexOfFirstPetition, indexOfLastPetition);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Generate CSV Data
  const csvHeaders = [
    { label: "Full Name", key: "fullName" },
    { label: "Phone", key: "phone" },
    { label: "State", key: "state" },
    { label: "LGA", key: "lga" },
    { label: "Ward", key: "ward" },
    { label: "Registered Voter", key: "isVoter" },
    { label: "Wants PVC", key: "wantsPVC" },
    { label: "Volunteer Interest", key: "wantsToVolunteer" },
  ];

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Project 2027 - Petitions</h2>

      {/* Display Total Petitions Signed */}
      <p className="text-lg font-semibold mb-4">Total Petitions Signed: {totalPetitions}</p>

      {/* Search Bar */}
      <input
        type="text"
        className="w-full p-2 border rounded mb-4"
        placeholder="Search by Name, Phone, State, LGA, or Ward..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {/* Export Button */}
      <CSVLink
        data={filteredPetitions}
        headers={csvHeaders}
        filename="Project2027_Petitions.csv"
        className="bg-green-600 text-white px-4 py-2 rounded mb-4 inline-block"
      >
        Download CSV
      </CSVLink>


      <h3 className="p-2">
        Showing <span className="font-bold">{indexOfFirstPetition + 1}</span> -
        <span className="font-bold"> {Math.min(indexOfLastPetition, filteredPetitions.length)} </span>
        of <span className="font-bold">{filteredPetitions.length}</span>
      </h3>

      {/* Petition Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="border p-2">Full Name</th>
              <th className="border p-2">Phone</th>
              <th className="border p-2">State</th>
              <th className="border p-2">LGA</th>
              <th className="border p-2">Ward</th>
              <th className="border p-2">Registered Voter</th>
              <th className="border p-2">Wants PVC</th>
              <th className="border p-2">Volunteer Interest</th>
            </tr>
          </thead>
          <tbody>
            {currentPetitions.length > 0 ? (
              currentPetitions.map((petition, index) => (
                <tr key={index} className="text-center text-sm">
                  <td className="border p-2">{petition.fullName || `${petition.firstName} ${petition.lastName}` || "N/A"}</td>
                  <td className="border p-2">{petition.phone || "N/A"}</td>
                  <td className="border p-2">{petition.state || "N/A"}</td>
                  <td className="border p-2">{petition.lga || "N/A"}</td>
                  <td className="border p-2">{petition.ward || "N/A"}</td>
                  <td className="border p-2">{petition.isVoter === "Yes" ? "Yes" : "No"}</td>
                  <td className="border p-2">{petition.wantsPVC === "Yes" ? "Yes" : "No"}</td>
                  <td className={`border border-gray-900 p-2 font-semibold ${petition.wantsToVolunteer === "Yes" ? "text-green-600" : "text-red-600"}`}>
                    {petition.wantsToVolunteer === "Yes" ? "Yes" : "No"}
                  </td>

                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center border p-4 text-gray-500">
                  No petitions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {filteredPetitions.length > petitionsPerPage && (
        <div className="flex justify-center mt-4">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => paginate(index + 1)}
              className={`px-3 py-1 mx-1 rounded ${currentPage === index + 1 ? "bg-gray-600 text-white" : "bg-gray-300 text-gray-700"
                }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default PetitionData;
