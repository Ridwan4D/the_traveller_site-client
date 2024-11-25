import { Helmet } from "react-helmet";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import usePackages from "../../../Hooks/usePackages";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
const ManagePackages = () => {
  const axiosSecure = useAxiosSecure();
  const { packages } = usePackages();
  const count = packages.length;
  console.log(count);
  const itemPerPage = 3;
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

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/packages/${id}`).then((res) => {
          if (res.data.deletedCount) {
            Swal.fire("Deleted!", "Your file has been deleted.", "success");
            refetch();
          }
        });
      }
    });
  };

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
    <div className="container mx-auto p-2 md:p-6">
      <Helmet>
        <title>Manage Package | Traveler Site</title>
      </Helmet>
      <SectionTitle
        heading="Manage Packages"
        subHeading="View, edit, or delete packages"
      />
      <div className="font-cinzel font-bold mb-10 space-y-2 md:flex justify-between items-center">
        <h2 className="text-lg md:text-3xl">
          Total Packages: {packages.length}
        </h2>
        <h2 className="text-lg md:text-3xl">
          In This Page Package: {allPackages.length}
        </h2>
      </div>
      {/* Table for displaying packages */}
      <div className="overflow-x-auto bg-white shadow-lg rounded-lg mt-6">
        <table className="min-w-full text-sm text-left text-gray-500">
          <thead className="text-xs uppercase bg-indigo-500 text-white">
            <tr>
              <th scope="col" className="px-6 py-3 border"></th>
              <th scope="col" className="px-6 py-3 border">
                Image
              </th>
              <th scope="col" className="px-6 py-3 border">
                Tour Name
              </th>
              <th scope="col" className="px-6 py-3 border">
                Price
              </th>
              <th scope="col" className="px-6 py-3 border">
                Duration
              </th>
              <th scope="col" className="px-6 py-3 border">
                Tour Type
              </th>
              <th scope="col" className="px-6 py-3 border text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {allPackages.map((pkg, index) => (
              <tr
                key={pkg._id}
                className="border-b hover:bg-gray-100 transition-colors duration-200"
              >
                <td className="px-6 py-4 border">{index + 1}</td>
                <td className="px-6 py-4 border">
                  {pkg.images && pkg.images[0] ? (
                    <img
                      src={pkg.images[0]}
                      alt={pkg.tour_name}
                      className="w-10 h-10 object-cover rounded-md"
                    />
                  ) : (
                    <span>No Image</span>
                  )}
                </td>
                <td className="px-6 py-4 font-medium text-gray-800 border">
                  <span className="block w-32">{pkg.tour_name}</span>
                </td>
                <td className="px-6 py-4 border">${pkg.price}</td>
                <td className="px-6 py-4 border">{pkg.duration} Days</td>
                <td className="px-6 py-4 border uppercase">{pkg.trip_type}</td>
                <td className="px-6 py-4 border border-b-0 flex space-x-3 justify-center">
                  <Link
                    to={`/packageDetails/${pkg._id}`}
                    className="bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-600 transition"
                  >
                    Details
                  </Link>
                  <Link
                    to={`/dashboard/updatePackage/${pkg._id}`}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
                  >
                    Update
                  </Link>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
                    onClick={() => handleDelete(pkg._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination Controls */}
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
    </div>
  );
};

export default ManagePackages;
