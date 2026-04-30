import { useState, useEffect } from "react";
import axios from "axios";
import { CSVLink } from "react-csv";

const ReportDownloadData = () => {
  const [downloads, setDownloads] = useState([]);
  const [totalDownloads, setTotalDownloads] = useState(0);
  const [collaborationCount, setCollaborationCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredDownloads, setFilteredDownloads] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const backendURL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchDownloads = async () => {
      try {
        const token = localStorage.getItem("adminToken");
        const response = await axios.get(`${backendURL}/api/report/all`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data?.downloads && Array.isArray(response.data.downloads)) {
          setDownloads(response.data.downloads);
          setFilteredDownloads(response.data.downloads);
          setTotalDownloads(response.data.count);
          setCollaborationCount(response.data.collaborationCount);
        }
      } catch (error) {
        console.error("Error fetching report downloads:", error);
      }
    };

    fetchDownloads();
  }, [backendURL]);

  useEffect(() => {
    const query = searchQuery.toLowerCase();
    setFilteredDownloads(
      downloads.filter(
        (d) =>
          d.fullName?.toLowerCase().includes(query) ||
          d.email?.toLowerCase().includes(query) ||
          d.category?.toLowerCase().includes(query)
      )
    );
    setCurrentPage(1);
  }, [searchQuery, downloads]);

  const totalPages = Math.ceil(filteredDownloads.length / itemsPerPage);
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = filteredDownloads.slice(indexOfFirst, indexOfLast);

  const csvHeaders = [
    { label: "Full Name", key: "fullName" },
    { label: "Email", key: "email" },
    { label: "Category", key: "category" },
    { label: "Collaboration Interest", key: "collaborationInterest" },
    { label: "Email Sent", key: "emailSent" },
    { label: "Downloaded", key: "downloadedAt" },
    { label: "Date", key: "createdAt" },
  ];

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Report Downloads</h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-green-100 p-4 py-8 rounded-lg text-center shadow">
          <h3 className="text-lg font-semibold">Total Downloads</h3>
          <p className="text-3xl font-bold text-green-600">{totalDownloads}</p>
        </div>
        <div className="bg-blue-100 p-4 py-8 rounded-lg text-center shadow">
          <h3 className="text-lg font-semibold">Want to Collaborate</h3>
          <p className="text-3xl font-bold text-blue-600">{collaborationCount}</p>
        </div>
        <div className="bg-purple-100 p-4 py-8 rounded-lg text-center shadow">
          <h3 className="text-lg font-semibold">Unique Categories</h3>
          <p className="text-3xl font-bold text-purple-600">
            {new Set(downloads.map((d) => d.category)).size}
          </p>
        </div>
      </div>

      {/* Search */}
      <input
        type="text"
        className="w-full p-2 border rounded mb-4"
        placeholder="Search by Name, Email, or Category..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {/* CSV Export */}
      <CSVLink
        data={filteredDownloads}
        headers={csvHeaders}
        filename="Mandate4_Report_Downloads.csv"
        className="bg-green-600 text-white px-4 py-2 rounded mb-4 inline-block"
      >
        Download CSV
      </CSVLink>

      <h3 className="p-2">
        Showing <span className="font-bold">{indexOfFirst + 1}</span> -{" "}
        <span className="font-bold">{Math.min(indexOfLast, filteredDownloads.length)}</span> of{" "}
        <span className="font-bold">{filteredDownloads.length}</span>
      </h3>

      {/* Table — desktop */}
      <div className="overflow-x-auto hidden sm:block">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="border p-2">Full Name</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Category</th>
              <th className="border p-2">Collaborate</th>
              <th className="border p-2">Email Sent</th>
              <th className="border p-2">Downloaded</th>
              <th className="border p-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.length > 0 ? (
              currentItems.map((item, index) => (
                <tr key={index} className="text-center text-sm">
                  <td className="border p-2">{item.fullName}</td>
                  <td className="border p-2">{item.email}</td>
                  <td className="border p-2">{item.category}</td>
                  <td
                    className={`border p-2 font-semibold ${
                      item.collaborationInterest ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {item.collaborationInterest ? "Yes" : "No"}
                  </td>
                  <td className="border p-2">{item.emailSent ? "✅" : "❌"}</td>
                  <td className="border p-2">{item.downloadedAt ? "✅" : "—"}</td>
                  <td className="border p-2">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center border p-4 text-gray-500">
                  No report downloads found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="sm:hidden space-y-4">
        {currentItems.length > 0 ? (
          currentItems.map((item, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow border">
              <p className="font-bold text-lg">{item.fullName}</p>
              <p className="text-gray-600 text-sm">{item.email}</p>
              <p className="text-sm mt-1">
                <span className="font-semibold">Category:</span> {item.category}
              </p>
              <p className="text-sm">
                <span className="font-semibold">Collaborate:</span>{" "}
                <span className={item.collaborationInterest ? "text-green-600" : "text-red-600"}>
                  {item.collaborationInterest ? "Yes" : "No"}
                </span>
              </p>
              <p className="text-sm text-gray-400 mt-1">
                {new Date(item.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No report downloads found.</p>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-4 space-x-2 flex-wrap">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReportDownloadData;
