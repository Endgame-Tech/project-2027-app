import { useState } from "react";
import statesLGAsAndWards from "../lib/statesLGAsAndWards.js"; // Ensure correct path
import axios from "axios";

const PetitionForm = ({ setPetitionData, setShowPreview, vendor }) => {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [sex, setSex] = useState("");
  const [occupation, setOccupation] = useState("");
  const [ageRange, setAgeRange] = useState("");
  const [isVoter, setIsVoter] = useState("");
  const [wantsPVC, setWantsPVC] = useState("");
  const [state, setState] = useState("");
  const [lga, setLga] = useState("");
  const [ward, setWard] = useState("");
  const [lgas, setLgas] = useState([]);
  const [wards, setWards] = useState([]);
  const [wantsToVolunteer, setWantsToVolunteer] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const backendURL = import.meta.env.VITE_BACKEND_URL;

  const handleStateChange = (e) => {
    const selectedState = e.target.value;
    setState(selectedState);
    if (selectedState && statesLGAsAndWards[selectedState]) {
      setLgas(Object.keys(statesLGAsAndWards[selectedState].lgas));
    } else {
      setLgas([]);
    }
    setLga(""); // Reset LGA when state changes
    setWards([]); // Reset wards when state changes
    setWard(""); // Reset ward when state changes
  };

  const handleLGAChange = (e) => {
    const selectedLGA = e.target.value;
    setLga(selectedLGA);
    if (state && selectedLGA && statesLGAsAndWards[state].lgas[selectedLGA]) {
      setWards(statesLGAsAndWards[state].lgas[selectedLGA].wards);
    } else {
      setWards([]);
    }
    setWard(""); // Reset ward when LGA changes
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !fullName ||
      !phone ||
      !email ||
      !sex ||
      !occupation ||
      !ageRange ||
      !isVoter ||
      !state ||
      !lga ||
      !ward ||
      !wantsToVolunteer ||
      !vendor
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    setError("");

    const petitionData = {
      fullName,
      phone,
      email,
      sex,
      occupation,
      ageRange,
      isVoter,
      wantsPVC,
      state,
      lga,
      ward,
      wantsToVolunteer,
      vendor,
    };

    try {
      const response = await axios.post(`${backendURL}/api/petition/sign-petition`, petitionData);
      if (response.status === 201) {
        setPetitionData(petitionData);
        setShowPreview(true);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-2xl grid md:grid-cols-2 gap-4">
      <input type="hidden" name="vendor" value={vendor} />
      <div className="col-span-2 text-center text-sm text-gray-500">
        <span className="text-gray-800">Disclaimer:</span> In compliance with data protection and privacy regulations, all phone numbers provided in this petition form will be blurred before submission to the National Assembly. Only necessary information required for the petition's validity will be retained.
      </div>
      <div className="col-span-2 text-center font-bold text-sm text-gray-800">
        <span className="text-blue-500 underline">
          <a href='https://docs.google.com/document/d/1Sgx-6aM4x8RxqqXfml3F14p48HIsGLizBi9F3fRM2u8/edit?usp=drivesdk' target="blank">
            Click here
          </a>
        </span> to view the 20+page TPO constitutional amendments for electoral reform
      </div>

      <div className="col-span-2 md:col-span-1">
        <label className="block text-gray-700 font-bold">Full Name:</label>
        <input
          type="text"
          className="w-full border-gray-500 p-2 border rounded"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />
      </div>

      <div className="col-span-2 md:col-span-1">
        <label className="block text-gray-700 font-bold">Phone Number (WhatsApp):</label>
        <input
          type="tel"
          className="w-full p-2 border border-gray-500 rounded"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
      </div>

      <div className="col-span-2 md:col-span-1">
        <label className="block text-gray-700 font-bold">Email:</label>
        <input
          type="email"
          className="w-full p-2 border border-gray-500 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="col-span-2 md:col-span-1">
        <label className="block text-gray-700 font-bold">Sex:</label>
        <select
          className="w-full p-2 border border-gray-500 rounded"
          value={sex}
          onChange={(e) => setSex(e.target.value)}
          required
        >
          <option value="">Select</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </div>

      <div className="col-span-2 md:col-span-1">
        <label className="block text-gray-700 font-bold">Occupation:</label>
        <input
          type="text"
          className="w-full p-2 border border-gray-500 rounded"
          value={occupation}
          onChange={(e) => setOccupation(e.target.value)}
          required
        />
      </div>

      <div className="col-span-2 md:col-span-1">
        <label className="block text-gray-700 font-bold">Age Range:</label>
        <select
          className="w-full p-2 border border-gray-500 rounded"
          value={ageRange}
          onChange={(e) => setAgeRange(e.target.value)}
          required
        >
          <option value="">Select</option>
          <option value="18-30">18 - 30</option>
          <option value="31-40">31 - 40</option>
          <option value="41-60">41 - 60</option>
          <option value="61 and above">61 and above</option>
        </select>
      </div>

      <div className="col-span-2">
        <label className="block text-gray-700 font-bold">Are you a registered voter?</label>
        <select
          className="w-full p-2 border border-gray-500 rounded"
          value={isVoter}
          onChange={(e) => setIsVoter(e.target.value)}
          required
        >
          <option value="">Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>
      {isVoter === "No" && (
        <div className="col-span-2 transition-all duration-500 ease-in-out">
          <label className="block text-gray-700 font-bold">Do you want to get a PVC?</label>
          <select className="w-full p-2 border border-gray-500 rounded" value={wantsPVC} onChange={(e) => setWantsPVC(e.target.value)}>
            <option value="">Select</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>
      )}


      <div className="col-span-2 md:col-span-1">
        <label className="block text-gray-700 font-bold">State you wish to vote in:</label>
        <select
          className="w-full p-2 border border-gray-500 rounded"
          value={state}
          onChange={handleStateChange}
          required
        >
          <option value="">Select preferred State</option>
          {Object.keys(statesLGAsAndWards).map((stateName) => (
            <option key={stateName} value={stateName}>
              {stateName}
            </option>
          ))}
        </select>
      </div>

      <div className="col-span-2 md:col-span-1">
        <label className="block text-gray-700 font-bold">LGA you wish to vote in:</label>
        <select
          className="w-full p-2 border border-gray-500 rounded"
          value={lga}
          onChange={handleLGAChange}
          disabled={!state}
          required
        >
          <option value="">Select your LGA</option>
          {lgas.map((lgaName) => (
            <option key={lgaName} value={lgaName}>
              {lgaName}
            </option>
          ))}
        </select>
      </div>

      <div className="col-span-2">
        <label className="block text-gray-700 font-bold">Ward you wish to vote in:</label>
        <select
          className="w-full p-2 border border-gray-500 rounded"
          value={ward}
          onChange={(e) => setWard(e.target.value)}
          disabled={!lga}
          required
        >
          <option value="">Select your Ward</option>
          {wards.map((wardName) => (
            <option key={wardName} value={wardName}>
              {wardName}
            </option>
          ))}
        </select>
      </div>

      <div className="col-span-2">
        <label className="block text-gray-700 font-bold">Would you love to protect your vote / Be a Polling Unit Agent?</label>
        <select
          className="w-full p-2 border border-gray-500 rounded"
          value={wantsToVolunteer}
          onChange={(e) => setWantsToVolunteer(e.target.value)}
          required
        >
          <option value="">Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>
      {error && <p className="text-red-600 text-center mb-4 col-span-2">{error}</p>}
      <button type="submit" className="bg-[#2BAE72] text-white px-4 py-2 rounded w-full col-span-2" disabled={loading}>
        {loading ? "Submitting..." : "Submit"}
      </button>

    </form>
  );
};

export default PetitionForm;