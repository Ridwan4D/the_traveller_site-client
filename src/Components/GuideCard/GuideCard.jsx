import PropType from "prop-types";
import { Link } from "react-router-dom";
const GuideCard = ({ guide }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4 flex flex-col items-center">
      <img
        src={guide.userImage}
        alt={guide.name}
        className="w-24 h-24 rounded-full object-cover mb-4"
      />
      <h3 className="text-lg font-semibold text-gray-800">{guide.userName}</h3>
      <p className="text-gray-600">{guide.experience} years of experience</p>
      <Link
        to={`/guideDetails/${guide?._id}`}
        className="btn mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
      >
        View Profile
      </Link>
    </div>
  );
};
GuideCard.propTypes = {
  guide: PropType.object,
};
export default GuideCard;
