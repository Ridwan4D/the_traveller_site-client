import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import usePackages from "../../../Hooks/usePackages";

const ManagePackages = () => {
  const { packages } = usePackages();

  const handleEdit = (id) => {
    console.log(`Edit package with id: ${id}`);
  };

  const handleDelete = (id) => {
    console.log(`Delete package with id: ${id}`);
  };

  return (
    <div className="container mx-auto p-6">
      <SectionTitle
        heading="Manage Packages"
        subHeading="View, edit, or delete packages"
      />

      {/* Table for displaying packages */}
      <div className="overflow-x-auto bg-white shadow-lg rounded-lg mt-6">
        <table className="min-w-full text-sm text-left text-gray-500">
          <thead className="text-xs uppercase bg-indigo-600 text-white">
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
              <th scope="col" className="px-6 py-3 border">
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
                  {pkg.tour_name}
                </td>
                <td className="px-6 py-4 border">${pkg.price}</td>
                <td className="px-6 py-4 border">{pkg.duration} Days</td>
                <td className="px-6 py-4 border">{pkg.tour_type}</td>
                <td className="px-6 py-4 border border-b-0 flex space-x-3">
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
                    // Edit action
                    onClick={() => handleEdit(pkg._id)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
                    // Delete action
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
