import { useState } from "react";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import useUsers from "../../../Hooks/useUser";
import UpdateRoleModal from "./Shared/UpdateRoleModal";

const ManageUsers = () => {
  const { users } = useUsers();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleUpdateClick = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  return (
    <div className="p-2 md:p-6 bg-gray-100 min-h-screen">
      <SectionTitle
        heading="Manage User"
        subHeading="Overview of all registered users"
      />

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
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users?.length > 0 ? (
              users.map((user, index) => (
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
                  <td className="py-3 px-4 flex justify-center text-center">
                    <button
                      onClick={() => handleUpdateClick(user)}
                      className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition flex items-center justify-center gap-1"
                    >
                      Update
                    </button>
                    <button className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition flex items-center justify-center gap-1 ml-2">
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
