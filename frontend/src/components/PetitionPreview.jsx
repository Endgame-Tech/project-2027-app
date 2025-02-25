import { useEffect, useRef, useState } from "react";
import html2canvas from "html2canvas";
import petitionImage from '../images/Petition.jpg';
import { FaTwitter, FaFacebook, FaInstagram } from "react-icons/fa";

const PetitionPreview = ({ petitionData, setShowPreview }) => {
  const petitionRef = useRef(null);
  const [imageUrl, setImageUrl] = useState("");

  // Function to capture the image
  const captureImage = async () => {
    if (petitionRef.current) {
      const canvas = await html2canvas(petitionRef.current);
      const image = canvas.toDataURL("image/png");

      // Create a Blob URL for sharing
      const blob = await (await fetch(image)).blob();
      const url = URL.createObjectURL(blob);
      setImageUrl(url);

      return image; // Return base64 image for download
    }
    return null;
  };

  // Function to download the image
  const handleDownload = async () => {
    const image = await captureImage();
    if (image) {
      const link = document.createElement("a");
      link.href = image;
      link.download = `FixINEC Petition by ${petitionData.firstName}.png`;
      link.click();
    }
  };

  // Function to share on Twitter (X)
  const shareOnTwitter = () => {
    const tweetText = encodeURIComponent(
      `I just signed the #FixINEC petition! Join me in demanding electoral reforms.\n\n#Project2027`
    );
    const url = `https://twitter.com/intent/tweet?text=${tweetText}&url=${imageUrl}`;
    window.open(url, "_blank");
  };

  // Function to share on Facebook
  const shareOnFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${imageUrl}`;
    window.open(url, "_blank");
  };

  // Function to share on Instagram (Instagram doesn't allow direct image uploads via URL)
  const shareOnInstagram = () => {
    alert("Instagram does not support direct image sharing. Please download the image and upload it manually.");
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center px-2 bg-black bg-opacity-50">
      <div className="bg-white w-full md:w-md p-6 rounded-lg shadow-lg text-center">
        <h2 className="text-2xl font-bold mb-4">Petition Preview</h2>

        {/* Petition Design */}
        <div ref={petitionRef} className="relative flex flex-col items-center w-full">
          <img
            src={petitionImage}
            alt="Petition"
            className="w-[100%] h-full object-cover"
          />

          {/* Overlay User Data */}
          <div className="absolute top-9 md:top-10 text-[#FA5734] left-7 md:left-7.5 text-[10px] md:text-[12px] font-bold">
            <p>PETITION BY: {petitionData.firstName.toUpperCase()} {petitionData.lastName.toUpperCase()}, {petitionData.state.toUpperCase()} STATE</p>
          </div>
          <div className="absolute bottom-5 md:bottom-7 text-black text-left left-7 md:left-8 text-[6px] font-bold">
            <p className="font-bold text-[7px]">Signed</p>
            <p>{petitionData.firstName} {petitionData.lastName},</p>
            <p>{petitionData.lga} LGA, {petitionData.state} State.</p>
          </div>
        </div>

        {/* Download & Share Buttons */}
        <div className="mt-4 flex flex-wrap justify-center gap-4">
          <button onClick={handleDownload} className="bg-green-600 text-white px-4 py-2 rounded">
            Download
          </button>
          <button onClick={() => setShowPreview(false)} className="bg-red-600 text-white px-4 py-2 rounded">
            Close
          </button>
        </div>

        {/* Social Media Share Buttons */}
        <div className="mt-6 flex justify-center space-x-4">
          <button onClick={shareOnTwitter} className="text-blue-500 hover:text-blue-700 text-2xl">
            <FaTwitter />
          </button>
          <button onClick={shareOnFacebook} className="text-blue-700 hover:text-blue-900 text-2xl">
            <FaFacebook />
          </button>
          <button onClick={shareOnInstagram} className="text-pink-600 hover:text-pink-800 text-2xl">
            <FaInstagram />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PetitionPreview;
