import { useState } from "react";
import axios from "axios";

const AdvocacyForm = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const backendURL = import.meta.env.VITE_BACKEND_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!fullName || !email || !phone) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axios.post(`${backendURL}/api/advocacy/register`, { fullName, email, phone });

      if (response.status === 201) {
        window.open(response.data.redirectUrl, "_blank"); // Open Google Drive link in new tab
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
      {error && <p className="text-red-600 text-center mb-4">{error}</p>}

      <div className="mb-4">
        <label className="block text-gray-700 font-bold">Full Name:</label>
        <input type="text" className="w-full p-2 border rounded" placeholder="Enter your full name" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-bold">Email Address:</label>
        <input type="email" className="w-full p-2 border rounded" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-bold">Phone Number:</label>
        <input type="tel" className="w-full p-2 border rounded" placeholder="Enter your phone number" value={phone} onChange={(e) => setPhone(e.target.value)} required />
      </div>

      <button type="submit" className="bg-red-600 text-white px-4 py-2 rounded w-full" disabled={loading}>
        {loading ? "Processing..." : "Get the Guide"}
      </button>
    </form>
  );
};

export default AdvocacyForm;
