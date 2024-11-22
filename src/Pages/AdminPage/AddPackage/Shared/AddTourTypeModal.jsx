import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { MdClose } from "react-icons/md";
import toast from "react-hot-toast";
import useTourTypes from "../../../../Hooks/useTourTypes";
import useAxiosPublic from "../../../../Hooks/useAxiosPublic";

const AddTourTypeModal = ({ isOpen, onClose }) => {
  const axiosPublic = useAxiosPublic();
  const { tourTypes, refetch } = useTourTypes();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleAddTourType = (data) => {
    const tourTypeInfo = {
      trip_type: data.tourType.toLowerCase(),
    };

    axiosPublic
      .post("/tourTypes", tourTypeInfo)
      .then((res) => {
        if (res.data.insertedId) {
          toast.success("Tour type added");
          refetch();
          reset();
        }
      })
      .catch((err) => {
        console.error(`Error: ${err}`);
      });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity">
      <div className="bg-white rounded-md shadow-lg w-11/12 max-w-4xl overflow-hidden">
        <div className="flex justify-between items-center p-4 bg-indigo-600 text-white">
          <h2 className="text-lg font-semibold">Add New Tour Type</h2>
          <button onClick={onClose} className="text-2xl">
            <MdClose />
          </button>
        </div>
        <div className="flex flex-col md:flex-row">
          {/* Left Side */}
          <div
            id="addTourTypeModal"
            className="flex-1 p-4 bg-gray-100 max-h-56 md:max-h-full overflow-y-auto"
          >
            <h3 className="text-lg font-semibold mb-4">Added Tour Types</h3>
            <ul className="space-y-2">
              {tourTypes.map((type, idx) => (
                <li
                  key={idx}
                  className="px-4 py-2 bg-gray-200 rounded-md shadow-sm uppercase"
                >
                  {type.tourType}
                </li>
              ))}
            </ul>
          </div>

          {/* Right Side */}
          <div className="flex-1 p-4">
            <h3 className="text-lg font-semibold mb-4">Add Tour Type Here</h3>
            <form
              onSubmit={handleSubmit(handleAddTourType)}
              className="space-y-4"
            >
              <div>
                <input
                  type="text"
                  {...register("tourType", {
                    required: "Tour type name is required",
                    minLength: {
                      value: 2,
                      message: "Tour type name must be at least 2 characters",
                    },
                  })}
                  placeholder="Enter tour type name"
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                />
                {errors.tourType && (
                  <p className="text-sm text-red-600">
                    {errors.tourType.message}
                  </p>
                )}
              </div>
              <button
                type="submit"
                className="w-full px-5 py-3 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none"
              >
                Add Tour Type
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

// Define PropTypes
AddTourTypeModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default AddTourTypeModal;
