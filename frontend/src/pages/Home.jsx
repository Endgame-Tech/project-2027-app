import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const Home = () => {
  return (
    <div className="flex flex-col items-center w-full justify-center min-h-[calc(100vh-6rem)] bg-gray-100 p-6">
      <Helmet>
        <title>Home | Project 2027</title>
      </Helmet>
      <h1 className="text-4xl font-bold mb-4 text-center">Welcome to Project 2027</h1>
      <p className="text-lg text-gray-600 mb-6 text-center max-w-2xl">
        Join the movement! Sign the petition and let your voice be heard. Click the button below to get started.
      </p>

      <Link to="/petition">
        <button className="bg-red-600 text-white px-6 py-3 my-3 rounded-lg text-lg font-semibold shadow-md hover:bg-red-700 transition">
          Sign the Petition
        </button>
      </Link>

      <Link to="/advocacy">
        <button className="bg-red-600 text-white px-6 py-3  my-3 rounded-lg text-lg font-semibold shadow-md hover:bg-red-700 transition">
          Organise Advocacy Event
        </button>
      </Link>

      <Link to="/evaluation">
        <button className="bg-red-600 text-white px-6 py-3  my-3 rounded-lg text-lg font-semibold shadow-md hover:bg-red-700 transition">
          New Class Evaluation Tool
        </button>
      </Link>

      <Link to="/demands">
        <button className="bg-red-600 text-white px-6 py-3  my-3 rounded-lg text-lg font-semibold shadow-md hover:bg-red-700 transition">
          Citizens' Demand Collation Tool
        </button>
      </Link>

    </div>
  );
};

export default Home;
