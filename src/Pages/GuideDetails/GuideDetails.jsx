import { useParams } from "react-router-dom";
import useGuides from "../../Hooks/useGuides";
import TopLayer from "../../Components/TopLayerOfPage/TopLayer";
import { useForm } from "react-hook-form";
import { useState } from "react";
import useUsers from "../../Hooks/useUser";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import toast from "react-hot-toast";
import useGuideReviews from "../../Hooks/useGuideReviews";

const GuideDetails = () => {
  const { id } = useParams();
  const axiosPublic = useAxiosPublic();
  const { guides } = useGuides();
  const { theUser } = useUsers();
  const { guideReviews } = useGuideReviews();
  const theGuide = guides?.find((guide) => guide?._id === id);
  const theGuideReviews = guideReviews.filter(
    (guideReview) => guideReview?.guideEmail === theGuide?.userEmail
  );
  console.log(theGuideReviews);
  // Use React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm();

  // State for rating (to handle star clicks)
  const [rating, setRating] = useState(0);

  const handleRatingChange = (newRating) => {
    setRating(newRating);
    setValue("rating", newRating);
  };

  const onSubmit = (data) => {
    const reviewInfo = {
      rating: data?.rating,
      comment: data?.comment,
      adderImage: theUser?.userImage,
      adderName: theUser?.userName,
      guideEmail: theGuide?.userEmail,
    };
    axiosPublic
      .post("/guideReviews", reviewInfo)
      .then((res) => {
        if (res.data.insertedId) {
          toast.success("Review Added");
        }
      })
      .catch((err) => {
        console.log(err);
      });
    console.log("Review submitted:", reviewInfo);
    reset();
    setRating(0);
  };

  return (
    <div className="p-8 bg-gray-50 dark:bg-gray-900">
      <TopLayer page={"guideDetails"} guideMail={theGuide?.userEmail} />
      {theGuide ? (
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md dark:bg-gray-800">
          {/* Guide Image and Name */}
          <div className="relative">
            <img
              className="w-full h-64 md:h-96 object-cover md:object-contain rounded-t-lg"
              src={theGuide?.userImage}
              alt={theGuide?.userName}
            />
            <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white px-4 py-2 rounded-md shadow-md">
              <h2 className="text-2xl font-bold">{theGuide?.userName}</h2>
              <p className="text-sm text-gray-300">{theGuide?.role}</p>
            </div>
          </div>

          {/* Guide Info */}
          <div className="p-6">
            <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-4">
              Guide Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Email */}
              <div>
                <p className="text-gray-700 dark:text-gray-300 font-medium">
                  Email:
                </p>
                <p className="text-gray-900 dark:text-gray-100 border-b-2">
                  {theGuide?.userEmail}
                </p>
              </div>

              {/* Phone */}
              <div>
                <p className="text-gray-700 dark:text-gray-300 font-medium">
                  Phone:
                </p>
                <p className="text-gray-900 dark:text-gray-100 border-b-2">
                  {theGuide?.phone}
                </p>
              </div>

              {/* Address */}
              <div>
                <p className="text-gray-700 dark:text-gray-300 font-medium">
                  Address:
                </p>
                <p className="text-gray-900 dark:text-gray-100 border-b-2">
                  {theGuide?.address}
                </p>
              </div>

              {/* Education */}
              <div>
                <p className="text-gray-700 dark:text-gray-300 font-medium">
                  Education:
                </p>
                <p className="text-gray-900 dark:text-gray-100 border-b-2">
                  {theGuide?.education}
                </p>
              </div>

              {/* Experience */}
              <div>
                <p className="text-gray-700 dark:text-gray-300 font-medium">
                  Experience:
                </p>
                <p className="text-gray-900 dark:text-gray-100 border-b-2">
                  {theGuide?.experience}
                </p>
              </div>

              {/* Languages */}
              <div>
                <p className="text-gray-700 dark:text-gray-300 font-medium">
                  Languages:
                </p>
                <p className="text-gray-900 dark:text-gray-100 border-b-2">
                  {theGuide?.languages}
                </p>
              </div>
            </div>
          </div>

          {/* Review Section */}
          <div className="p-6 mt-8 bg-gray-100 rounded-lg shadow-md dark:bg-gray-700">
            <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-4">
              Add Your Review
            </h3>
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Star Rating */}
              <div className="flex items-center mb-4">
                <span className="text-gray-700 dark:text-gray-300 mr-2">
                  Rating:
                </span>
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    type="button"
                    key={star}
                    className={`text-2xl ${
                      rating >= star ? "text-yellow-500" : "text-gray-300"
                    }`}
                    onClick={() => handleRatingChange(star)}
                  >
                    ★
                  </button>
                ))}
                <input
                  {...register("rating", { required: "Rating is required" })}
                  type="hidden"
                  value={rating}
                />
              </div>
              {errors.rating && (
                <p className="text-red-500 text-sm">{errors.rating.message}</p>
              )}

              {/* Comment */}
              <div className="mb-4">
                <textarea
                  {...register("comment", { required: "Comment is required" })}
                  placeholder="Write your review..."
                  rows="4"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                ></textarea>
                {errors.comment && (
                  <p className="text-red-500 text-sm">
                    {errors.comment.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="px-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 dark:bg-blue-700 dark:hover:bg-blue-800 dark:focus:ring-blue-900"
              >
                Submit Review
              </button>
            </form>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-600 dark:text-gray-300">
          Guide not found or loading...
        </p>
      )}
    </div>
  );
};

export default GuideDetails;
