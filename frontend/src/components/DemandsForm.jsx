import { useState } from "react";
import Demographics from "./stages/Demographics";
import KeyIssues from "./stages/KeyIssues";
import InfrastructureNeeds from "./stages/InfrastructureNeeds";
import GovernmentAssistance from "./stages/GovernmentAssistance";
import ElectoralEngagement from "./stages/ElectoralEngagement";
import SubmitAndPrivacy from "./stages/SubmitAndPrivacy";
import DemandSummary from "./stages/DemandSummary";

const DemandsForm = ({ closeModal }) => {
  const [stage, setStage] = useState(1);
  const [demandData, setDemandData] = useState({});

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
