import PropType from "prop-types";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import toast from "react-hot-toast";
import { FaRegHeart } from "react-icons/fa6";
import useWishlist from "../../Hooks/useWishlist";
import useAdmin from "../../Hooks/useAdmin";
import useGuide from "../../Hooks/useGuide";

const PackageCard = ({ pkg }) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { wishlists, refetch } = useWishlist();
  const { isAdmin } = useAdmin();
  const { isGuide } = useGuide();
  const wishId = wishlists.find((findId) => findId.mainPackId === pkg?._id);

  const handleAddToWishlist = (id) => {
    if (wishId?.mainPackId) {
      return toast.error("Package already added");
    }
    const wishInfo = {
      mainPackId: id,
      image: pkg?.images[0],
      name: pkg?.tour_name,
      adderMail: user?.email,
      price: pkg?.price,
    };
    console.log(wishInfo);
    axiosSecure
      .post(`/wishlists`, wishInfo)
      .then((res) => {
        if (res.data.insertedId) {
          toast.success("Package added to wish");
          refetch();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div
      key={pkg._id}
      className="relative group overflow-hidden bg-white rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 dark:bg-gray-800"
    >
      {/* Image with Wishlist */}
      <div className="relative">
        <img
          className="w-full h-48 object-cover rounded-t-lg"
          src={pkg?.images?.[0]}
          alt={pkg?.tour_name}
        />
        {!isAdmin && !isGuide && (
          <button
            className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-lg hover:bg-red-100 transition duration-300"
            onClick={() => handleAddToWishlist(pkg?._id)}
          >
            <FaRegHeart size={20} />
          </button>
        )}
      </div>

      {/* Package Details */}
      <div className="p-5">
        <h5 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-blue-600 transition duration-300">
          {pkg?.tour_name}
        </h5>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
          Tour Type:{" "}
          <span className="font-medium uppercase">{pkg?.trip_type}</span>
        </p>
        <p className="text-lg font-semibold text-gray-800 dark:text-gray-300 mt-3">
          Price: ${pkg?.price}
        </p>
        <Link
          to={`/packageDetails/${pkg._id}`}
          className="mt-4 inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 dark:bg-blue-700 dark:hover:bg-blue-800 dark:focus:ring-blue-900 transition duration-300"
        >
          View Package
          <svg
            className="w-4 h-4 ml-2"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
};
PackageCard.propTypes = {
  pkg: PropType.object,
};
export default PackageCard;
