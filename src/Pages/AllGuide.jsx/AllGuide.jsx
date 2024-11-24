import { Link } from "react-router-dom";
import SectionTitle from "../../Components/SectionTitle/SectionTitle";
import useGuides from "../../Hooks/useGuides";
import TopLayer from "../../Components/TopLayerOfPage/TopLayer";

const AllGuide = () => {
  const { guides } = useGuides();

  return (
    <div className="px-4 lg:px-8 py-12 bg-gray-100 h-screen">
      <TopLayer />
      <SectionTitle
        heading="Our Guides"
        subHeading="Meet Our Excellent Guides"
      />
      <div className="grid gap-6 grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
        {guides?.map((guide) => (
          <div
            key={guide?._id}
            className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow-lg p-6 hover:shadow-2xl transition-all transform hover:scale-105 dark:bg-gray-800 dark:border-gray-700"
          >
            <div className="relative mb-4">
              <img
                className="w-24 h-24 rounded-full mx-auto border-4 border-blue-500"
                src={guide?.userImage}
                alt={guide?.userName}
              />
              <div className="absolute bottom-0 right-0 bg-blue-500 text-white p-1 rounded-full shadow-md">
                <i className="fas fa-check-circle"></i>
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white text-center mb-2">
              {guide?.userName}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 text-center mb-4">
              {guide?.role}
            </p>
            <div className="w-full px-3 py-2 bg-gray-50 rounded-lg shadow-inner mb-3">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                <strong>Experience:</strong> {guide?.experience}
              </p>
            </div>
            <table className="text-sm mb-4 w-full">
              <tbody>
                <tr>
                  <td className="pr-2 text-gray-600 dark:text-gray-400 font-semibold">
                    Address:
                  </td>
                  <td className="text-gray-700 dark:text-gray-300">
                    {guide?.address}
                  </td>
                </tr>
                <tr>
                  <td className="pr-2 text-gray-600 dark:text-gray-400 font-semibold">
                    Phone:
                  </td>
                  <td className="text-gray-700 dark:text-gray-300">
                    {guide?.phone}
                  </td>
                </tr>
                <tr>
                  <td className="pr-2 text-gray-600 dark:text-gray-400 font-semibold">
                    Email:
                  </td>
                  <td className="text-gray-700 dark:text-gray-300">
                    {guide?.userEmail}
                  </td>
                </tr>
              </tbody>
            </table>
            <Link
              to={`/guideDetails/${guide?._id}`}
              className=" btn mt-4 px-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-all ease-in-out duration-300 shadow-lg hover:scale-105"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllGuide;
