import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import toast from "react-hot-toast";
import useUsers from "../../../Hooks/useUser";
import { useState } from "react";
import axios from "axios";

const UpdateUserModal = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  const { theUser, refetch } = useUsers();
  const axiosSecure = useAxiosSecure();

  const [imageUrl, setImageUrl] = useState(theUser?.userImage || "");
  const [isUploading, setIsUploading] = useState(false);

  // Initialize React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Handle image upload to Cloudinary using axios
  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", import.meta.env.VITE_UPLOAD_PRESET);

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${
          import.meta.env.VITE_CLOUD_NAME
        }/image/upload`,
        formData
      );
      setImageUrl(response.data.secure_url);
      setIsUploading(false);
    } catch (error) {
      console.error("Image upload failed:", error);
      setIsUploading(false);
      toast.error("Image upload failed");
    }
  };

  // Handle form submission
  const onSubmit = (data) => {
    console.log(data.userName);
    if (!user) {
      toast.error("User is not authenticated.");
      return;
    }

    const userInfo = {
      userName: data.userName,
      phone: data.phone,
      education: data.education,
      experience: data.experience,
      languages: data.languages,
      address: data.address,
      image: imageUrl || user?.photoURL,
    };

    axiosSecure
      .put(`/user/${user.email}`, userInfo)
      .then((res) => {
        if (res.data.modifiedCount) {
          toast.success("Profile updated successfully");
          onClose();
          refetch();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl w-full">
        <h3 className="text-2xl font-semibold text-indigo-600 mb-4">
          Update Profile
        </h3>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6"
        >
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              defaultValue={theUser?.userName || ""}
              {...register("userName")}
              className="w-full p-3 border border-gray-300 rounded-md mt-1"
            />
            {errors.userName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.userName.message}
              </p>
            )}
          </div>

          {/* Image Upload */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700">
              Profile Image
            </label>
            <input
              type="file"
              onChange={handleImageUpload}
              className="w-full p-3 border border-gray-300 rounded-md mt-1"
            />
            {isUploading && (
              <p className="text-gray-500 text-sm mt-1">Uploading...</p>
            )}
            {imageUrl && <p className="text-xs">Image available</p>}
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700">Phone</label>
            <input
              type="text"
              defaultValue={theUser?.phone || ""}
              {...register("phone")}
              className="w-full p-3 border border-gray-300 rounded-md mt-1"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700">
              Education
            </label>
            <input
              defaultValue={theUser?.education || ""}
              type="text"
              {...register("education")}
              className="w-full p-3 border border-gray-300 rounded-md mt-1"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700">
              Experience
            </label>
            <input
              defaultValue={theUser?.experience || ""}
              type="text"
              {...register("experience")}
              className="w-full p-3 border border-gray-300 rounded-md mt-1"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700">
              Languages
            </label>
            <input
              type="text"
              defaultValue={theUser?.languages || ""}
              {...register("languages")}
              className="w-full p-3 border border-gray-300 rounded-md mt-1"
            />
          </div>

          <div className="flex flex-col col-span-2">
            <label className="text-sm font-medium text-gray-700">Address</label>
            <input
              type="text"
              defaultValue={theUser?.address || ""}
              {...register("address")}
              className="w-full p-3 border border-gray-300 rounded-md mt-1"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4 mt-6 sm:col-span-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

UpdateUserModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default UpdateUserModal;
