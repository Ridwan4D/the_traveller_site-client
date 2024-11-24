import { Link } from "react-router-dom";
import SectionTitle from "../../../../../Components/SectionTitle/SectionTitle";
import useTourTypes from "../../../../../Hooks/useTourTypes";

const HomeTourType = () => {
  const { tourTypes } = useTourTypes();

  return (
    <div className="container mx-auto py-16 px-4">
      <SectionTitle
        heading="Explore Our Tour Types"
        subHeading="Choose the perfect tour for your adventure"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-10">
        {tourTypes?.map((tourType, idx) => (
          <Link
            to={`/tripType/${tourType?.trip_type}`}
            key={idx}
            className="bg-white rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out"
          >
            <img
              src={tourType.image}
              alt={tourType.name}
              className="w-full h-48 object-cover rounded-t-lg"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {tourType.trip_type}
              </h3>
              <p className="text-gray-600">{tourType.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HomeTourType;
