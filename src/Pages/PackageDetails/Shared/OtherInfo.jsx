import PropTypes from "prop-types";
import parse from "html-react-parser";

const OtherInfo = ({ pack }) => {
  const parsedContent = parse(pack?.description);

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 md:p-6 space-y-6">
      {/* Package Title */}
      <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-4 border-b-2 pb-2">
        {pack.tour_name}
      </h2>

      {/* Package Description */}
      <div className="text-base md:text-lg lg:text-xl text-gray-700 leading-relaxed">
        {parsedContent}
      </div>

      {/* Package Price */}
      <div className="flex items-center bg-gray-100 p-4 rounded-lg shadow-inner">
        <span className="text-lg md:text-xl lg:text-2xl font-semibold text-gray-800">
          Price:
        </span>
        <span className="text-lg md:text-xl lg:text-2xl text-blue-600 font-bold ml-2">
          ${pack.price}
        </span>
      </div>

      <div className="space-y-6">
        {/* Tour Features */}
        <div>
          <h3 className="text-lg md:text-xl lg:text-2xl font-semibold text-gray-800 mb-2">
            Package Activities:
          </h3>
          <ul className="list-disc pl-5 space-y-4">
            {pack?.tour_plan?.map((dayPlan, index) => (
              <li
                key={index}
                className="p-4 bg-gray-50 rounded-lg shadow-md hover:bg-gray-100"
              >
                <div className="text-base md:text-lg lg:text-xl font-bold text-blue-700">
                  Day {dayPlan.day}
                </div>
                <p className="pl-4 text-sm md:text-base lg:text-lg text-gray-600">
                  {dayPlan.activities}
                </p>
              </li>
            ))}
          </ul>
        </div>

        {/* Duration */}
        <div className="flex items-center gap-x-4">
          <h3 className="text-lg md:text-xl lg:text-2xl font-semibold text-gray-800">
            Duration:
          </h3>
          <p className="text-base md:text-lg lg:text-xl text-gray-600">
            {pack.duration}
          </p>
        </div>
      </div>
    </div>
  );
};

OtherInfo.propTypes = {
  pack: PropTypes.object.isRequired,
};

export default OtherInfo;
