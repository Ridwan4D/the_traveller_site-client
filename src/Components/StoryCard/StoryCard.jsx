import { Link } from "react-router-dom";
import PropType from "prop-types";
const StoryCard = ({ story }) => {
  const { description, tourName, tourType, guideName, tourDate, _id } = story;
  // console.log(_id);
  return (
    <div>
      
      <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <h3 className="mb-2 text-xl md:text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {tourName.slice(0, 10)}...{" "}
          <sub className="text-sm font-medium">with {guideName}</sub>
        </h3>
        <h5 className="text-base md:text-xl font-semibold text-gray-900 dark:text-white">
          {tourType.slice(0, 20)}
        </h5>
        <p className="text-sm my-2">Visited No: {tourDate}</p>
        <p className="mb-3 text-xs md:text-sm font-normal text-gray-700 dark:text-gray-400">
          {description?.slice(0, 60)}....
        </p>
        <Link
          to={`/storyDetails/${_id}`}
          className="inline-flex items-center bg-blue-500 px-3 py-2 text-sm font-medium text-center text-white rounded-md focus:ring-4 focus:outline-none focus:ring-[#10b981]/30 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Read More
        </Link>
      </div>
    </div>
  );
};
StoryCard.propTypes = {
  story: PropType.object,
};
export default StoryCard;
