import { useState } from "react";
import TpoPetitionForm from "../components/TpoPetitionForm";
import TpoPetitionPreview from "../components/TpoPetitionPreview";
import { Helmet } from "react-helmet-async";
// import petitionImage from '../images/Petition-preview.jpg';
import heroBG from '../images/bg.png';
import voteProtectImage from '../images/vote-protect.png';
import formBG from '../images/formBG.png';
import { TbSquareRoundedNumber1Filled } from "react-icons/tb";
import { TbSquareRoundedNumber2Filled } from "react-icons/tb";
import PeoplesLogo from "../images/peoplesLogo.svg";



const PeoplesPetitionPage = () => {
  const [petitionData, setPetitionData] = useState(null);
  const [showPreview, setShowPreview] = useState(false);

  return (
    <>
      <Helmet>
        <title>Sign the Petition | The People's Opposition </title>
      </Helmet>
      <div
        className="relative flex min-h-screen flex-col justify-between w-full py-[100px] text-white p-4"
        style={{ backgroundImage: `url(${heroBG})`, backgroundSize: "cover", backgroundPosition: "center" }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/85"></div>



        {/* Logo */}
        <div className="md:px-[10%] md:mb-0 mb-[70px] flex  flex-row items-center z-11">
          <img src={PeoplesLogo} alt="Obidient Movement Logo" className="md:w-[250px] w-[200px]" />
        </div>

        <div className="flex justify-center md:px-[10%] gap-10 items-center flex-col">

          {/* Become a Volunteer */}
          <div className="relative flex flex-col mb-10 md:flex-row items-center justify-center z-10 text-left">
            <div className=" w-full gap-6 flex flex-col">
              <div>
                <TbSquareRoundedNumber1Filled className="text-[#2BAE72] text-[40px] mb-4" />
                <h3 className="text-[30px] md:text-[45px] leading-[1] max-w-[500px] font-[600] mb-2">Sign the Petition</h3>
                <p className="text-[18px] py-2 w-[320px] md:w-[520px] mb-4">
                  Join millions of Nigerians demanding that the Executive and Legislature adopt the FixINEC FixNigeria Report and the Justice Uwais Report to reform our electoral system
                </p>
              </div>
              <div>
                <TbSquareRoundedNumber2Filled className="text-[#2BAE72] text-[40px] mb-4" />
                <h3 className="text-[30px] md:text-[45px] leading-[1] max-w-[500px] font-[600] mb-2">Protect your vote / Be a Polling Unit Agent</h3>
                <p className="text-[18px] w-[320px] md:w-[520px] mb-4">
                  Join the movement to safeguard democracy by ensuring free, fair, and transparent elections in your community.
                </p>
              </div>


            </div>
            <div className=" w-full hidden md:flex py-2 flex-col items-center md:items-left">
              <img src={voteProtectImage} alt="Petition Image" className="w-[80%] md:w-[100%]" />
            </div>
          </div>
        </div>


      </div>
      <div className=" flex flex-col py-16 w-full bg-white md:bg-cover items-center"
        style={{ backgroundImage: `url(${formBG})`, backgroundPosition: "left", backgroundRepeat: "no-repeat" }}
      >
        <div className="px-2">
          <h2 className=" text-center max-w-[600px] text-2xl font-bold">Fill the form to become a Citizen's Vote Protection Volunteer and Sign the Petition to Fix INEC</h2>
        </div>
        <div className="py-10 flex flex-col items-center w-[100%]">
          <TpoPetitionForm setPetitionData={setPetitionData} setShowPreview={setShowPreview} vendor="The People's Opposition" />
        </div>

        {showPreview && petitionData && (
          <TpoPetitionPreview petitionData={petitionData} setShowPreview={setShowPreview} />
        )}
      </div>
    </>
  );
};

export default PeoplesPetitionPage;
