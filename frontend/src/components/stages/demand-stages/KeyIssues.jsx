import { useState } from "react";

const KeyIssues = ({ onNext }) => {
  const [formData, setFormData] = useState({
    topIssues: [],
    governmentLevel: [],
    specificActions: "",
  });

  const [error, setError] = useState("");

  const issueOptions = [
    "Unemployment & Job Creation",
    "Education Quality & Access",
    "Healthcare Services",
    "Security & Crime Prevention",
    "Electricity & Infrastructure",
    "Corruption & Transparency",
    "Agriculture & Food Security",
    "Women & Youth Empowerment",
    "Cost of Living & Inflation",
    "Digital & Technological Access",
    "Other",
  ];

  const governmentLevels = [
    "Federal Government",
    "State Government",
    "Local Government",
    "All Levels",
  ];

  const handleCheckboxChange = (e, type) => {
    const { value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [type]: checked
        ? [...prev[type], value]
        : prev[type].filter((item) => item !== value),
    }));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.topIssues.length < 3) {
      setError("⚠️ Please select at least three issues.");
      return;
    }

    if (!formData.specificActions.trim()) {
      setError("⚠️ Please provide specific actions or policies.");
      return;
    }

    setError("");
    onNext(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
      <h2 className="text-2xl font-bold mb-4">Key Issues & Policy Demands</h2>

      <label className="block text-gray-700 font-bold mb-2">
        What are the top 3 issues affecting you or your community? (Select at least three)
      </label>
      <div className="grid grid-cols-1 gap-2 mb-4">
        {issueOptions.map((issue) => (
          <label key={issue} className="flex items-center space-x-2">
            <input
              type="checkbox"
              value={issue}
              checked={formData.topIssues.includes(issue)}
              onChange={(e) => handleCheckboxChange(e, "topIssues")}
              className="w-4 h-4"
            />
            <span>{issue}</span>
          </label>
        ))}
      </div>

      <label className="block text-gray-700 font-bold mb-2">
        Which level of government should primarily address these issues?
      </label>
      <div className="grid grid-cols-1 gap-2 mb-4">
        {governmentLevels.map((level) => (
          <label key={level} className="flex items-center space-x-2">
            <input
              type="checkbox"
              value={level}
              checked={formData.governmentLevel.includes(level)}
              onChange={(e) => handleCheckboxChange(e, "governmentLevel")}
              className="w-4 h-4"
            />
            <span>{level}</span>
          </label>
        ))}
      </div>

      <label className="block text-gray-700 font-bold mb-2">
        What specific actions or policies would you like to see implemented?
      </label>
      <textarea
        name="specificActions"
        value={formData.specificActions}
        onChange={handleChange}
        rows="4"
        className="w-full p-2 border rounded mb-2"
        placeholder="Describe your policy recommendations..."
      ></textarea>

      {error && <p className="text-red-600 text-sm font-semibold mb-2">{error}</p>}

      <button type="submit" className="bg-red-600 text-white px-4 py-2 rounded w-full mt-4">
        Next
      </button>
    </form>
  );
};

export default KeyIssues;
