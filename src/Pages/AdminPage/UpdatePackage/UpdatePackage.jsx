import { useNavigate, useParams } from "react-router-dom";
import usePackages from "../../../Hooks/usePackages";
import useTourTypes from "../../../Hooks/useTourTypes";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import { Helmet } from "react-helmet";
import { IoMdRemoveCircleOutline } from "react-icons/io";

const CLOUDINARY_PRESET = import.meta.env.VITE_UPLOAD_PRESET;
const CLOUDINARY_CLOUD_NAME = `https://api.cloudinary.com/v1_1/${
  import.meta.env.VITE_CLOUD_NAME
}/image/upload`;

const UpdatePackage = () => {
  const { id } = useParams();
  const { packages } = usePackages();
  const thePackage = packages.find((pkg) => pkg?._id === id);
  const axiosSecure = useAxiosSecure();
  const { tourTypes } = useTourTypes();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm();

  const [selectedImages, setSelectedImages] = useState([]);
  const [activities, setActivities] = useState([{ day: 1, activity: "" }]);

  // Function to handle image changes
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const imagePreviews = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setSelectedImages((prev) => [...prev, ...imagePreviews]);
  };

  // Function to remove an image
  const removeImage = (index) => {
    setSelectedImages((prev) => prev.filter((_, i) => i !== index));
  };

  // Functions for managing activities
  const addActivityField = () => {
    setActivities((prev) => [...prev, { day: prev.length + 1, activity: "" }]);
  };

  const removeActivityField = (index) => {
    setActivities((prev) => prev.filter((_, i) => i !== index));
  };

  // Upload to Cloudinary
  const uploadToCloudinary = async (image) => {
    if (image.file) {
      const formData = new FormData();
      formData.append("file", image.file);
      formData.append("upload_preset", CLOUDINARY_PRESET);
      const response = await fetch(CLOUDINARY_CLOUD_NAME, {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      return data.secure_url;
    }
    return image.preview; // Use existing URL for server-loaded images
  };

  // Populate default values
  useEffect(() => {
    if (thePackage) {
      setValue("name", thePackage.tour_name);
      setValue("description", thePackage.description);
      setValue("type", thePackage.trip_type);
      setValue("price", thePackage.price);
      setValue("duration", thePackage.duration);

      // Set images
      const imagePreviews = thePackage.images.map((url) => ({
        file: null,
        preview: url,
      }));
      setSelectedImages(imagePreviews);

      // Set activities
      setActivities(
        thePackage.tour_plan.map((plan) => ({
          day: plan.day,
          activity: plan.activities,
        }))
      );
    }
  }, [thePackage, setValue]);

  // Handle form submission
  const onSubmit = async (data) => {
    try {
      if (selectedImages.length === 0) {
        toast.error("Please upload at least one image.");
        return;
      }

      const imageUrls = await Promise.all(
        selectedImages.map(uploadToCloudinary)
      );

      const tour_plan = activities
        .map((activity) => {
          if (!activity.activity) {
            toast.error("Fill the input or delete the activity");
            return null;
          }
          return {
            day: activity.day,
            activities: data[`activities${activity.day}`],
          };
        })
        .filter(Boolean);

      const packageInfo = {
        tour_name: data.name,
        description: data.description,
        trip_type: data.type,
        price: data.price,
        duration: data.duration,
        images: imageUrls,
        tour_plan,
      };

      const res = await axiosSecure.put(`/packages/${id}`, packageInfo);
      if (res.data.modifiedCount) {
        toast.success(`Updated successfully`);
        navigate("/dashboard/managePackages");
        reset();
        setSelectedImages([]);
      }
    } catch (error) {
      console.error("Error updating package:", error);
      toast.error("Failed to update package!");
    }
  };

  return (
    <div>
      <Helmet>
        <title>Update Package | Traveler Site</title>
      </Helmet>
      <SectionTitle
        heading="Update Package"
        subHeading="Edit your package details"
      />
      <form
        className="max-w-5xl mx-auto border-2 border-slate-400 p-2 md:p-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* Image Upload */}
        <div className="mb-6">
          <label
            htmlFor="images"
            className="block mb-2 text-xs md:text-sm font-medium text-gray-900 dark:text-white"
          >
            Upload Images
          </label>
          <input
            type="file"
            id="images"
            multiple
            onChange={handleImageChange}
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          />
          {/* Existing images */}
          <div className="flex flex-wrap gap-4 mt-4">
            {selectedImages.map((image, index) => (
              <div key={index} className="relative">
                <img
                  src={image.preview}
                  alt={`Preview ${index + 1}`}
                  className="w-24 h-24 object-cover rounded-md"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Tour Name */}
        <div className="mb-6">
          <label
            htmlFor="name"
            className="block mb-2 text-xs md:text-sm font-medium text-gray-900 dark:text-white"
          >
            Tour Name
          </label>
          <input
            type="text"
            id="name"
            {...register("name", { required: true })}
            className="bg-gray-50 border border-gray-300 text-gray-900 h-7 md:h-auto text-xs md:text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          {errors.name && (
            <span className="text-sm text-red-600 font-semibold">
              Tour name is required.
            </span>
          )}
        </div>

        {/* Trip Type */}
        <div className="mb-6">
          <label
            htmlFor="type"
            className="block mb-2 text-xs md:text-sm font-medium text-gray-900 dark:text-white"
          >
            Trip Type
          </label>
          <select
            id="type"
            {...register("type", { required: true })}
            defaultValue={thePackage?.trip_type}
            className="bg-gray-50 border border-gray-300 text-gray-900 h-7 md:h-auto text-xs md:text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="">Select Trip Type</option>
            {tourTypes.map((type) => (
              <option key={type._id} value={type.trip_type}>
                {type.trip_type}
              </option>
            ))}
          </select>
          {errors.type && (
            <span className="text-sm text-red-600 font-semibold">
              Trip type is required.
            </span>
          )}
        </div>

        {/* Price */}
        <div className="mb-6">
          <label
            htmlFor="price"
            className="block mb-2 text-xs md:text-sm font-medium text-gray-900 dark:text-white"
          >
            Price
          </label>
          <input
            type="number"
            id="price"
            {...register("price", { required: true })}
            className="bg-gray-50 border border-gray-300 text-gray-900 h-7 md:h-auto text-xs md:text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          {errors.price && (
            <span className="text-sm text-red-600 font-semibold">
              Price is required.
            </span>
          )}
        </div>

        {/* Duration */}
        <div className="mb-6">
          <label
            htmlFor="duration"
            className="block mb-2 text-xs md:text-sm font-medium text-gray-900 dark:text-white"
          >
            Duration
          </label>
          <input
            type="text"
            id="duration"
            {...register("duration", { required: true })}
            className="bg-gray-50 border border-gray-300 text-gray-900 h-7 md:h-auto text-xs md:text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          {errors.duration && (
            <span className="text-sm text-red-600 font-semibold">
              Duration is required.
            </span>
          )}
        </div>

        {/* Activities */}
        <div className="mb-6">
          <label
            htmlFor="activities"
            className="block mb-2 text-xs md:text-sm font-medium text-gray-900 dark:text-white"
          >
            Activities
          </label>
          {activities.map((activity, index) => (
            <div key={index} className="flex gap-2 mb-4">
              <input
                type="text"
                {...register(`activities${activity.day}`)}
                defaultValue={activity.activity}
                onChange={(e) =>
                  setActivities((prev) =>
                    prev.map((item, i) =>
                      i === index ? { ...item, activity: e.target.value } : item
                    )
                  )
                }
                className="bg-gray-50 border border-gray-300 text-gray-900 h-7 md:h-auto text-xs md:text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              <button
                type="button"
                onClick={() => removeActivityField(index)}
                className="bg-red-600 text-white p-2 rounded-md"
              >
                <span className="text-xl">
                  <IoMdRemoveCircleOutline />
                </span>
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addActivityField}
            className="text-blue-500 border-b border-blue-500"
          >
            +Add More Activities
          </button>
        </div>

        {/* Description */}
        <div className="mb-6">
          <label
            htmlFor="description"
            className="block mb-2 text-xs md:text-sm font-medium text-gray-900 dark:text-white"
          >
            Description
          </label>
          <CKEditor
            editor={ClassicEditor}
            data={thePackage?.description || ""}
            config={{
              toolbar: [
                "heading",
                "|",
                "bold",
                "italic",
                "underline",
                "link",
                "bulletedList",
                "numberedList",
                "|",
                "blockQuote",
                "undo",
                "redo",
              ],
            }}
            onChange={(event, editor) => {
              setValue("description", editor.getData());
            }}
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-center gap-4">
          <button
            type="submit"
            className="bg-blue-500 text-white rounded-md py-2 px-6"
          >
            Update Package
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdatePackage;
