import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa"; // Importing the cross icon
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import useUsers from "../../../../Hooks/useUser";
import toast from "react-hot-toast";

const UpdateRoleModal = ({ user, onClose, requested }) => {
  const axiosSecure = useAxiosSecure();
  const { refetch } = useUsers();
  const [disable, setDisable] = useState(true);

  useEffect(() => {
    if (user?.requested) {
      setDisable(false);
    }
  }, [user?.requested]);

  const handleRoleClick = (role) => {
    const userInfo = { role, requested };
    axiosSecure.put(`/users/admin/${user._id}`, userInfo).then((res) => {
      if (res.data.modifiedCount) {
        refetch();
        if (role === "user") {
          toast.dismiss(`${user.userName}'s request is canceled`);
        } else {
          toast.success(`${user.userName} is now ${role}`);
        }
      }
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
        {/* Cross Icon to Close Modal */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          <FaTimes size={20} /> {/* Using FaTimes for cross icon */}
        </button>

        <h3 className="text-lg font-semibold mb-4">
          Update Role for {user.userName}
        </h3>
        {user?.requestedRole && (
          <p className="text-sm font-semibold mb-4">
            Request for: {user.requestedRole}
          </p>
        )}

        <div className="flex justify-center gap-4 mt-4">
          {user?.role !== "admin" && (
            <button
              onClick={() => handleRoleClick("admin", false)}
              className="bg-[#1D4ED8] text-white px-4 py-2 rounded-md hover:bg-[#1E40AF] transition"
            >
              Admin
            </button>
          )}
          {user?.role !== "guide" && (
            <button
              onClick={() => handleRoleClick("guide", false)}
              className="bg-[#14B8A6] text-white px-4 py-2 rounded-md hover:bg-[#0F766E] transition"
            >
              Guide
            </button>
          )}
          {user?.role !== "user" && (
            <button
              onClick={() => handleRoleClick("user", false)}
              className="bg-[#4F46E5] text-white px-4 py-2 rounded-md hover:bg-[#3730A3] transition"
            >
              User
            </button>
          )}
          {user?.requested && (
            <button
              onClick={() => handleRoleClick("user", false)}
              disabled={disable}
              className={`${
                disable
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-gray-500 hover:bg-gray-600"
              } text-white px-4 py-2 rounded-md transition`}
            >
              Cancel
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

UpdateRoleModal.propTypes = {
  user: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  requested: PropTypes.string.isRequired,
};

export default UpdateRoleModal;
