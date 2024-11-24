import { useParams } from "react-router-dom";
import usePackages from "../../Hooks/usePackages";
import ImageSide from "./Shared/ImageSide";
import OtherInfo from "./Shared/OtherInfo";
import TopLayer from "../../Components/TopLayerOfPage/TopLayer";

const PackageDetails = () => {
  const { id } = useParams();
  const { packages } = usePackages();
  const thePackage = packages.find((pkg) => pkg?._id === id);

  // Handle loading state
  if (!thePackage) return <div>Loading...</div>;

  return (
    <div className="md:p-6 bg-gray-100 min-h-screen">
      {/* Action Links */}
      <TopLayer packageId={thePackage?._id}/>

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
