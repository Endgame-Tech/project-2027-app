import { useState } from "react";
import Demographics from "./stages/demand-stages/Demographics";
import KeyIssues from "./stages/demand-stages/KeyIssues";
import InfrastructureNeeds from "./stages/demand-stages/InfrastructureNeeds";
import GovernmentAssistance from "./stages/demand-stages/GovernmentAssistance";
import ElectoralEngagement from "./stages/demand-stages/ElectoralEngagement";
import SubmitAndPrivacy from "./stages/demand-stages/SubmitAndPrivacy";
import DemandSummary from "./stages/demand-stages/DemandSummary";

const DemandsForm = ({ closeModal }) => {
  const [stage, setStage] = useState(1);
  const [demandData, setDemandData] = useState({});

  const totalStages = 6;

  const handleNext = (data) => {
    setDemandData({ ...demandData, ...data });
    setStage(stage + 1);
  };

  return (
    <div className="flex flex-col items-center p-2 w-full">
      {stage === 1 && <Demographics onNext={handleNext} />}
      {stage === 2 && <KeyIssues onNext={handleNext} />}
      {stage === 3 && <InfrastructureNeeds onNext={handleNext} />}
      {stage === 4 && <GovernmentAssistance onNext={handleNext} />}
      {stage === 5 && <ElectoralEngagement onNext={handleNext} />}
      {stage === 6 && <SubmitAndPrivacy onNext={handleNext} />}
      {stage === 7 && <DemandSummary demandData={demandData} closeModal={closeModal} />}
    </div>
  );
};

export default DemandsForm;
