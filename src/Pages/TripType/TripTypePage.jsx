import { useParams } from "react-router-dom";
import usePackages from "../../Hooks/usePackages";
import PackageCard from "../../Components/PackageCard/PackageCard"; // Import your PackageCard component
import SectionTitle from "../../Components/SectionTitle/SectionTitle";

const TripTypePage = () => {
  const { type } = useParams();
  const { packages } = usePackages();

  // Filter the packages based on the trip_type
  const selectedPackages = packages.filter((pkg) => pkg?.trip_type === type);
  console.log(selectedPackages);

  return (
    <div className="container mx-auto py-16 px-4">
      {/* Add dynamic section title */}
      <SectionTitle
        heading={`Explore Packages for ${type} Tour`}
        subHeading="Browse our collection of exciting packages"
      />

      {selectedPackages.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {selectedPackages.map((pkg, idx) => (
            <PackageCard key={idx} pkg={pkg} />
          ))}
        </div>
      ) : (
        <p className="text-center text-xl text-gray-600">
          No packages available for this tour type.
        </p>
      )}
    </div>
  );
};

export default TripTypePage;
