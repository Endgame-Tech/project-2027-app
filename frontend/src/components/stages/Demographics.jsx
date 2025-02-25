import { useState } from "react";
import statesAndLGAs from "../../lib/statesAndLGAs.js"; // JSON for Nigerian States

const Demographics = ({ onNext }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    state: "",
    lga: "",
    community: "",
    ageRange: "",
    gender: "",
    occupation: "",
    otherOccupation: "",
  });

  const [error, setError] = useState(""); // Validation error state

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // ✅ Ensure all required fields are filled
    const requiredFields = ["fullName", "email", "phone", "state", "lga", "ageRange", "gender", "occupation"];
    const emptyFields = requiredFields.filter((field) => !formData[field]);

    if (emptyFields.length > 0) {
      setError("⚠️ Please fill in all required fields.");
      return;
    }

    setError(""); // Clear any existing errors
    onNext(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
      <h2 className="text-2xl font-bold mb-4">Step 1: Personal Information</h2>

      <input type="text" name="fullName" className="w-full p-2 border rounded mb-2" placeholder="Full Name" value={formData.fullName} onChange={handleChange} required />

      <input type="email" name="email" className="w-full p-2 border rounded mb-2" placeholder="Email Address" value={formData.email} onChange={handleChange} required />

      <input type="tel" name="phone" className="w-full p-2 border rounded mb-2" placeholder="Phone Number" value={formData.phone} onChange={handleChange} required />

      {/* State Selection */}
      <select name="state" className="w-full p-2 border rounded mb-2" value={formData.state} onChange={handleChange} required>
        <option value="">Select State</option>
        {Object.keys(statesAndLGAs).map((state) => (
          <option key={state} value={state}>{state}</option>
        ))}
      </select>

      {/* LGA Selection (Changes Based on State) */}
      <select name="lga" className="w-full p-2 border rounded mb-2" value={formData.lga} onChange={handleChange} required>
        <option value="">Select LGA</option>
        {formData.state && statesAndLGAs[formData.state].map((lga) => (
          <option key={lga} value={lga}>{lga}</option>
        ))}
      </select>

      <input type="text" name="community" className="w-full p-2 border rounded mb-2" placeholder="Community" value={formData.community} onChange={handleChange} />

      {/* Age Range Selection */}
      <select name="ageRange" className="w-full p-2 border rounded mb-2" value={formData.ageRange} onChange={handleChange} required>
        <option value="">Select Age Range</option>
        <option value="18-24">18-24</option>
        <option value="25-34">25-34</option>
        <option value="35-44">35-44</option>
        <option value="45-54">45-54</option>
        <option value="55+">55+</option>
      </select>

      {/* Gender Selection */}
      <select name="gender" className="w-full p-2 border rounded mb-2" value={formData.gender} onChange={handleChange} required>
        <option value="">Select Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Other">Other</option>
      </select>

      {/* Occupation Selection */}
      <select name="occupation" className="w-full p-2 border rounded mb-2" value={formData.occupation} onChange={handleChange} required>
        <option value="">Select Occupation</option>
        <option value="Farmer">Farmer</option>
        <option value="Trader">Trader</option>
        <option value="Civil Servant">Civil Servant</option>
        <option value="Student">Student</option>
        <option value="Unemployed">Unemployed</option>
        <option value="Other">Other</option>
      </select>

      {/* Show "Other Occupation" input if selected */}
      {formData.occupation === "Other" && (
        <input type="text" name="otherOccupation" className="w-full p-2 border rounded mb-2" placeholder="Specify Occupation" value={formData.otherOccupation} onChange={handleChange} required />
      )}

      {/* Display Error Message if Validation Fails */}
      {error && <p className="text-red-600 text-sm font-semibold mb-2">{error}</p>}

      <button type="submit" className="bg-red-600 text-white px-4 py-2 rounded w-full mt-4">
        Next
      </button>
    </form>
  );
};

export default Demographics;
