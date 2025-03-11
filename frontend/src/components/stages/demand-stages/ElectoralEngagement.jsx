import { useState } from "react";

const ElectoralEngagement = ({ onNext }) => {
  const [formData, setFormData] = useState({
    engagedBefore: "",
    preferredEngagement: [],
    futureParticipation: "",
    additionalComments: "",
  });

  const [error, setError] = useState("");

  const engagementOptions = [
    "Town Hall Meetings",
    "Community Forums",
    "Online Petitions",
    "Social Media Campaigns",
    "Peaceful Protests",
    "Direct Communication with Representatives",
    "Civil Society Advocacy",
    "Other",
  ];

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      preferredEngagement: checked
        ? [...prev.preferredEngagement, value]
        : prev.preferredEngagement.filter((item) => item !== value),
    }));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.engagedBefore) {
      setError("⚠️ Please select whether you've engaged before.");
      return;
    }

    if (formData.preferredEngagement.length < 1) {
      setError("⚠️ Please select at least one preferred engagement method.");
      return;
    }

    if (!formData.futureParticipation) {
      setError("⚠️ Please indicate your willingness to participate in the future.");
      return;
    }

    setError("");
    onNext(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
      <h2 className="text-2xl font-bold mb-4">Electoral Engagement</h2>

      {/* Engaged Before */}
      <label className="block text-gray-700 font-bold mb-2">
        Have you engaged in any political or governance advocacy before?
      </label>
      <div className="grid grid-cols-1 gap-2 mb-4">
        <label className="flex items-center space-x-2">
          <input
            type="radio"
            name="engagedBefore"
            value="Yes"
            checked={formData.engagedBefore === "Yes"}
            onChange={handleChange}
            className="w-4 h-4"
          />
          <span>Yes</span>
        </label>
        <label className="flex items-center space-x-2">
          <input
            type="radio"
            name="engagedBefore"
            value="No"
            checked={formData.engagedBefore === "No"}
            onChange={handleChange}
            className="w-4 h-4"
          />
          <span>No</span>
        </label>
      </div>

      {/* Preferred Engagement */}
      <label className="block text-gray-700 font-bold mb-2">
        How do you prefer to engage in political/governance issues? (Select at least one)
      </label>
      <div className="grid grid-cols-1 gap-2 mb-4">
        {engagementOptions.map((option) => (
          <label key={option} className="flex items-center space-x-2">
            <input
              type="checkbox"
              value={option}
              checked={formData.preferredEngagement.includes(option)}
              onChange={handleCheckboxChange}
              className="w-4 h-4"
            />
            <span>{option}</span>
          </label>
        ))}
      </div>

      {/* Future Participation */}
      <label className="block text-gray-700 font-bold mb-2">
        Are you willing to participate in governance-related activities in the future?
      </label>
      <div className="grid grid-cols-1 gap-2 mb-4">
        <label className="flex items-center space-x-2">
          <input
            type="radio"
            name="futureParticipation"
            value="Yes"
            checked={formData.futureParticipation === "Yes"}
            onChange={handleChange}
            className="w-4 h-4"
          />
          <span>Yes</span>
        </label>
        <label className="flex items-center space-x-2">
          <input
            type="radio"
            name="futureParticipation"
            value="No"
            checked={formData.futureParticipation === "No"}
            onChange={handleChange}
            className="w-4 h-4"
          />
          <span>No</span>
        </label>
      </div>

      {/* Additional Comments */}
      <label className="block text-gray-700 font-bold mb-2">
        Any additional comments or suggestions?
      </label>
      <textarea
        name="additionalComments"
        value={formData.additionalComments}
        onChange={handleChange}
        rows="3"
        className="w-full p-2 border rounded mb-2"
        placeholder="Your thoughts..."
      ></textarea>

      {error && <p className="text-red-600 text-sm font-semibold mb-2">{error}</p>}

      <button type="submit" className="bg-red-600 text-white px-4 py-2 rounded w-full mt-4">
        Next
      </button>
    </form>
  );
};

export default ElectoralEngagement;
