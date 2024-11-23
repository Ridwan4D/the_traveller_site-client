import { Helmet } from "react-helmet";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import usePackages from "../../../Hooks/usePackages";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
const ManagePackages = () => {
  const axiosSecure = useAxiosSecure();
  const { packages, refetch } = usePackages();

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
        axiosSecure.delete(`/packages/${id}`).then((res) => {
          if (res.data.deletedCount) {
            Swal.fire("Deleted!", "Your file has been deleted.", "success");
            refetch();
          }
        });
      }
    });
  };

  return (
    <div className="container mx-auto p-2 md:p-6">
      <Helmet>
        <title>Manage Package | Traveller Site</title>
      </Helmet>
      <SectionTitle
        heading="Manage Packages"
        subHeading="View, edit, or delete packages"
      />

      {/* Table for displaying packages */}
      <div className="overflow-x-auto bg-white shadow-lg rounded-lg mt-6">
        <table className="min-w-full text-sm text-left text-gray-500">
          <thead className="text-xs uppercase bg-indigo-500 text-white">
            <tr>
              <th scope="col" className="px-6 py-3 border"></th>
              <th scope="col" className="px-6 py-3 border">
                Image
              </th>
              <th scope="col" className="px-6 py-3 border">
                Tour Name
              </th>
              <th scope="col" className="px-6 py-3 border">
                Price
              </th>
              <th scope="col" className="px-6 py-3 border">
                Duration
              </th>
              <th scope="col" className="px-6 py-3 border">
                Tour Type
              </th>
              <th scope="col" className="px-6 py-3 border text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {packages.map((pkg, index) => (
              <tr
                key={pkg._id}
                className="border-b hover:bg-gray-100 transition-colors duration-200"
              >
                <td className="px-6 py-4 border">{index + 1}</td>
                <td className="px-6 py-4 border">
                  {pkg.images && pkg.images[0] ? (
                    <img
                      src={pkg.images[0]}
                      alt={pkg.tour_name}
                      className="w-10 h-10 object-cover rounded-md"
                    />
                  ) : (
                    <span>No Image</span>
                  )}
                </td>
                <td className="px-6 py-4 font-medium text-gray-800 border">
                  <span className="block w-32">{pkg.tour_name}</span>
                </td>
                <td className="px-6 py-4 border">${pkg.price}</td>
                <td className="px-6 py-4 border">{pkg.duration} Days</td>
                <td className="px-6 py-4 border uppercase">{pkg.trip_type}</td>
                <td className="px-6 py-4 border border-b-0 flex space-x-3 justify-center">
                  <Link
                    to={`/packageDetails/${pkg._id}`}
                    className="bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-600 transition"
                  >
                    Details
                  </Link>
                  <Link
                    to={`/dashboard/updatePackage/${pkg._id}`}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
                  >
                    Update
                  </Link>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
                    onClick={() => handleDelete(pkg._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManagePackages;
