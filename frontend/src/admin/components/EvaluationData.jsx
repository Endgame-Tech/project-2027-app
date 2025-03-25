import { useState, useEffect } from "react";
import axios from "axios";
import { CSVLink } from "react-csv";

const EvaluationData = () => {
  const [evaluations, setEvaluations] = useState([]);
  const [totalEvaluations, setTotalEvaluations] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredEvaluations, setFilteredEvaluations] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const evaluationsPerPage = 10;

  const backendURL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchEvaluations = async () => {
      try {
        const response = await axios.get(`${backendURL}/api/evaluation/all`);

        if (response.data?.evaluations && Array.isArray(response.data.evaluations)) {
          setEvaluations(response.data.evaluations);
          setFilteredEvaluations(response.data.evaluations);
          setTotalEvaluations(response.data.count);
        } else {
          console.error("API response format incorrect:", response.data);
          setEvaluations([]);
          setFilteredEvaluations([]);
        }
      } catch (error) {
        console.error("Error fetching evaluations:", error);
        setEvaluations([]);
        setFilteredEvaluations([]);
      }
    };

    fetchEvaluations();
  }, [backendURL]);

  useEffect(() => {
    const lowercasedQuery = searchQuery.toLowerCase();
    setFilteredEvaluations(
      evaluations.filter(
        (evaluation) =>
          evaluation.assessor?.fullName?.toLowerCase().includes(lowercasedQuery) ||
          evaluation.candidate?.candidateName?.toLowerCase().includes(lowercasedQuery) ||
          evaluation.candidate?.party?.toLowerCase().includes(lowercasedQuery)
      )
    );
  }, [searchQuery, evaluations]);

  const totalPages = Math.ceil(filteredEvaluations.length / evaluationsPerPage);
  const indexOfLastEvaluation = currentPage * evaluationsPerPage;
  const indexOfFirstEvaluation = indexOfLastEvaluation - evaluationsPerPage;
  const currentEvaluations = filteredEvaluations.slice(indexOfFirstEvaluation, indexOfLastEvaluation);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const csvHeaders = [
    { label: "Assessor Name", key: "assessor.fullName" },
    { label: "Candidate Name", key: "candidate.candidateName" },
    { label: "Party", key: "candidate.party" },
    { label: "State", key: "candidate.state" },
    { label: "Capacity Score", key: "scores.capacity" },
    { label: "Competence Score", key: "scores.competence" },
    { label: "Character Score", key: "scores.character" },
    { label: "Final Score", key: "finalScore" },
    { label: "Date Evaluated", key: "evaluatedAt" },
  ];

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Project 2027 - Evaluations</h2>

      <p className="text-lg font-semibold mb-4">Total Evaluations: {totalEvaluations}</p>

      <input
        type="text"
        className="w-full p-2 border rounded mb-4"
        placeholder="Search by Assessor, Candidate, or Party..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <CSVLink
        data={filteredEvaluations}
        headers={csvHeaders}
        filename="Project2027_Evaluations.csv"
        className="bg-green-600 text-white px-4 py-2 rounded mb-4 inline-block"
      >
        Download CSV
      </CSVLink>

      <h3 className="p-2">
        Showing <span className="font-bold">{indexOfFirstEvaluation + 1}</span> -
        <span className="font-bold"> {Math.min(indexOfLastEvaluation, filteredEvaluations.length)} </span>
        of <span className="font-bold">{filteredEvaluations.length}</span>
      </h3>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="border p-2">Assessor</th>
              <th className="border p-2">Candidate</th>
              <th className="border p-2">Party</th>
              <th className="border p-2">State</th>
              <th className="border p-2">Capacity</th>
              <th className="border p-2">Competence</th>
              <th className="border p-2">Character</th>
              <th className="border p-2">Final Score</th>
              <th className="border p-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {currentEvaluations.length > 0 ? (
              currentEvaluations.map((evaluation, index) => (
                <tr key={index} className="text-center text-sm">
                  <td className="border p-2">{evaluation.assessor?.fullName || "N/A"}</td>
                  <td className="border p-2">{evaluation.candidate?.candidateName || "N/A"}</td>
                  <td className="border p-2">{evaluation.candidate?.party || "N/A"}</td>
                  <td className="border p-2">{evaluation.candidate?.state || "N/A"}</td>
                  <td className="border p-2">{`${evaluation.scores?.capacity}%` || "N/A"}</td>
                  <td className="border p-2">{`${evaluation.scores?.competence}%` || "N/A"}</td>
                  <td className="border p-2">{`${evaluation.scores?.character}%` || "N/A"}</td>
                  <td className="border p-2 font-bold">{`${evaluation.finalScore}%` || "N/A"}</td>
                  <td className="border p-2">{new Date(evaluation.createdAt).toLocaleDateString() || "N/A"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="text-center border p-4 text-gray-500">
                  No evaluations found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {filteredEvaluations.length > evaluationsPerPage && (
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

export default EvaluationData;
