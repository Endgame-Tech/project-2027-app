import { useState } from "react";
import AssessorInfo from "./stages/AssessorInfo";
import CandidateInfo from "./stages/CandidateInfo";
import CapacitySection from "./stages/CapacitySection";
import CompetenceSection from "./stages/CompetenceSection";
import CharacterSection from "./stages/CharacterSection";
import ResultPopup from "./stages/ResultPopup";

const EvaluationForm = ({ closeModal }) => {
  const [stage, setStage] = useState(1);
  const [evaluationData, setEvaluationData] = useState({});

  const handleNext = (data) => {
    setEvaluationData({ ...evaluationData, ...data });
    setStage(stage + 1);
  };
  

  return (
    <div className="flex flex-col items-center p-2 w-full">
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
