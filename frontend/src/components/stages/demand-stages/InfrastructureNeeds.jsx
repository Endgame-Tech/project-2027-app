import { useState } from "react";

const InfrastructureNeeds = ({ onNext }) => {
  const [formData, setFormData] = useState({
    neededInfrastructure: [],
    specificProblem: "",
  });

  const [error, setError] = useState("");

  const infrastructureOptions = [
    "Roads & Transportation",
    "Electricity & Power Supply",
    "Water Supply & Sanitation",
    "Healthcare Facilities",
    "Educational Institutions",
    "Security & Law Enforcement",
    "Market & Business Hubs",
    "Digital & Internet Access",
    "Public Recreational Spaces",
    "Waste Management & Environmental Protection",
    "Other",
  ];

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      neededInfrastructure: checked
        ? [...prev.neededInfrastructure, value]
        : prev.neededInfrastructure.filter((item) => item !== value),
    }));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.neededInfrastructure.length < 1) {
      setError("⚠️ Please select at least one infrastructure need.");
      return;
    }

    if (!formData.specificProblem.trim()) {
      setError("⚠️ Please describe the specific problem.");
      return;
    }

    setError("");
    onNext(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
      <h2 className="text-2xl font-bold mb-4">Infrastructure & Development Needs</h2>

      <label className="block text-gray-700 font-bold mb-2">
        What infrastructure or development projects does your community need? (Select at least one)
      </label>
      <div className="grid grid-cols-1 gap-2 mb-4">
        {infrastructureOptions.map((item) => (
          <label key={item} className="flex items-center space-x-2">
            <input
              type="checkbox"
              value={item}
              checked={formData.neededInfrastructure.includes(item)}
              onChange={handleCheckboxChange}
              className="w-4 h-4"
            />
            <span>{item}</span>
          </label>
        ))}
      </div>

      <label className="block text-gray-700 font-bold mb-2">
        Describe the specific problem or deficiency related to this infrastructure in your community.
      </label>
      <textarea
        name="specificProblem"
        value={formData.specificProblem}
        onChange={handleChange}
        rows="4"
        className="w-full p-2 border rounded mb-2"
        placeholder="Describe the issue in detail..."
      ></textarea>

      {error && <p className="text-red-600 text-sm font-semibold mb-2">{error}</p>}

      <button type="submit" className="bg-red-600 text-white px-4 py-2 rounded w-full mt-4">
        Next
      </button>
    </form>
  );
};

export default InfrastructureNeeds;
