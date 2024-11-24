import PackageCard from "../../Components/PackageCard/PackageCard";
import SectionTitle from "../../Components/SectionTitle/SectionTitle";
import usePackages from "../../Hooks/usePackages";

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
        {packages?.map((pkg, idx) => (
          <PackageCard key={idx} pkg={pkg} />
        ))}
      </div>
    </div>
  );
};

export default AllPackage;
