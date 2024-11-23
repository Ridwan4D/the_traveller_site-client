import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { IoMdRemoveCircleOutline } from "react-icons/io";
import { MdAddCard } from "react-icons/md";
import AddTourTypeModal from "./Shared/AddTourTypeModal";
import useTourTypes from "../../../Hooks/useTourTypes";

const CLOUDINARY_PRESET = import.meta.env.VITE_UPLOAD_PRESET;
const CLOUDINARY_CLOUD_NAME = `https://api.cloudinary.com/v1_1/${
  import.meta.env.VITE_CLOUD_NAME
}/image/upload`;

const AddPackage = () => {
  const axiosSecure = useAxiosSecure();
  const { tourTypes } = useTourTypes();
  const navigate = useNavigate();
  console.log(tourTypes);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm();
  const [selectedImages, setSelectedImages] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [activities, setActivities] = useState([{ day: 1, activity: "" }]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const filePreviews = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setSelectedImages((prevImages) => [...prevImages, ...filePreviews]);
  };

  const removeImage = (index) => {
    setSelectedImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const uploadToCloudinary = async (image) => {
    const formData = new FormData();
    formData.append("file", image.file);
    formData.append("upload_preset", CLOUDINARY_PRESET);

    try {
      const response = await fetch(CLOUDINARY_CLOUD_NAME, {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      console.error("Image upload failed:", error);
      toast.error("Image upload failed!");
      throw new Error("Cloudinary upload error");
    }
  };

  const addActivityField = () => {
    setActivities((prevActivities) => [
      ...prevActivities,
      { day: prevActivities.length + 1, activity: "" },
    ]);
  };

  const removeActivityField = (index) => {
    setActivities((prevActivities) =>
      prevActivities.filter((_, i) => i !== index)
    );
  };

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
            return;
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
      console.log(packageInfo);
      const res = await axiosSecure.post("/packages", packageInfo);
      if (res.data.insertedId) {
        toast.success(`${data.name} has been added to packages`);
        navigate("/dashboard/managePackages");
        reset();
        setSelectedImages([]);
        setActivities([{ day: 1, activity: "" }]);
      }
    } catch (error) {
      console.error("Error adding package:", error);
      toast.error("Failed to add package!");
    }
  };
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  return (
    <div>
      <Helmet>
        <title>Add Package | Traveller Site</title>
      </Helmet>
      <SectionTitle
        heading="Add New Package"
        subHeading="Write Package offer"
      />
      <div className="flex items-center justify-between px-1 md:px-4 max-w-5xl mx-auto py-5 bg-gray-100 mb-5">
        <h3 className="font-semibold text-slate-800">Add Tour Type</h3>
        <button className="text-2xl" onClick={openModal}>
          <MdAddCard />
        </button>
      </div>
      <form
        className="max-w-5xl mx-auto border-2 border-slate-400 p-2 md:p-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* Image Upload Section */}
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
          {errors.images && (
            <span className="text-sm text-red-600 font-semibold">
              Upload at least one image
            </span>
          )}
        </div>

        {/* Image Previews Section */}
        <div className="flex flex-wrap gap-4 mb-6">
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

        {/* Package Details Section */}
        <div className="grid gap-x-6 gap-y-2 md:gap-y-3 mb-6 md:grid-cols-2">
          {/* Tour Name */}
          <div>
            <label
              htmlFor="name"
              className="block md:mb-2 text-xs md:text-sm font-medium text-gray-900 dark:text-white"
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
                Fill This Field
              </span>
            )}
          </div>

          {/* Type */}
          <div>
            <label
              htmlFor="type"
              className="block md:mb-2 text-xs md:text-sm font-medium text-gray-900 dark:text-white"
            >
              Type
            </label>
            <select
              id="type"
              {...register("type", { required: true })}
              className="bg-gray-50 border border-gray-300 text-gray-900 h-7 md:h-auto text-xs md:text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="" disabled selected>
                Select a Type
              </option>
              {tourTypes?.map((tourType, idx) => (
                <option key={idx} value={tourType.trip_type}>
                  {tourType.trip_type}
                </option>
              ))}
            </select>
            {errors.type && (
              <span className="text-sm text-red-600 font-semibold">
                Select a tour type
              </span>
            )}
          </div>

          {/* Price */}
          <div>
            <label
              htmlFor="price"
              className="block md:mb-2 text-xs md:text-sm font-medium text-gray-900 dark:text-white"
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
                Fill This Field
              </span>
            )}
          </div>

          {/* Duration */}
          <div>
            <label
              htmlFor="duration"
              className="block md:mb-2 text-xs md:text-sm font-medium text-gray-900 dark:text-white"
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
                Fill This Field
              </span>
            )}
          </div>
        </div>

        {/* Activities Section */}
        <div className="mb-6">
          <label
            htmlFor="activities"
            className="block text-xs md:text-sm font-medium text-gray-900 dark:text-white"
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
            +Add Activities
          </button>
        </div>

        {/* Description Section */}
        <div className="mb-6">
          <label
            htmlFor="description"
            className="block mb-2 text-xs md:text-sm font-medium text-gray-900 dark:text-white"
          >
            Description
          </label>
          <CKEditor
            editor={ClassicEditor}
            data=""
            config={{
              toolbar: [
                "heading",
                "|",
                "bold",
                "italic",
                "underline", // Added underline option
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
            Add Package
          </button>
        </div>
      </form>
      <AddTourTypeModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default AddPackage;
