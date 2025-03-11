import { useState } from "react";
import AssessorInfo from "./stages/evaluation-stages/AssessorInfo";
import CandidateInfo from "./stages/evaluation-stages/CandidateInfo";
import CapacitySection from "./stages/evaluation-stages/CapacitySection";
import CompetenceSection from "./stages/evaluation-stages/CompetenceSection";
import CharacterSection from "./stages/evaluation-stages/CharacterSection";
import ResultPopup from "./stages/evaluation-stages/ResultPopup";

const EvaluationForm = ({ closeModal }) => {
  const [stage, setStage] = useState(1);
  const [evaluationData, setEvaluationData] = useState({});

  const totalStages = 5;

  const handleNext = (data) => {
    setEvaluationData({ ...evaluationData, ...data });
    setStage(stage + 1);
  };


  return (
    <div className="flex flex-col items-center p-2 w-full">
      <div className="w-full max-w-md mb-4">
        <div className="relative w-full bg-gray-300 h-2 rounded-full">
          <div
            className="absolute top-0 left-0 h-2 bg-red-600 rounded-full transition-all duration-300"
            style={{ width: `${(stage / totalStages) * 100}%` }}
          ></div>
        </div>
        <p className="text-sm text-center mt-2 font-semibold">
          Step {stage} of {totalStages}
        </p>
      </div>
      {stage === 1 && <AssessorInfo onNext={handleNext} />}
      {stage === 2 && <CandidateInfo onNext={handleNext} />}
      {stage === 3 && <CapacitySection onNext={handleNext} />}
      {stage === 4 && <CompetenceSection onNext={handleNext} />}
      {stage === 5 && <CharacterSection onNext={handleNext} />}
      {stage === 6 && <ResultPopup evaluationData={evaluationData} closeModal={closeModal} />}
    </div>
  );
};

export default EvaluationForm;
