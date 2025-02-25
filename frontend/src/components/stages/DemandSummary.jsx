import { useRef } from "react";
import domtoimage from "dom-to-image";

const DemandSummary = ({ demandData, closeModal }) => {
  const resultRef = useRef(null);

  const handleDownload = () => {
    if (resultRef.current) {
      const scale = 3; // Increase resolution (try different values if needed)

      domtoimage
        .toPng(resultRef.current, {
          quality: 1,
          bgcolor: "#1E2938",
          width: resultRef.current.clientWidth * scale,
          height: resultRef.current.clientHeight * scale,
          style: {
            transform: `scale(${scale})`,
            transformOrigin: "top left",
            width: `${resultRef.current.clientWidth}px`,
            height: `${resultRef.current.clientHeight}px`
          }
        })
        .then((dataUrl) => {
          const link = document.createElement("a");
          link.href = dataUrl;
          link.download = `Citizen Demand - ${demandData.fullName || "Preview"}.png`;
          link.click();
        })
        .catch((error) => {
          console.error("Error generating image:", error);
          alert("Failed to generate image. Please try again.");
        });
    }
  };


  return (
    <div className="fixed inset-0 flex items-center text-white justify-center bg-black bg-opacity-50 px-4">
      <div className="bg-gray-800 w-full max-w-2xl p-4 rounded-lg shadow-lg relative">
        <button
          onClick={closeModal}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          ✖
        </button>

        {/* Summary Content - Limited Height */}
        <div ref={resultRef} className="min-h-[75vh] max-h-[80vh] overflow-y-auto text-left py-6 px-4">
          <h2 className="text-2xl font-bold mb-3 text-center">#ThePeoplesMandate</h2>
          <p className="text-3xl font-semibold"> {demandData.fullName || "N/A"}</p>
          <p className="text-xs text-gray-200 mb-3">
            State: {demandData.state || "N/A"} | LGA: {demandData.lga || "N/A"}
          </p>

          {/* Key Issues */}
          <div className="mb-3">
            <h3 className="text-md font-bold">Key Issues</h3>
            <ul className="grid grid-cols-2 gap-1 text-white my-3 text-xs">
              {demandData.topIssues?.map((issue, index) => (
                <li key={index} className={`bg-red-500 rounded-lg p-1 text-center`}>
                  {issue}
                </li>
              )) || <li>No issues selected</li>}
            </ul>
            <p className="text-xs mt-1"><strong>Actions Suggested:</strong></p>
            <p className="p-2 bg-gray-600 rounded-lg text-xs">{demandData.specificActions || "N/A"}</p>
          </div>

          {/* Infrastructure Needs */}
          <div className="mb-3">
            <h3 className="text-md font-bold">Infrastructure Needs</h3>
            <ul className="grid grid-cols-2 gap-1 text-white my-3 text-xs">
              {demandData.neededInfrastructure?.map((need, index) => (
                <li key={index} className={`bg-blue-500 text-center rounded-lg p-1`}>
                  {need}
                </li>
              )) || <li>No needs selected</li>}
            </ul>
            <p className="text-xs"><strong>Issues Faced:</strong></p>
            <p className="p-2 bg-gray-600 rounded-lg text-xs">{demandData.specificProblem || "N/A"}</p>
          </div>

          {/* Government Assistance */}
          <div className="mb-3">
            <h3 className="text-md font-bold">Top Demands</h3>

            <ul className="grid grid-cols-2 gap-1 text-white my-3 text-xs">
              {demandData.assistanceTypes?.map((type, index) => (
                <li key={index} className={`bg-green-600 rounded-lg text-center p-1`}>
                  {type}
                </li>
              )) || <li>No assistance types selected</li>}
            </ul>
            <p className="text-xs"><strong>How Government Can Help:</strong></p>
            <p className="p-2 italic bg-gray-600 rounded-lg text-xs">{demandData.directImprovement || "N/A"}</p>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-3 flex justify-between">
          <button onClick={handleDownload} className="bg-green-600 text-white px-3 py-1 rounded text-sm">
            Download
          </button>
          <button onClick={closeModal} className="bg-red-600 text-white px-3 py-1 rounded text-sm">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default DemandSummary;
