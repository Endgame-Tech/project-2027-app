import { useState } from "react";
import statesAndLGAs from "../../lib/statesAndLGAs.js"; // JSON for Nigerian States

const AssessorInfo = ({ onNext }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    organisation: "",
    state: "",
    votingExperience: "",
    designation: "",
    otherDesignation: "",
    relationship: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
      <h2 className="text-2xl font-bold mb-4">Basic Information 1: Assessor Information</h2>

      <input type="text" name="fullName" className="w-full p-2 border rounded mb-2" placeholder="Full Name" value={formData.fullName} onChange={handleChange} required />

      <input type="email" name="email" className="w-full p-2 border rounded mb-2" placeholder="Email Address" value={formData.email} onChange={handleChange} required />

      <input type="tel" name="phone" className="w-full p-2 border rounded mb-2" placeholder="Phone Number" value={formData.phone} onChange={handleChange} required />

      <input type="text" name="organisation" className="w-full p-2 border rounded mb-2" placeholder="Organisation (if applicable)" value={formData.organisation} onChange={handleChange} />

      {/* State Selection */}
      <select name="state" className="w-full p-2 border rounded mb-2" value={formData.state} onChange={handleChange} required>
        <option value="">Select State of Origin</option>
        {Object.keys(statesAndLGAs).map((state) => (
          <option key={state} value={state}>{state}</option>
        ))}
      </select>

      {/* Voting Experience */}
      <select name="votingExperience" className="w-full p-2 border rounded mb-2" value={formData.votingExperience} onChange={handleChange} required>
        <option value="">Select Voting Experience</option>
        <option value="First-time voter">First-time voter</option>
        <option value="Con-current voter">Con-current voter</option>
        <option value="Not Interested in voting">Not Interested in voting</option>
      </select>

      {/* Designation */}
      <select name="designation" className="w-full p-2 border rounded mb-2" value={formData.designation} onChange={handleChange} required>
        <option value="">Select Designation</option>
        <option value="Electoral Commission Official">Electoral Commission Official</option>
        <option value="Political Party Representative">Political Party Representative</option>
        <option value="Civil Society Organisation Representative">Civil Society Organisation Representative</option>
        <option value="Academic/Researcher">Academic/Researcher</option>
        <option value="Independent Evaluator">Independent Evaluator</option>
        <option value="Citizen">Citizen</option>
        <option value="Other">Other</option>
      </select>

      {/* If "Other" is selected, show additional input */}
      {formData.designation === "Other" && (
        <input type="text" name="otherDesignation" className="w-full p-2 border rounded mb-2" placeholder="Please specify" value={formData.otherDesignation} onChange={handleChange} required />
      )}

      <button type="submit" className="bg-red-600 text-white px-4 py-2 rounded w-full mt-4">
        Next
      </button>
    </form>
  );
};

export default AssessorInfo;
