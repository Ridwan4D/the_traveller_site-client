import toast from "react-hot-toast";
import useUsers from "../../../Hooks/useUser";
import UpdateUserModal from "../../Profile/Shared/UpdateUserModal";
import { useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const RequestToAdmin = () => {
  const axiosSecure = useAxiosSecure();
  const { theUser } = useUsers();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEditProfile = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Function to check if user information is complete
  const isUserInfoComplete = () => {
    return (
      theUser?.userName &&
      theUser?.userEmail &&
      theUser?.phone &&
      theUser?.address &&
      theUser?.education &&
      theUser?.experience &&
      theUser?.languages
    );
  };

  const handleRequest = (role) => {
    if (!isUserInfoComplete()) {
      toast.error("First fill all the info");
      return;
    }
    const requestInfo = {
      requested: true,
      requestedRole: role,
    };
    axiosSecure
      .patch(`/user/${theUser?.userEmail}`, requestInfo)
      .then((res) => {
        if (res.data.modifiedCount) {
          toast.success("Request successfully sended");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="p-8 bg-gray-50 dark:bg-gray-900">
      {/* Section Title */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-semibold text-blue-600 dark:text-blue-400">
          Request Access
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 mt-2">
          Please choose the type of request you want to make.
        </p>
      </div>

      {/* Request Options */}
      <div className="flex justify-center gap-8 mb-6">
        {/* Request for Admin Button */}
        <button
          className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-700 dark:hover:bg-blue-800 dark:focus:ring-blue-900"
          onClick={() => handleRequest("admin")}
        >
          Request for Admin
        </button>

        {/* Request for Guide Button */}
        <button
          className="px-8 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-lg hover:bg-green-700 transition duration-300 focus:outline-none focus:ring-4 focus:ring-green-300 dark:bg-green-700 dark:hover:bg-green-800 dark:focus:ring-green-900"
          onClick={() => handleRequest("guide")}
        >
          Request for Guide
        </button>
      </div>

      {/* Optionally, show user info */}
      {theUser && (
        <div className="mt-8 bg-gray-100 dark:bg-gray-700 p-6 rounded-lg shadow-md">
          <h3 className="text-xl text-gray-900 dark:text-gray-100">
            User Information
          </h3>
          <div className="space-y-4">
            <p className="text-gray-700 dark:text-gray-300">
              <strong>Name:</strong> {theUser?.userName || "N/A"}
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              <strong>Email:</strong> {theUser?.userEmail || "N/A"}
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              <strong>Role:</strong> {theUser?.role || "N/A"}
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              <strong>Phone:</strong> {theUser?.phone || "N/A"}
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              <strong>Address:</strong> {theUser?.address || "N/A"}
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              <strong>Education:</strong> {theUser?.education || "N/A"}
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              <strong>Experience:</strong> {theUser?.experience || "N/A"}
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              <strong>Languages:</strong> {theUser?.languages || "N/A"}
            </p>
            {theUser?.requestedRole && (
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Requested Role:</strong>{" "}
                {theUser?.requestedRole || "N/A"}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Add Info Button */}
      <div className="text-center mt-6">
        <button
          onClick={handleEditProfile}
          className="bg-indigo-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-indigo-700 hover:shadow-xl transition-all duration-300 ease-in-out"
        >
          Add/Update Info
        </button>
      </div>

      {/* UpdateUserModal Component */}
      <UpdateUserModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        userInfo={theUser}
      />
    </div>
  );
};

export default RequestToAdmin;
