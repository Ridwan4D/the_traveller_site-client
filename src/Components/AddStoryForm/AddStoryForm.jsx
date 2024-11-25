import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import PropTypes from "prop-types";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useTourTypes from "../../Hooks/useTourTypes";
import useGuides from "../../Hooks/useGuides";

const cloudinary_upload_preset = import.meta.env.VITE_UPLOAD_PRESET;
const cloudinaryAPI = `https://api.cloudinary.com/v1_1/${
  import.meta.env.VITE_CLOUD_NAME
}/image/upload`;

const AddStoryForm = ({ refetch }) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { guides } = useGuides();
  const { tourTypes } = useTourTypes();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const imageFile = data.image[0];
    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("upload_preset", cloudinary_upload_preset);

    try {
      // Upload image to Cloudinary using fetch
      const res = await fetch(cloudinaryAPI, {
        method: "POST",
        body: formData,
      });

      // Check if the response is successful
      if (!res.ok) {
        throw new Error("Image upload failed. Cloudinary returned an error.");
      }

      // Try parsing the response as JSON
      const cloudinaryData = await res.json();

      // Check if Cloudinary returned a secure_url in the response
      if (!cloudinaryData.secure_url) {
        throw new Error("Cloudinary did not return a valid image URL.");
      }

      const imageUrl = cloudinaryData.secure_url; // Get the secure URL of the uploaded image

      // Create the story object with the image URL and form data
      const storyInfo = {
        email: user.email,
        name: user.displayName,
        description: data.description,
        tourName: data.tour_name,
        tourType: data.tour_type,
        guideName: data.guide_name,
        tourDate: data.date,
        placeImage: imageUrl, // Use the Cloudinary image URL
      };

      // Save story info to the database
      const response = await axiosSecure.post("/stories", storyInfo);

      if (response.data.insertedId) {
        reset();
        toast.success("Story Added To Profile");
        refetch();
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Image upload failed. Please try again.");
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <form onSubmit={handleSubmit(onSubmit)} className="border-4 p-5 my-10">
        <div className="grid gap-6 mb-6 md:grid-cols-2">
          <div>
            <label
              htmlFor="tour_name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Tour Name
            </label>
            <input
              type="text"
              id="tour_name"
              {...register("tour_name", { required: true })}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
            {errors.tour_name && (
              <span className="text-sm text-red-600 font-semibold">
                Fill This Field
              </span>
            )}
          </div>

          {/* Guide Name Selection */}
          <div>
            <label
              htmlFor="guide_name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Guide Name
            </label>
            <select
              id="guide_name"
              {...register("guide_name", { required: true })}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            >
              <option value="">Select a Guide</option>
              {guides?.map((guide, idx) => (
                <option key={idx} value={guide?.userName}>
                  {guide?.userName}
                </option>
              ))}
            </select>
            {errors.guide_name && (
              <span className="text-sm text-red-600 font-semibold">
                Select a Guide
              </span>
            )}
          </div>

          {/* Tour Type Selection */}
          <div>
            <label
              htmlFor="tour_type"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Tour Type
            </label>
            <select
              id="tour_type"
              {...register("tour_type", { required: true })}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            >
              <option value="">Select a Tour Type</option>
              {tourTypes?.map((type, idx) => (
                <option key={idx} value={type?.trip_type}>
                  {type?.trip_type}
                </option>
              ))}
            </select>
            {errors.tour_type && (
              <span className="text-sm text-red-600 font-semibold">
                Select a Tour Type
              </span>
            )}
          </div>

          <div>
            <label
              htmlFor="date"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Date of Your Tour
            </label>
            <input
              type="date"
              id="date"
              {...register("date", { required: true })}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
            {errors.date && (
              <span className="text-sm text-red-600 font-semibold">
                Fill This Field
              </span>
            )}
          </div>
        </div>

        <div>
          <label
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            htmlFor="file_input"
          >
            Add a Picture
          </label>
          <input
            type="file"
            {...register("image", { required: true })}
            id="file_input"
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400"
          />
          {errors.image && (
            <span className="text-sm text-red-600 font-semibold">
              Image is required
            </span>
          )}
        </div>

        <div className="mb-5">
          <label
            htmlFor="description"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Tour Description
          </label>
          <textarea
            id="description"
            {...register("description", { required: true })}
            className="bg-gray-50 border w-full border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
          />
          {errors.description && (
            <span className="text-sm text-red-600 font-semibold">
              Fill This Field
            </span>
          )}
        </div>

        <input
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        />
      </form>
    </div>
  );
};

AddStoryForm.propTypes = {
  refetch: PropTypes.func.isRequired,
};

export default AddStoryForm;
