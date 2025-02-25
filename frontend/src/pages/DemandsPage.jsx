import { useState } from "react";
import { Helmet } from "react-helmet-async";
import DemandsForm from "../components/DemandsForm"; // Import the demands form component

const DemandsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Helmet>
        <title>Citizens' Demand Collation Tool | Project 2027</title>
      </Helmet>

      {/* Landing Page */}
      <div className="flex flex-col w-full items-center justify-center min-h-[94vh] py-[150px] text-white bg-black p-4">
        <h1 className="text-[50px] font-[600] text-center mb-2">
          Citizens' Demand Collation Tool
        </h1>
        <p className="text-[18px] py-2 w-[320px] md:w-[520px] text-center mb-4">
          Submit your key demands, policy priorities, and expectations from the government.
          Click below to state your demand.
        </p>
        <button
          className="bg-red-600 text-white px-6 py-3 rounded-lg text-lg font-semibold shadow-md hover:bg-red-700 transition"
          onClick={() => setIsModalOpen(true)}
        >
          State Your Demand
        </button>
      </div>

      {/* Modal for Demands Form */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white w-full max-w-lg p-6 rounded-lg shadow-lg relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              ✖
            </button>
            <DemandsForm closeModal={() => setIsModalOpen(false)} />
          </div>
        </div>
      )}
    </>
  );
};

export default DemandsPage;
