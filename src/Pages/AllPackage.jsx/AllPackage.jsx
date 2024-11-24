import SectionTitle from "../../Components/SectionTitle/SectionTitle";
import usePackages from "../../Hooks/usePackages";
import { Link } from "react-router-dom";

const AllPackage = () => {
  const { packages } = usePackages();

  return (
    <div className="p-8 bg-gray-50 dark:bg-gray-900">
      {/* Section Title */}
      <SectionTitle
        heading="Explore Our Packages"
        subHeading="Discover unique destinations and create unforgettable memories!"
      />

      {/* Packages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-8">
        {packages?.map((pkg) => (
          <div
            key={pkg._id}
            className="relative group overflow-hidden bg-white rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 dark:bg-gray-800"
          >
            {/* Image with Wishlist */}
            <div className="relative">
              <img
                className="w-full h-48 object-cover rounded-t-lg"
                src={pkg?.images?.[0]}
                alt={pkg?.tour_name}
              />
              <button
                className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-lg hover:bg-red-100 transition duration-300"
                onClick={() => alert(`Added ${pkg?.tour_name} to wishlist!`)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="w-6 h-6 text-red-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 21l-1.45-1.342C5.4 15.364 2 12.273 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09A6.488 6.488 0 0116.5 3C19.58 3 22 5.42 22 8.5c0 3.773-3.4 6.864-8.55 11.158L12 21z"
                  />
                </svg>
              </button>
            </div>

            {/* Package Details */}
            <div className="p-5">
              <h5 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-blue-600 transition duration-300">
                {pkg?.tour_name}
              </h5>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                Tour Type:{" "}
                <span className="font-medium uppercase">{pkg?.trip_type}</span>
              </p>
              <p className="text-lg font-semibold text-gray-800 dark:text-gray-300 mt-3">
                Price: ${pkg?.price}
              </p>
              <Link
                to={`/packageDetails/${pkg._id}`}
                className="mt-4 inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 dark:bg-blue-700 dark:hover:bg-blue-800 dark:focus:ring-blue-900 transition duration-300"
              >
                View Package
                <svg
                  className="w-4 h-4 ml-2"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllPackage;
