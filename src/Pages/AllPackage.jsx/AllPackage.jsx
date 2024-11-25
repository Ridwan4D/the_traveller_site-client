import { useState } from "react";
import PackageCard from "../../Components/PackageCard/PackageCard";
import SectionTitle from "../../Components/SectionTitle/SectionTitle";
import usePackages from "../../Hooks/usePackages";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";

const AllPackage = () => {
  const axiosSecure = useAxiosSecure();
  const { packages } = usePackages();
  const count = packages.length;
  console.log(count);
  const itemPerPage = 12;
  const numberOfPages = Math.ceil(count / itemPerPage);
  const pages = [...Array(numberOfPages).keys()];
  const [currentPage, setCurrentPage] = useState(0);

  const { data: allPackages = [], refetch } = useQuery({
    queryKey: ["allUsers", currentPage],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/packages?page=${currentPage}&size=${itemPerPage}`
      );
      return res.data;
    },
  });

  // Go to the previous page
  const goToPreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
      refetch();
    }
  };

  // Go to the next page
  const goToNextPage = () => {
    if (currentPage < numberOfPages - 1) {
      setCurrentPage((prev) => prev + 1);
      refetch();
    }
  };

  // Handle page change by clicking on a page number
  const handlePageClick = (pageIndex) => {
    setCurrentPage(pageIndex);
    refetch(); // Re-fetch data for the selected page
  };

  return (
    <div className="p-8 bg-gray-50 dark:bg-gray-900">
      {/* Section Title */}
      <SectionTitle
        heading="Explore Our Packages"
        subHeading="Discover unique destinations and create unforgettable memories!"
      />

      {/* Packages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-8">
        {allPackages?.map((pkg, idx) => (
          <PackageCard key={idx} pkg={pkg} />
        ))}
      </div>
      {/* Pagination Controls */}
      {packages.length > 12 && (
        <div className="max-w-5xl mx-auto my-7 text-center flex items-center justify-center gap-2">
          {/* Previous Button */}
          <button
            className={`flex items-center justify-center bg-blue-500 text-white text-sm px-5 py-2 rounded-md shadow-sm hover:bg-teal-500 hover:text-white transition-all duration-300 ease-in-out disabled:bg-gray-400 disabled:text-gray-500 disabled:cursor-not-allowed`}
            onClick={goToPreviousPage}
            disabled={currentPage === 0}
          >
            <GoArrowLeft />
          </button>

          {/* Pagination Buttons */}
          {pages.length > 0 &&
            pages.map((page) => (
              <button
                key={page}
                className={`flex items-center justify-center bg-teal-500 text-white text-sm px-5 py-2 rounded-md transition-all duration-300 ease-in-out hover:bg-teal-500 hover:text-white disabled:bg-gray-400 disabled:text-gray-500 disabled:cursor-not-allowed ${
                  currentPage === page ? "bg-teal-500 text-white" : ""
                }`}
                onClick={() => handlePageClick(page)}
                disabled={currentPage === page}
              >
                {page + 1}
              </button>
            ))}

          {/* Next Button */}
          <button
            className={`flex items-center justify-center bg-blue-500 text-white text-sm px-5 py-2 rounded-md shadow-sm hover:bg-teal-500 hover:text-white transition-all duration-300 ease-in-out disabled:bg-gray-400 disabled:text-gray-500 disabled:cursor-not-allowed`}
            onClick={goToNextPage}
            disabled={currentPage === numberOfPages - 1}
          >
            <GoArrowRight />
          </button>
        </div>
      )}
    </div>
  );
};

export default AllPackage;
