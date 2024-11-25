import { useState } from "react";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import useUsers from "../../../Hooks/useUser";
import UpdateRoleModal from "./Shared/UpdateRoleModal";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import { useLoaderData } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const ManageUsers = () => {
  const { count } = useLoaderData();
  const { users } = useUsers();
  const axiosSecure = useAxiosSecure();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const itemPerPage = 3;
  const numberOfPages = Math.ceil(count / itemPerPage);
  const pages = [...Array(numberOfPages).keys()];
  const [currentPage, setCurrentPage] = useState(0);

  const { data: allUsers = [], refetch } = useQuery({
    queryKey: ["allUsers", currentPage],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/users?page=${currentPage}&size=${itemPerPage}`
      );
      return res.data;
    },
  });

  const handleUpdateClick = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  // Handle user deletion
  const handleDeleteUser = (id) => {
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
        axiosSecure.delete(`/users/${id}`).then((res) => {
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
    <div className="p-2 md:p-6 bg-gray-100 min-h-screen">
      <SectionTitle
        heading="Manage User"
        subHeading="Overview of all registered users"
      />
      <div className="font-cinzel font-bold mb-10 space-y-2 md:flex justify-between items-center">
        <h2 className="text-lg md:text-3xl">Total User: {users.length}</h2>
        <h2 className="text-lg md:text-3xl">
          In This Page User: {allUsers.length}
        </h2>
      </div>
      {/* Users Table */}
      <div className="overflow-x-auto mt-6">
        <table className="table-auto border border-gray-300 w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-800 text-white uppercase text-sm font-bold rounded-t-lg">
              <th className="py-3 px-4 text-left"></th>
              <th className="py-3 px-4 text-left">Image</th>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Email</th>
              <th className="py-3 px-4 text-left">Role</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {allUsers?.length > 0 ? (
              allUsers.map((user, index) => (
                <tr
                  key={index}
                  className="border-b last:border-none odd:bg-gray-50 even:bg-white text-gray-700 text-sm hover:bg-gray-100"
                >
                  <td className="py-3 px-4">{index + 1}</td>
                  <td className="py-3 px-4">
                    <img
                      src={user.userImage || "https://via.placeholder.com/50"}
                      alt={user.userName}
                      className="w-12 h-12 rounded-full object-cover shadow-md"
                    />
                  </td>
                  <td className="py-3 px-4">{user.userName}</td>
                  <td className="py-3 px-4">{user.userEmail}</td>
                  <td className="py-3 px-4">{user.role || "User"}</td>
                  <td
                    className={`py-3 px-4 uppercase ${
                      user?.requested ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {user?.requested ? "Requested" : "Not Requested"}
                  </td>
                  <td className="py-3 px-4 flex justify-center text-center">
                    <button
                      onClick={() => handleUpdateClick(user)}
                      className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition flex items-center justify-center gap-1"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDeleteUser(user?._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition flex items-center justify-center gap-1 ml-2"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center text-gray-500 py-4">
                  No users found.
                </td>
              </tr>
            )}
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

      {/* Modal */}
      {isModalOpen && selectedUser && (
        <UpdateRoleModal
          user={selectedUser}
          onClose={() => setIsModalOpen(false)}
          requested={""}
        />
      )}
    </div>
  );
};

export default ManageUsers;
