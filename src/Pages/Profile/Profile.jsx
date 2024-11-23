import SectionTitle from "../../Components/SectionTitle/SectionTitle";
import useUsers from "../../Hooks/useUser";

const Profile = () => {
  const { theUser } = useUsers();

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
              src={theUser?.userImage || "/default-avatar.jpg"} // Add default avatar if no image
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
          <div className="flex justify-between">
            <span className="font-medium text-gray-700 text-lg">
              Joined On:
            </span>
            <span className="text-gray-500">{theUser?.createdAt || "N/A"}</span>
          </div>
        </div>

        {/* Optional: Add more user details like address, phone number, etc. */}
        <div className="mt-8 flex justify-end">
          <button className="bg-indigo-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-indigo-700 hover:shadow-xl transition-all duration-300 ease-in-out">
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
