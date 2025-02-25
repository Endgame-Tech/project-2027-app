import { useEffect, useRef } from "react";
import axios from "axios"; // ✅ Import Axios
import domtoimage from "dom-to-image";

const ResultPopup = ({ evaluationData, closeModal }) => {
  const resultRef = useRef(null);
  

  // ✅ Compute percentage scores
  const capacityPercent = ((evaluationData.capacityScore / 30) * 100).toFixed(1);
  const competencePercent = ((evaluationData.competenceScore / 30) * 100).toFixed(1);
  const characterPercent = ((evaluationData.characterScore / 40) * 100).toFixed(1);
  const totalScore = (
    (parseFloat(capacityPercent) + parseFloat(competencePercent) + parseFloat(characterPercent)) / 3
  ).toFixed(1); // ✅ Average percentage

  // ✅ Extract Candidate & Assessor Info
  const candidateName = evaluationData.candidateName || "Unknown Candidate";
  const assessorName = evaluationData.fullName || "Unknown Assessor";

  // ✅ Leadership Interpretation
  const getRating = (score) => {
    if (score >= 90) return { title: "🌟 Outstanding Leadership Potential", recommendation: "Highly recommended for leadership." };
    if (score >= 80) return { title: "✅ Strong Leadership Capacity", recommendation: "Recommended for leadership with minor improvements." };
    if (score >= 65) return { title: "⚠️ Moderate Leadership Readiness", recommendation: "Some qualities present, but needs improvements." };
    if (score >= 50) return { title: "🛑 Basic Leadership Fitness", recommendation: "Needs significant development before assuming office." };
    return { title: "❌ Unfit for Office", recommendation: "Not recommended for leadership." };
  };

  const { title, recommendation } = getRating(totalScore);

  // ✅ Store Data in MongoDB when the popup appears
  useEffect(() => {
    const submitEvaluation = async () => {
      const evaluationDataToSubmit = {
        assessor: {
          fullName: evaluationData.fullName,
          email: evaluationData.email,
          phone: evaluationData.phone,
          organisation: evaluationData.organisation,
          state: evaluationData.state,
          votingExperience: evaluationData.votingExperience,
          designation: evaluationData.designation,
          relationship: evaluationData.relationship,
        },
        candidate: {
          candidateName: evaluationData.candidateName,
          position: evaluationData.position,
          party: evaluationData.party,
          state: evaluationData.state,
        },
        scores: {
          capacity: capacityPercent,
          competence: competencePercent,
          character: characterPercent,
        },
        finalScore: totalScore,
        evaluatedAt: new Date().toISOString(), // ✅ Store timestamp
      };

      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/evaluation/submit`,
          evaluationDataToSubmit
        );

        console.log("Evaluation successfully stored:", response.data);
      } catch (error) {
        console.error("Error storing evaluation:", error.response?.data || error.message);
      }
    };

    submitEvaluation(); // ✅ Run when the result popup appears
  }, []); // ✅ Runs once when the component mounts

  // ✅ Handle Image Download
  const handleDownload = () => {
    if (resultRef.current) {
      domtoimage.toJpeg(resultRef.current, { quality: 1, bgcolor: "#ffffff" })
        .then((dataUrl) => {
          const link = document.createElement("a");
          link.href = dataUrl;
          link.download = `Evaluation Result - ${candidateName}.jpg`;
          link.click();
        })
        .catch((error) => console.error("Error generating image:", error));
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 px-4">
      <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg relative">
        <button onClick={closeModal} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">✖</button>

        {/* ✅ Candidate Name & Position */}
        <div ref={resultRef} className="text-center py-8 px-2">
          <h2 className="text-2xl font-bold mb-2">3Cs Evaluations Results</h2>
          <p className="text-xl font-semibold text-gray-700">{candidateName}</p>
          <p className="text-sm text-gray-500 mb-4">Assessed by {assessorName}</p>

          {/* ✅ Score Breakdown (in %) */}
          <div className="text-left bg-gray-200 p-4 rounded-lg mb-4">
            <p className="text-lg font-semibold">Capacity Score: {capacityPercent}%</p>
            <p className="text-lg font-semibold">Competence Score: {competencePercent}%</p>
            <p className="text-lg font-semibold">Character Score: {characterPercent}%</p>
            <hr className="my-2" />
            <p className="text-xl font-bold">Total Score: {totalScore}%</p>
          </div>

          {/* ✅ Leadership Rating & Recommendation */}
          <p className="text-xl font-bold mt-4">{title}</p>
          <p className="text-sm text-gray-600 mt-2">{recommendation}</p>

          {/* ✅ Disclaimer */}
          <p className="text-xs text-gray-500 mt-4">
            This result is for personal consumption and is subjective based on the judgement of the assessor.
            To learn more, visit <a href="https://mandate4.org/3Csframework" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">mandate4.org/3Csframework</a>.
          </p>
        </div>

        {/* ✅ Action Buttons */}
        <div className="mt-4 flex justify-between">
          <button onClick={handleDownload} className="bg-green-600 text-white px-4 py-2 rounded">
            Download
          </button>
          <button onClick={closeModal} className="bg-red-600 text-white px-4 py-2 rounded">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultPopup;
