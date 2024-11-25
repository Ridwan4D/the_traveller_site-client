import { Link, useParams } from "react-router-dom";
import usePackages from "../../Hooks/usePackages";
import ImageSide from "./Shared/ImageSide";
import OtherInfo from "./Shared/OtherInfo";
import TopLayer from "../../Components/TopLayerOfPage/TopLayer";
import TourBookingForm from "./Shared/TourBookingForm";
import useUsers from "../../Hooks/useUser";
import useGuides from "../../Hooks/useGuides";
import GuideCard from "../../Components/GuideCard/GuideCard";

const PackageDetails = () => {
  const { id } = useParams();
  const { packages } = usePackages();
  const { theUser } = useUsers();
  const { guides } = useGuides();
  const thePackage = packages.find((pkg) => pkg?._id === id);

  if (!thePackage) return <div>Loading...</div>;

  return (
    <div className="md:p-6 bg-gray-50 min-h-screen">
      {/* Top Section */}
      <TopLayer packageId={thePackage?._id} />

      {/* Main Content */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mt-6">
        {/* Image Section */}
        <div className="flex justify-center items-center">
          <ImageSide
            images={thePackage.images}
            packDetails={thePackage?.description}
          />
        </div>

        {/* Package Information Section */}
        <div className="bg-white md:p-6 p-4 rounded-lg shadow-lg">
          <OtherInfo pack={thePackage} />
        </div>
      </div>

      <hr className="border-t border-dashed border-gray-300 my-8" />

      {/* Guides Section */}
      {guides.length > 0 && (
        <div className="mt-12 bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Meet Our Guides
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {guides.slice(0, 3).map((guide, idx) => (
              <GuideCard key={idx} guide={guide} />
            ))}
          </div>
          {/* Show All Guides Button */}
          {guides.length > 3 && (
            <div className="text-center mt-6">
              <Link
                to="/allGuides"
                className="btn bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
              >
                All Guides
              </Link>
            </div>
          )}
        </div>
      )}

      <hr className="border-t border-dashed border-gray-300 my-8" />

      {/* Booking Form Section */}
      {theUser?.role === "user" && (
        <div className="bg-white p-6 rounded-lg shadow-lg mt-8">
          <TourBookingForm
            tourName={thePackage?.tour_name}
            tourPrice={parseInt(thePackage?.price)}
            packageId={thePackage?._id}
          />
        </div>
      )}
    </div>
  );
};

export default PackageDetails;
