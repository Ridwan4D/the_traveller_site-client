import { Helmet } from "react-helmet";
import useWishlist from "../../../Hooks/useWishlist";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const Wishlist = () => {
  const axiosSecure = useAxiosSecure();
  const { wishlists, refetch } = useWishlist();

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/wishlists/${id}`).then((res) => {
          //   console.log(res.data);
          if (res.data.deletedCount) {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          }
          refetch();
        });
      }
    });
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 px-4">
      <Helmet>
        <title>Wishlist || Traveler Site</title>
      </Helmet>
      {/* Section Title */}
      <SectionTitle
        heading="Your Wishlist"
        subHeading="Packages you've saved for later"
      />

      {/* Table Section */}
      <div className="bg-white shadow-md rounded-lg p-6">
        {wishlists.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="table-auto w-full border-collapse border border-gray-300 text-gray-700">
              <thead>
                <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                  <th className="px-6 py-3 border">Image</th>
                  <th className="px-6 py-3 border">Name</th>
                  <th className="px-6 py-3 border">Adder Mail</th>
                  <th className="px-6 py-3 border">Price</th>
                  <th className="px-6 py-3 border">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm">
                {wishlists.map((wishlist) => (
                  <tr key={wishlist._id} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4 border text-center">
                      <img
                        src={wishlist.image}
                        alt={wishlist.name}
                        className="w-20 h-20 object-cover rounded-lg mx-auto"
                      />
                    </td>
                    <td className="px-6 py-4 border text-center">
                      {wishlist.name}
                    </td>
                    <td className="px-6 py-4 border text-center">
                      {wishlist.adderMail}
                    </td>
                    <td className="px-6 py-4 border text-center">
                      ${wishlist.price}
                    </td>
                    <td className="px-6 py-4 border text-center">
                      <div className="flex justify-center space-x-2">
                        <Link
                          to={`/packageDetails/${wishlist?.mainPackId}`}
                          className="btn bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                        >
                          Details
                        </Link>
                        <button
                          onClick={() => handleDelete(wishlist._id)}
                          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-10">
            <h2 className="text-xl font-semibold text-gray-700">
              No items in your wishlist
            </h2>
            <p className="text-gray-500">
              Start exploring packages and add them to your wishlist!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
