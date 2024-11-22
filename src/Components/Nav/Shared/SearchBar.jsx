import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaBangladeshiTakaSign } from "react-icons/fa6";

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

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Filtered packages based on the search input
  const filteredPackages = packages.filter((pkg) => {
    const searchTerm = search.toLowerCase();
    return (
      pkg?.name?.toLowerCase().includes(searchTerm) ||
      pkg?.description?.toLowerCase().includes(searchTerm) ||
      pkg?.category?.toLowerCase().includes(searchTerm)
    );
  });

  return (
    <div className="relative w-full flex justify-center">
      {/* Search Input */}
      <form
        className="relative w-full max-w-lg"
        onChange={(e) => {
          setSearch(e.target.value.toLowerCase());
          setShowResults(true);
        }}
      >
        <input
          type="text"
          name="search"
          placeholder="Search for packages..."
          className="w-full float-end border border-teal-500 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 transition"
        /> 
      </form>

      {/* Conditionally Render Search Results */}
      {search && showResults && (
        <div
          ref={searchRef}
          className="absolute top-14 left-1/2 transform -translate-x-1/2 w-full max-w-2xl max-h-96 bg-white shadow-lg rounded-lg overflow-auto z-50"
        >
          <div className="grid grid-cols-2 gap-4 p-4">
            {filteredPackages.length > 0 ? (
              filteredPackages.map((pkg) => (
                <Link
                  to={`/packageDetails/${pkg.id}`} // Link to the package details page
                  key={pkg.id}
                  className="flex items-center bg-gray-100 p-3 rounded-md hover:bg-gray-200 transition"
                >
                  <img
                    src={pkg.image} // Assuming the API returns a valid image URL
                    alt={pkg.name}
                    className="w-16 h-16 object-cover rounded-md mr-3"
                  />
                  <div>
                    <h3 className="text-sm font-bold">{pkg.name}</h3>
                    <p className="text-teal-600 flex items-center">
                      <FaBangladeshiTakaSign className="mr-1" />
                      {pkg.price}
                    </p>
                    <p className="text-gray-500 text-sm">
                      {pkg.description.slice(0, 50)}...
                    </p>
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

export default SearchBar;
