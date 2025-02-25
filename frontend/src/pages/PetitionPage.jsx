import { useState } from "react";
import PetitionForm from "../components/PetitionForm";
import PetitionPreview from "../components/PetitionPreview";
import { Helmet } from "react-helmet-async";
import petitionImage from '../images/Petition-preview.jpg'

const PetitionPage = () => {
  const [petitionData, setPetitionData] = useState(null);
  const [showPreview, setShowPreview] = useState(false);

  return (
    <>
      <div
        className="
        flex flex-col w-full 
        items-center justify-center 
        pt-[150px] pb-[100px] text-white bg-black p-4" >
        <Helmet>
          <title>Sign the Petition | Project 2027 </title>
        </Helmet>
        <h1 className="text-[50px] font-[600] text-center mb-2">Sign the Petition</h1>
        <p className="text-[18px] py-2 w-[320px] md:w-[520px] text-center mb-4">
          Join millions of Nigerians demanding that the Executive and Legislature adopt the FixINEC FixNigeria Report and the Justice Uwais Report to reform our electoral system
        </p>
        <div className=" w-full flex py-2 flex-col items-center">
          <img src={petitionImage} alt="Petition Image" className="w-[80%] md:w-[35%]" />
        </div>
      </div>
      <div className=" flex flex-col py-16 w-full items-center">
        <div className="px-2">
          <h2 className=" text-center text-2xl font-bold">Fill the form to sign the Petition to #FixINEC</h2>
        </div>
        <div className="py-10 flex flex-col items-center w-[100%]">
          <PetitionForm setPetitionData={setPetitionData} setShowPreview={setShowPreview} />
        </div>

        {showPreview && petitionData && (
          <PetitionPreview petitionData={petitionData} setShowPreview={setShowPreview} />
        )}
      </div>
    </>
  );
};

export default PetitionPage;
