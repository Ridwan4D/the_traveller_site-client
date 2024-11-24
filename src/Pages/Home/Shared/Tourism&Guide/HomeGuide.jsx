import { Link } from "react-router-dom";
import useGuides from "../../../../Hooks/useGuides";

const HomeGuide = () => {
  const { guides } = useGuides();

  return (
    <div className="p-4 pb-0 bg-gray-100">
      {/* Guides Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {guides.slice(0, 3).map((guide) => (
          <div key={guide._id} className="border rounded-lg p-4 shadow-lg">
            <img
              src={guide.userImage}
              alt={guide.userName}
              className="w-full h-60 object-contain rounded-md"
            />
            <h3 className="text-lg font-semibold mt-3">{guide.userName}</h3>
            <p className="text-gray-600 text-sm">Role: {guide.role}</p>
            <p className="text-gray-600 text-sm">
              Experience: {guide.requested || "Not specified"}
            </p>
            <Link
              to={`/guideDetails/${guide?._id}`}
              className="btn mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>

      {/* All Guides Button */}
      <div className="mt-6 text-center">
        <Link
          to="/allGuides"
          className="btn px-6 py-2 bg-teal-500 text-white rounded hover:bg-teal-600"
        >
          View All Guides
        </Link>
      </div>
    </div>
  );
};

export default HomeGuide;
