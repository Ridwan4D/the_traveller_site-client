import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa"; // Importing the cross icon

const UpdateRoleModal = ({ user, onClose, requested }) => {
  const [disable, setDisable] = useState(true);

  // Use effect to enable/disable the Cancel button based on the requested prop
  useEffect(() => {
    if (requested) {
      setDisable(false);
    }
  }, [requested]);

  const handleRoleClick = (role) => {
    console.log(`Role for ${user.userName} is changed to ${role}`);
    onClose(); // Close the modal after role change
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
        <div className="flex justify-between">
          <button
            onClick={() => handleRoleClick("Admin")}
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
          >
            Admin
          </button>
          <button
            onClick={() => handleRoleClick("Guide")}
            className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition"
          >
            Guide
          </button>
          <button
            onClick={onClose}
            disabled={disable}
            className={`${
              disable ? "bg-gray-500 cursor-not-allowed" : "bg-gray-500 hover:bg-gray-600"
            } text-white px-4 py-2 rounded-md transition`}
            style={{
              cursor: disable ? "not-allowed" : "pointer",
            }}
          >
            Cancel
          </button>
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
