import { useState } from "react";
import statesAndLGAs from "../lib/statesAndLGAs.js";
import axios from "axios";

const PetitionForm = ({ setPetitionData, setShowPreview }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [state, setState] = useState("");
  const [lga, setLga] = useState("");
  const [lgas, setLgas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const backendURL = import.meta.env.VITE_BACKEND_URL;

  const handleStateChange = (e) => {
    const selectedState = e.target.value;
    setState(selectedState);
    setLgas(statesAndLGAs[selectedState] || []);
    setLga("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!firstName || !lastName || !email || !phone || !state || !lga) {
      setError("Please enter all required fields.");
      return;
    }

    setLoading(true);
    setError("");

    const petitionData = { firstName, lastName, email, phone, state, lga };

    try {
      const response = await axios.post(`${backendURL}/api/petition/sign-petition`, petitionData);

      if (response.status === 201) {
        setPetitionData(petitionData);
        setShowPreview(true);
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
        <label className="block text-gray-700 font-bold">First Name:</label>
        <input type="text" className="w-full p-2 border rounded" placeholder="Enter your first name" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-bold">Last Name:</label>
        <input type="text" className="w-full p-2 border rounded" placeholder="Enter your last name" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-bold">Email Address:</label>
        <input type="email" className="w-full p-2 border rounded" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-bold">Phone Number:</label>
        <input type="tel" className="w-full p-2 border rounded" placeholder="Enter your phone number" value={phone} onChange={(e) => setPhone(e.target.value)} required />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-bold">State:</label>
        <select className="w-full p-2 border rounded" value={state} onChange={handleStateChange} required>
          <option value="">Select your state</option>
          {Object.keys(statesAndLGAs).map((stateName) => (
            <option key={stateName} value={stateName}>{stateName}</option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-bold">Local Government Area:</label>
        <select className="w-full p-2 border rounded" value={lga} onChange={(e) => setLga(e.target.value)} disabled={!state} required>
          <option value="">Select your LGA</option>
          {lgas.map((lgaName) => (
            <option key={lgaName} value={lgaName}>{lgaName}</option>
          ))}
        </select>
      </div>

      <button type="submit" className="bg-red-600 text-white px-4 py-2 rounded w-full" disabled={loading}>
        {loading ? "Signing..." : "Sign the Petition"}
      </button>
    </form>
  );
};

export default PetitionForm;
