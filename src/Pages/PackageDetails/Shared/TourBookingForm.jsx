import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import PropType from "prop-types";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useGuides from "../../../Hooks/useGuides";

const TourBookingForm = ({ tourName, tourPrice }) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { guides } = useGuides();
  // console.log(guides);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    // console.log(data.guide,data.date,data.price);
    const guideName = guides.find((guide) => guide.userEmail == data.guide);
    // console.log(guideName.userName);
    const bookingInfo = {
      guideName: guideName.userName,
      guideEmail: data.guide,
      date: data.date,
      price: parseFloat(tourPrice),
      name: user.displayName,
      userEmail: user.email,
      status: "In Review",
      tourName,
    };
    axiosSecure.post("/bookings", bookingInfo).then((res) => {
      if (res.data.insertedId) {
        toast.success("Confirm your Booking");
        navigate("/dashboard/bookings");
      }
    });
  };
  return (
    <div>
      <div className="p-6 bg-gray-100 flex items-center justify-center">
        <div className="container max-w-screen-lg mx-auto">
          <div>
            <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
              <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                <div className="text-gray-600">
                  <p className="font-medium text-lg">Booking Details</p>
                  <p>Please fill out all the fields.</p>
                </div>

                <form
                  className="lg:col-span-2"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                    <div className="md:col-span-5">
                      <label htmlFor="full_name">Your Name</label>
                      <input
                        type="text"
                        defaultValue={user.displayName}
                        id="full_name"
                        disabled
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      />
                    </div>
                    <div className="md:col-span-5">
                      <label htmlFor="email">Your Email</label>
                      <input
                        type="email"
                        defaultValue={user.email}
                        id="email"
                        disabled
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      />
                    </div>
                    <div className="md:col-span-5">
                      <label htmlFor="image">Profile URL</label>
                      <input
                        type="text"
                        defaultValue={user.photoURL}
                        id="image"
                        disabled
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      />
                    </div>
                    <div className="md:col-span-5">
                      <label htmlFor="price">Price</label>
                      <input
                        type="number"
                        id="price"
                        defaultValue={tourPrice}
                        disabled
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        placeholder="Enter The Amount"
                      />
                    </div>

                    <div className="md:col-span-5">
                      <label htmlFor="date">Select Tour Date</label>
                      <input
                        type="date"
                        id="date"
                        {...register("date", {
                          required: "Select a tour date",
                          validate: (value) => {
                            const selectedDate = new Date(value);
                            const today = new Date();
                            // Remove time part from today's date for accurate comparison
                            today.setHours(0, 0, 0, 0);
                            return (
                              selectedDate >= today ||
                              "The date cannot be in the past"
                            );
                          },
                        })}
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      />
                      {errors.date && (
                        <span className="text-sm text-red-600 font-semibold">
                          {errors.date.message}
                        </span>
                      )}
                    </div>
                    <div className="md:col-span-5">
                      <label htmlFor="price">Tour Guide</label>
                      <select
                        id="category"
                        defaultValue="default"
                        {...register("guide", { required: true })}
                        className="bg-gray-50 py-3 border-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      >
                        <option value="default" disabled>
                          Select Tour Guide
                        </option>
                        {guides.map((guide, idx) => {
                          // console.log(guide);
                          return (
                            <option key={idx} value={guide.userEmail}>
                              {guide.userName}
                            </option>
                          );
                        })}
                      </select>
                      {errors.guide && (
                        <span className="text-sm text-red-600 font-semibold">
                          Select Tour Guide
                        </span>
                      )}
                    </div>

                    <div className="md:col-span-5 text-right">
                      <div className="inline-flex items-end">
                        <input
                          type="submit"
                          value="Book Now"
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        />
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
TourBookingForm.propTypes = {
  tourName: PropType.string,
  tourPrice: PropType.number,
};
export default TourBookingForm;
