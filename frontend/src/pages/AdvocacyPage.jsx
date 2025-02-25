import AdvocacyForm from "../components/AdvocacyForm";
import { Helmet } from "react-helmet-async";
import advocacyImage from "../images/event-guide.png";

const AdvocacyPage = () => {
  return (
    <>
      <div className="flex flex-col w-full items-center justify-center pt-[150px] pb-[100px] text-white bg-black ">
        <Helmet>
          <title>Organise Advocacy Events | Project 2027</title>
        </Helmet>
        <h1 className="text-[50px] font-[600] text-center mb-2">Organise Advocacy Events</h1>
        <p className="text-[18px] py-1 w-[320px] md:w-[520px] text-center mb-4">
          Want to organise advocacy events? Fill in your details and get our free guide!
        </p>
        <div className="w-full flex py-2 flex-col items-center">
          <img src={advocacyImage} alt="Advocacy Event" className="w-[80%] md:w-[35%]" />
        </div>
      </div>

      <div className="flex flex-col py-16 w-full items-center">
        <div className="px-2">
          <h2 className="text-center text-2xl font-bold">Fill the form to get the Advocacy Guide</h2>
        </div>
        <div className="py-10 flex flex-col items-center w-[100%]">
          <AdvocacyForm />
        </div>
      </div>
    </>
  );
};

export default AdvocacyPage;
