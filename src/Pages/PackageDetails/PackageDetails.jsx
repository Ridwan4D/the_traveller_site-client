import { Link, useParams, useNavigate } from "react-router-dom";
import usePackages from "../../Hooks/usePackages";
import ImageSide from "./Shared/ImageSide";
import OtherInfo from "./Shared/OtherInfo";
import useAdmin from "../../Hooks/useAdmin";

const PackageDetails = () => {
  const { id } = useParams();
  const { isAdmin } = useAdmin();
  const { packages } = usePackages();
  const navigate = useNavigate();
  const thePackage = packages.find((pkg) => pkg?._id === id);

  // Handle loading state
  if (!thePackage) return <div>Loading...</div>;

  // Go back function
  const goBack = () => navigate(-1);

  return (
    <div className="md:p-6 bg-gray-100 min-h-screen">
      {/* Action Links */}
      <div className="flex justify-between items-center mb-6">
        {isAdmin && (
          <Link
            to={`/updatePackage/${thePackage._id}`}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition"
          >
            Update Package
          </Link>
        )}
        <button
          onClick={goBack}
          className="bg-gray-500 text-white px-4 py-2 rounded-lg shadow hover:bg-gray-600 transition"
        >
          Go Back
        </button>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Image Section */}
        <div className="flex justify-center items-center">
          <ImageSide
            images={thePackage.images}
            packDetails={thePackage?.description}
          />
        </div>

        {/* Package Information Section */}
        <div className="bg-white md:p-6 rounded-lg shadow-lg">
          <OtherInfo pack={thePackage} />
        </div>
      </div>
    </div>
  );
};

export default PackageDetails;
