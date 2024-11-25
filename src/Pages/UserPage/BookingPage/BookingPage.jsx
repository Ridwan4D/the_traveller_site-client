import { Helmet } from "react-helmet";
import Swal from "sweetalert2";
import { useState, useEffect } from "react";
import useBookings from "../../../Hooks/useBookings";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import { Link } from "react-router-dom";

const BookingPage = () => {
  const { bookings, refetch } = useBookings();
  const axiosSecure = useAxiosSecure();

  // Calculate total price (this will be recalculated whenever bookings change)
  const calculateTotalPrice = (bookings) => {
    return bookings.reduce((total, item) => total + parseInt(item.price), 0);
  };

  // Set initial cost
  const [cost, setCost] = useState(calculateTotalPrice(bookings));

  useEffect(() => {
    // Recalculate the cost whenever bookings change
    setCost(calculateTotalPrice(bookings));
  }, [bookings]);

  // Discount logic
  useEffect(() => {
    if (bookings.length >= 3) {
      Swal.fire({
        title: "Congratulations!",
        text: "You have booked 3 tours and earned a 25% discount!",
        icon: "info",
        showCancelButton: true,
        confirmButtonColor: "#4CAF50",
        cancelButtonColor: "#f44336",
        confirmButtonText: "Apply Discount",
      }).then((result) => {
        if (result.isConfirmed) {
          const discountedPrice = cost - (cost * 25) / 100;
          setCost(discountedPrice);
          refetch();
          Swal.fire("Discount Applied!", "Enjoy your savings!", "success");
        }
      });
    }
  }, [bookings, cost, refetch]); // Depend on bookings and cost to recalculate the discount

  // Handle booking cancellation
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#f44336",
      cancelButtonColor: "#9e9e9e",
      confirmButtonText: "Yes, cancel it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/bookings/${id}`).then((res) => {
          if (res.data.deletedCount) {
            Swal.fire(
              "Cancelled!",
              "Your booking has been removed.",
              "success"
            );
            refetch();
          }
        });
      }
    });
  };

  return (
    <div>
      <Helmet>
        <title>Bookings | Traveller Site</title>
      </Helmet>
      <SectionTitle
        heading="Your Booked Tours"
        subHeading="Manage your bookings here"
      />
      <div className="bg-gray-50 max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-6 shadow-lg rounded-lg">
        <div className="font-semibold flex flex-col md:flex-row justify-between items-center mb-6 text-gray-700 space-y-4 md:space-y-0">
          <h2 className="text-2xl">Total Bookings: {bookings.length}</h2>
          <h2 className="text-2xl">Total Price: ${parseInt(cost)}</h2>
        </div>
        <div>
          <div className="overflow-x-auto rounded-lg">
            <table className="table-auto w-full border-collapse border border-gray-300 text-sm text-gray-700">
              <thead className="bg-gray-300 text-gray-800 uppercase">
                <tr>
                  <th className="border border-gray-300 py-3 text-center"></th>
                  <th className="border border-gray-300 py-3 text-center">
                    Package Name
                  </th>
                  <th className="border border-gray-300 py-3 text-center">
                    Guide Name
                  </th>
                  <th className="border border-gray-300 py-3 text-center">
                    Date
                  </th>
                  <th className="border border-gray-300 py-3 text-center">
                    Price
                  </th>
                  <th className="border border-gray-300 py-3 text-center">
                    Status
                  </th>
                  <th className="border border-gray-300 py-3 text-center">
                    Pay
                  </th>
                  <th className="border border-gray-300 py-3 text-center">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((item, idx) => (
                  <tr
                    key={idx}
                    className="border border-gray-300 bg-gray-100 hover:bg-gray-200"
                  >
                    <td className="py-3 text-center">{idx + 1}</td>
                    <td className="py-3 text-center">{item.tourName}</td>
                    <td className="py-3 text-center">{item.guideName}</td>
                    <td className="py-3 text-center">{item.date}</td>
                    <td className="py-3 text-center">${item.price}</td>
                    <td className="py-3 text-center">{item.status}</td>
                    <td className="py-3 text-center">
                      <Link
                        to={`/dashboard/payment/${item?._id}`}
                        disabled={item.status === "Rejected"}
                        className={`px-4 py-2 rounded-md ${
                          item.status === "Rejected"
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-teal-500 hover:bg-teal-600 text-white"
                        }`}
                      >
                        Pay
                      </Link>
                    </td>
                    <td className="py-3 text-center">
                      <button
                        disabled={item.status === "Accepted"}
                        onClick={() => handleDelete(item._id)}
                        className={`px-4 py-2 rounded-md ${
                          item.status === "Accepted"
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-red-500 hover:bg-red-600 text-white"
                        }`}
                      >
                        Cancel
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
