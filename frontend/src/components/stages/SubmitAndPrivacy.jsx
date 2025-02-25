import { useState } from "react";

const SubmitAndPrivacy = ({ onNext }) => {
  const [agreed, setAgreed] = useState(false);

  const handleCheckboxChange = (e) => {
    setAgreed(e.target.checked);
  };

  const handleNext = () => {
    if (agreed) {
      onNext({ agreedToPrivacy: true });
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
      <h2 className="text-2xl font-bold mb-4">Privacy & Consent</h2>
      <p className="text-gray-700 text-sm mb-4">
        I agree that my responses can be used to advocate for citizens’ demands to candidates and policymakers.
      </p>

      <label className="flex items-center space-x-2">
        <input type="checkbox" checked={agreed} onChange={handleCheckboxChange} className="w-4 h-4" />
        <span className="text-sm text-gray-700">I agree to the terms</span>
      </label>

      <button
        className={`mt-4 px-6 py-2 rounded text-white ${agreed ? "bg-red-600 hover:bg-red-700" : "bg-gray-400 cursor-not-allowed"}`}
        onClick={handleNext}
        disabled={!agreed}
      >
        See Your Demands
      </button>
    </div>
  );
};

export default SubmitAndPrivacy;
