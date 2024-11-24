import HomePackageCard from "../../../../Components/HomePackageCard/HomePackageCard";
import usePackages from "../../../../Hooks/usePackages";
import { Link } from "react-router-dom";
const HomePackage = () => {
  const { packages } = usePackages();

  return (
    <div className="bg-gray-100">
      {/* Packages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:p-6 pb-0">
        {packages.slice(0, 3).map((pkg, idx) => (
          <HomePackageCard key={idx} pkg={pkg} />
        ))}
      </div>

      {/* Centered Explore Package Button */}
      <div className="flex justify-center mt-8 pb-2">
        <Link
          to="/allPackages"
          className="py-3 px-6 bg-teal-500 text-white rounded shadow hover:bg-teal-600 transition-all duration-300"
        >
          Explore Packages
        </Link>
      </div>
    </div>
  );
};

export default HomePackage;
