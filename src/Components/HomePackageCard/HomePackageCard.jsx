import { FaRegHeart } from "react-icons/fa6";
import useAdmin from "../../Hooks/useAdmin";
import useGuide from "../../Hooks/useGuide";
import PropType from "prop-types";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import toast from "react-hot-toast";
import useAuth from "../../Hooks/useAuth";
import useWishlist from "../../Hooks/useWishlist";

const HomePackageCard = ({ pkg }) => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { wishlists, refetch } = useWishlist();
  const { isAdmin } = useAdmin();
  const { isGuide } = useGuide();
  const wishId = wishlists.find((findId) => findId.mainPackId === pkg?._id);

  const handleAddToWishlist = (id) => {
    if (wishId?.mainPackId === id) {
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
      key={pkg?._id}
      className="border rounded-lg shadow-lg overflow-hidden relative group hover:scale-105 transition-transform duration-300 ease-in-out"
    >
      {/* Image with Wishlist Heart Icon */}
      <div className="relative">
        <img
          src={pkg?.images[0]} // Display the first image
          alt={pkg?.tour_name}
          className="w-full h-56 object-contain py-1 transition-transform duration-300 group-hover:scale-110"
        />
        {!isAdmin && !isGuide && (
          <button
            className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md text-red-500 hover:bg-gray-100 transition-transform duration-300 hover:scale-110"
            title="Add to Wishlist"
            onClick={() => handleAddToWishlist(pkg?._id)}
          >
            <FaRegHeart size={20} />
          </button>
        )}
      </div>

      {/* Card Content */}
      <div className="p-6 bg-gradient-to-b from-gray-50 via-white to-gray-100">
        <h3 className="text-xl font-bold text-gray-800 mb-2 truncate">
          {pkg?.tour_name}
        </h3>
        <p className="text-sm text-gray-600 mb-2">
          <span className="font-bold text-gray-700">Type:</span>{" "}
          {pkg?.trip_type}
        </p>
        <p className="text-sm text-gray-600 mb-4">
          <span className="font-bold text-gray-700">Price:</span> ${pkg?.price}
        </p>

        {/* View Package Button */}
        <div className="flex gap-4">
          <Link
            to={`/packageDetails/${pkg?._id}`}
            className="btn flex-1 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600 transition-all duration-300"
          >
            View Package
          </Link>
        </div>
      </div>
    </div>
  );
};
HomePackageCard.propTypes = {
  pkg: PropType.object,
};
export default HomePackageCard;
