import { useState } from "react";

const GovernmentAssistance = ({ onNext }) => {
  const [formData, setFormData] = useState({
    assistanceTypes: [],
    directImprovement: "",
  });

  const [error, setError] = useState("");

  const assistanceOptions = [
    "Financial Grants & Loans",
    "Employment & Job Creation",
    "Agricultural Support & Subsidies",
    "Education Scholarships & Training",
    "Healthcare Support & Insurance",
    "Security & Law Enforcement Strengthening",
    "Small Business & Entrepreneur Support",
    "Public Welfare & Social Services",
    "Youth & Women Empowerment Programs",
    "Environmental Protection & Sustainability",
    "Other",
  ];

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      assistanceTypes: checked
        ? [...prev.assistanceTypes, value]
        : prev.assistanceTypes.filter((item) => item !== value),
    }));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.assistanceTypes.length < 1) {
      setError("⚠️ Please select at least one type of government assistance.");
      return;
    }

    if (!formData.directImprovement.trim()) {
      setError("⚠️ Please describe how this assistance will directly improve your community.");
      return;
    }

    setError("");
    onNext(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
      <h2 className="text-2xl font-bold mb-4">Government Assistance & Support</h2>

      <label className="block text-gray-700 font-bold mb-2">
        What type of government assistance is needed in your community? (Select at least one)
      </label>
      <div className="grid grid-cols-1 gap-2 mb-4">
        {assistanceOptions.map((item) => (
          <label key={item} className="flex items-center space-x-2">
            <input
              type="checkbox"
              value={item}
              checked={formData.assistanceTypes.includes(item)}
              onChange={handleCheckboxChange}
              className="w-4 h-4"
            />
            <span>{item}</span>
          </label>
        ))}
      </div>

      <label className="block text-gray-700 font-bold mb-2">
        How will this assistance directly improve your community?
      </label>
      <textarea
        name="directImprovement"
        value={formData.directImprovement}
        onChange={handleChange}
        rows="4"
        className="w-full p-2 border rounded mb-2"
        placeholder="Describe the expected benefits..."
      ></textarea>

      {error && <p className="text-red-600 text-sm font-semibold mb-2">{error}</p>}

      <button type="submit" className="bg-red-600 text-white px-4 py-2 rounded w-full mt-4">
        Next
      </button>
    </form>
  );
};

export default GovernmentAssistance;
