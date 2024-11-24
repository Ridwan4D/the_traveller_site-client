import { FaRegHeart } from "react-icons/fa6";
import usePackages from "../../../../Hooks/usePackages";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const HomePackage = () => {
  const { packages } = usePackages();

  return (
    <div className="bg-gray-100">
      {/* Packages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:p-6 pb-0">
        {packages.slice(0, 3).map((pkg) => (
          <div
            key={pkg._id}
            className="border rounded-lg shadow-lg overflow-hidden relative group hover:scale-105 transition-transform duration-300 ease-in-out"
          >
            {/* Image with Wishlist Heart Icon */}
            <div className="relative">
              <img
                src={pkg.images[0]} // Display the first image
                alt={pkg.tour_name}
                className="w-full h-56 object-contain py-1 transition-transform duration-300 group-hover:scale-110"
              />
              <button
                className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md text-red-500 hover:bg-gray-100 transition-transform duration-300 hover:scale-110"
                title="Add to Wishlist"
                onClick={() => {
                  console.log(`Added ${pkg.tour_name} to wishlist`);
                }}
              >
                <FaRegHeart size={20} />
              </button>
            </div>

            {/* Card Content */}
            <div className="p-6 bg-gradient-to-b from-gray-50 via-white to-gray-100">
              <h3 className="text-xl font-bold text-gray-800 mb-2 truncate">
                {pkg.tour_name}
              </h3>
              <p className="text-sm text-gray-600 mb-2">
                <span className="font-bold text-gray-700">Type:</span>{" "}
                {pkg.trip_type}
              </p>
              <p className="text-sm text-gray-600 mb-4">
                <span className="font-bold text-gray-700">Price:</span> $
                {pkg.price}
              </p>

              {/* View Package Button */}
              <div className="flex gap-4">
                <Link
                  to={`/packageDetails/${pkg._id}`}
                  className="btn flex-1 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600 transition-all duration-300"
                >
                  View Package
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Centered Explore Package Button */}
      <div className="flex justify-center mt-8 pb-2">
        <Link
          to="#"
          className="py-3 px-6 bg-teal-500 text-white rounded shadow hover:bg-teal-600 transition-all duration-300"
          onClick={() => {
            toast.success("Explore all packages");
          }}
        >
          Explore Packages
        </Link>
      </div>
    </div>
  );
};

export default HomePackage;
