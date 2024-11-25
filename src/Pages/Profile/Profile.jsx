import { useState } from "react";
import SectionTitle from "../../Components/SectionTitle/SectionTitle";
import useUsers from "../../Hooks/useUser";
import UpdateUserModal from "./Shared/UpdateUserModal";
import AddStoryForm from "../../Components/AddStoryForm/AddStoryForm";
import UserStory from "../../Components/UserStory/UserStory";

const Profile = () => {
  const { theUser } = useUsers();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEditProfile = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-gray-100 p-8">
      {/* Section Title */}
      <SectionTitle
        heading="Your Profile"
        subHeading="Manage your personal information and stories"
      />

      {/* Profile Section */}
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out mb-12 border border-indigo-200">
        <h2 className="text-2xl font-bold text-indigo-700 mb-6">
          Profile Overview
        </h2>
        <div className="flex items-center space-x-6 mb-8">
          {/* Profile Image */}
          <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-indigo-600 shadow-lg">
            <img
              src={theUser?.userImage || "/default-avatar.jpg"}
              alt="User Avatar"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h2 className="text-3xl font-semibold text-indigo-700">
              {theUser?.userName || "N/A"}
            </h2>
            <p className="text-gray-500 text-lg">{theUser?.role || "N/A"}</p>
          </div>
        </div>

        {/* Personal Information */}
        <div className="bg-indigo-50 p-6 rounded-lg shadow-inner">
          <h3 className="text-xl font-semibold text-indigo-700 mb-4">
            Personal Details
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="font-medium text-gray-600">Email:</span>
              <span className="text-gray-800">
                {theUser?.userEmail || "N/A"}
              </span>
            </div>
            {theUser?.phone && (
              <div className="flex justify-between">
                <span className="font-medium text-gray-600">Phone:</span>
                <span className="text-gray-800">{theUser?.phone || "N/A"}</span>
              </div>
            )}
            {theUser?.education && (
              <div className="flex justify-between">
                <span className="font-medium text-gray-600">Education:</span>
                <span className="text-gray-800">
                  {theUser?.education || "N/A"}
                </span>
              </div>
            )}
            {theUser?.languages && (
              <div className="flex justify-between">
                <span className="font-medium text-gray-600">Languages:</span>
                <span className="text-gray-800">
                  {theUser?.languages || "N/A"}
                </span>
              </div>
            )}
            {theUser?.address && (
              <div className="flex justify-between">
                <span className="font-medium text-gray-600">Address:</span>
                <span className="text-gray-800">
                  {theUser?.address || "N/A"}
                </span>
              </div>
            )}
            {theUser?.experience && (
              <div className="flex justify-between">
                <span className="font-medium text-gray-600">Experience:</span>
                <span className="text-gray-800">
                  {theUser?.experience || "N/A"}
                </span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="font-medium text-gray-600">Joined On:</span>
              <span className="text-gray-800">
                {theUser?.createdAt || "N/A"}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <button
            onClick={handleEditProfile}
            className="bg-indigo-700 text-white px-6 py-3 rounded-lg shadow-md hover:bg-indigo-800 hover:shadow-xl transition-all duration-300 ease-in-out"
          >
            Edit Profile
          </button>
        </div>
      </div>

      {/* Add Story Section */}
      {theUser?.role === "user" && (
        <div className="mb-12">
          <SectionTitle
            heading="Add a New Story"
            subHeading="Share your unique travel experiences"
          />
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg border border-gray-200">
            <AddStoryForm />
          </div>
        </div>
      )}

      {/* User Stories Section */}
      {theUser?.role === "user" && (
        <div>
          <SectionTitle
            heading="Your Stories"
            subHeading="A collection of memories you've shared"
          />
          <div className="">
            <UserStory />
          </div>
        </div>
      )}

      {/* Update User Modal */}
      <UpdateUserModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        userInfo={theUser}
      />
    </div>
  );
};

export default Profile;
