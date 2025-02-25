import { useState } from "react";
import statesAndLGAs from "../../lib/statesAndLGAs.js";

const CandidateInfo = ({ onNext }) => {
  const [formData, setFormData] = useState({
    candidateName: "",
    position: "",
    party: "",
    state: "",
  });

  const [error, setError] = useState(""); // Error handling for validation

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // ✅ Ensure all required fields are filled
    if (!formData.candidateName || !formData.position || !formData.state) {
      setError("⚠️ Please fill in all required fields.");
      return;
    }

    setError(""); // Clear any existing errors
    onNext(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
      <h2 className="text-2xl font-bold mb-4">Basic Information 2: Candidate Information</h2>

      <input
        type="text"
        name="candidateName"
        className="w-full p-2 border rounded mb-2"
        placeholder="Full Name of Candidate"
        value={formData.candidateName}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="position"
        className="w-full p-2 border rounded mb-2"
        placeholder="Position Contesting"
        value={formData.position}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="party"
        className="w-full p-2 border rounded mb-2"
        placeholder="Political Party (if applicable)"
        value={formData.party}
        onChange={handleChange}
      />

      <select
        name="state"
        className="w-full p-2 border rounded mb-2"
        value={formData.state}
        onChange={handleChange}
        required
      >
        <option value="">Select State of Origin</option>
        {Object.keys(statesAndLGAs).map((state) => (
          <option key={state} value={state}>
            {state}
          </option>
        ))}
      </select>

      {/* ✅ Display Error Message if Validation Fails */}
      {error && <p className="text-red-600 text-sm font-semibold mb-2">{error}</p>}

      <button type="submit" className="bg-red-600 text-white px-4 py-2 rounded w-full mt-4">
        Next
      </button>
    </form>
  );
};

export default CandidateInfo;
