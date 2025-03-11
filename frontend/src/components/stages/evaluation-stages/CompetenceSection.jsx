import { useState } from "react";
import evaluationQuestions from "../../../lib/evaluationQuestions.js"; // Import JSON file

const CompetenceSection = ({ onNext }) => {
  const { sections } = evaluationQuestions.competence; // Get competence questions
  const [scores, setScores] = useState({});
  const [error, setError] = useState(""); // Error message for missing answers

  const handleChange = (e) => {
    setScores({ ...scores, [e.target.name]: parseInt(e.target.value) });
  };

  const calculateScore = () => {
    return sections.reduce((total, section) => {
      const subgroupScore = section.questions.reduce((subTotal, q) => {
        const selectedValue = scores[q.text] || 0; // Default to 0 if unanswered
        return subTotal + (selectedValue / 10) * (section.weight / section.questions.length);
      }, 0);
      return total + subgroupScore;
    }, 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // ✅ Validate: Ensure all questions are answered
    const allAnswered = sections.every((section) =>
      section.questions.every((q) => scores[q.text] !== undefined)
    );

    if (!allAnswered) {
      setError("⚠️ Please answer all questions before proceeding.");
      return;
    }

    setError(""); // Clear error if all are answered
    const totalCompetenceScore = parseFloat(calculateScore().toFixed(2));
    onNext({ competenceScore: totalCompetenceScore });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
      <h2 className="text-2xl font-bold mb-4">{evaluationQuestions.competence.title}</h2>

      {/* SCROLLABLE CONTAINER */}
      <div className="max-h-[60vh] overflow-y-auto p-2">
        {sections.map((section) => (
          <div key={section.subgroup} className="mb-6">
            {section.questions.map((q) => (
              <div key={q.text} className="mb-4">
                <label className="block text-gray-700 font-bold">{q.text}</label>
                <select
                  name={q.text}
                  className="w-full p-2 border rounded"
                  onChange={handleChange}
                  value={scores[q.text] !== undefined ? scores[q.text] : ""}
                  required
                >
                  <option value="">Select an answer</option>
                  {q.options.map((option) => (
                    <option key={option.label} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Error Message */}
      {error && <p className="text-red-600 text-sm font-semibold">{error}</p>}

      <button type="submit" className="bg-red-600 text-white px-4 py-2 rounded w-full mt-4">
        Next
      </button>
    </form>
  );
};

export default CompetenceSection;
