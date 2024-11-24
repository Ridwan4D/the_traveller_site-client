import { useParams } from "react-router-dom";
import useGuides from "../../Hooks/useGuides";
import TopLayer from "../../Components/TopLayerOfPage/TopLayer";

const GuideDetails = () => {
  const { id } = useParams();
  const { guides } = useGuides();
  const theGuide = guides?.find((guide) => guide?._id === id);

  return (
    <div className="p-8 bg-gray-50 dark:bg-gray-900">
      <TopLayer page={"guideDetails"} guideMail={theGuide?.userEmail} />
      {theGuide ? (
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md dark:bg-gray-800">
          {/* Guide Image and Name */}
          <div className="relative">
            <img
              className="w-full h-64 md:h-96 object-cover md:object-contain rounded-t-lg"
              src={theGuide?.userImage}
              alt={theGuide?.userName}
            />
            <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white px-4 py-2 rounded-md shadow-md">
              <h2 className="text-2xl font-bold">{theGuide?.userName}</h2>
              <p className="text-sm text-gray-300">{theGuide?.role}</p>
            </div>
          </div>

          {/* Guide Info */}
          <div className="p-6">
            <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-4">
              Guide Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Email */}
              <div>
                <p className="text-gray-700 dark:text-gray-300 font-medium">
                  Email:
                </p>
                <p className="text-gray-900 dark:text-gray-100">
                  {theGuide?.userEmail}
                </p>
              </div>

              {/* Phone */}
              <div>
                <p className="text-gray-700 dark:text-gray-300 font-medium">
                  Phone:
                </p>
                <p className="text-gray-900 dark:text-gray-100">
                  {theGuide?.phone}
                </p>
              </div>

              {/* Address */}
              <div>
                <p className="text-gray-700 dark:text-gray-300 font-medium">
                  Address:
                </p>
                <p className="text-gray-900 dark:text-gray-100">
                  {theGuide?.address}
                </p>
              </div>

              {/* Education */}
              <div>
                <p className="text-gray-700 dark:text-gray-300 font-medium">
                  Education:
                </p>
                <p className="text-gray-900 dark:text-gray-100">
                  {theGuide?.education}
                </p>
              </div>

              {/* Experience */}
              <div>
                <p className="text-gray-700 dark:text-gray-300 font-medium">
                  Experience:
                </p>
                <p className="text-gray-900 dark:text-gray-100">
                  {theGuide?.experience}
                </p>
              </div>

              {/* Languages */}
              <div>
                <p className="text-gray-700 dark:text-gray-300 font-medium">
                  Languages:
                </p>
                <p className="text-gray-900 dark:text-gray-100">
                  {theGuide?.languages}
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-600 dark:text-gray-300">
          Guide not found or loading...
        </p>
      )}
    </div>
  );
};

export default GuideDetails;
