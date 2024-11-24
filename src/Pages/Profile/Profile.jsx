import { useState } from "react";
import SectionTitle from "../../Components/SectionTitle/SectionTitle";
import useUsers from "../../Hooks/useUser";
import UpdateUserModal from "./Shared/UpdateUserModal";
import AddStoryForm from "../../Components/AddStoryForm/AddStoryForm";

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
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Section Title */}
      <SectionTitle heading="User Profile" subHeading="See Your info" />

      {/* Profile Card */}
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
        <div className="flex items-center space-x-6 mb-8">
          {/* Profile Image */}
          <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-indigo-600">
            <img
              src={theUser?.userImage || "/default-avatar.jpg"}
              alt="User Avatar"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h2 className="text-3xl font-semibold text-indigo-600">
              {theUser?.userName || "N/A"}
            </h2>
            <p className="text-gray-500 text-lg">{theUser?.role || "N/A"}</p>
          </div>
        </div>

        {/* Personal Information */}
        <h3 className="text-2xl font-semibold text-indigo-600 mb-6">
          Personal Information
        </h3>
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="font-medium text-gray-700 text-lg">Email:</span>
            <span className="text-gray-500">{theUser?.userEmail || "N/A"}</span>
          </div>
          {theUser?.phone && (
            <div className="flex justify-between">
              <span className="font-medium text-gray-700 text-lg">Phone:</span>
              <span className="text-gray-500">{theUser?.phone || "N/A"}</span>
            </div>
          )}
          {theUser?.education && (
            <div className="flex justify-between">
              <span className="font-medium text-gray-700 text-lg">
                Education:
              </span>
              <span className="text-gray-500">
                {theUser?.education || "N/A"}
              </span>
            </div>
          )}
          {theUser?.languages && (
            <div className="flex justify-between">
              <span className="font-medium text-gray-700 text-lg">
                Languages:
              </span>
              <span className="text-gray-500">
                {theUser?.languages || "N/A"}
              </span>
            </div>
          )}
          {theUser?.address && (
            <div className="flex justify-between">
              <span className="font-medium text-gray-700 text-lg">
                Address:
              </span>
              <span className="text-gray-500">{theUser?.address || "N/A"}</span>
            </div>
          )}
          {theUser?.experience && (
            <div className="flex justify-between">
              <span className="font-medium text-gray-700 text-lg">
                Experience:
              </span>
              <span className="text-gray-500">
                {theUser?.experience || "N/A"}
              </span>
            </div>
          )}
          <div className="flex justify-between">
            <span className="font-medium text-gray-700 text-lg">
              Joined On:
            </span>
            <span className="text-gray-500">{theUser?.createdAt || "N/A"}</span>
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <button
            onClick={handleEditProfile}
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-indigo-700 hover:shadow-xl transition-all duration-300 ease-in-out"
          >
            Edit Profile
          </button>
        </div>
      </div>

      {/* story section for tourist */}
      {theUser?.role === "user" && <AddStoryForm />}

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
