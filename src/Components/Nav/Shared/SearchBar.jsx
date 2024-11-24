import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import PropType from "prop-types";

const SearchBar = ({ packages }) => {
  const [search, setSearch] = useState("");
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef(null);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };

    document.addEventListener("mouseup", handleClickOutside);

    return () => {
      document.removeEventListener("mouseup", handleClickOutside);
    };
  }, []);

  // Filtered packages based on the search input
  const filteredPackages = packages.filter((pkg) => {
    const searchTerm = search.toLowerCase();
    return (
      pkg?.name?.toLowerCase().includes(searchTerm) ||
      pkg?.category?.toLowerCase().includes(searchTerm)
    );
  });

  return (
    <div className="relative w-full flex justify-center">
      {/* Search Input */}
      <form
        className="relative w-full"
        onChange={(e) => {
          setSearch(e.target.value.toLowerCase());
          setShowResults(true);
        }}
      >
        <input
          type="text"
          name="search"
          placeholder="Search package by name & type"
          className="w-full md:w-2/3 float-end border border-teal-500 px-2 md:px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 transition"
        />
      </form>

      {/* Conditionally Render Search Results */}
      {search && showResults && (
        <div
          ref={searchRef}
          className="absolute top-14 left-1/2 transform -translate-x-1/2 w-full h-auto bg-white shadow-lg rounded-lg overflow-auto z-50"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-2">
            {filteredPackages.length > 0 ? (
              filteredPackages.map((pkg) => (
                <Link
                  to={`/packageDetails/${pkg.id}`} // Link to the package details page
                  key={pkg.id}
                  className="flex flex-col md:flex-row items-center bg-gray-100 p-1 rounded-md hover:bg-gray-200 transition"
                >
                  <img
                    src={pkg.images[0]} // Assuming the API returns a valid image URL
                    alt={pkg.name}
                    className="w-16 h-16 object-cover rounded-md mb-3 md:mb-0 md:mr-3"
                  />
                  <div className="text-center md:text-left">
                    <h3 className="text-sm font-semibold text-gray-800">
                      {pkg.tour_name}
                    </h3>
                    <p className="text-teal-600 flex justify-center md:justify-start items-center">
                      <FaBangladeshiTakaSign className="mr-1" />
                      {pkg.price}
                    </p>
                    <p className="text-gray-500 text-sm">{pkg.category}</p>
                  </div>
                </Link>
              ))
            ) : (
              <p className="text-center text-gray-600 col-span-2">
                No packages match your search.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
SearchBar.propTypes = {
  packages: PropType.array,
};
export default SearchBar;
