import toast from "react-hot-toast";
import { Helmet } from "react-helmet";
import useGuideBooking from "../../Hooks/useGuideBooking";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import SectionTitle from "../../Components/SectionTitle/SectionTitle";

const AssignedTour = () => {
  const { guideBookings } = useGuideBooking();
  const axiosSecure = useAxiosSecure();

  const handleAction = (id, status) => {
    const bookingInfo = { status };
    axiosSecure.patch(`/guideBookings/${id}`, bookingInfo).then((res) => {
      if (res.data.modifiedCount) {
        toast.success(`Booking ${status}`);
      }
    });
  };

  return (
    <div>
      <Helmet>
        <title>Assigned Tours | Traveller Site</title>
      </Helmet>
      <SectionTitle
        heading={"Your Assigned Tours"}
        subHeading={"Manage your assigned tours here"}
      />
      <div className="bg-white max-w-6xl mx-auto px-12 py-10 mb-20">
        <div className="font-cinzel font-bold flex justify-around items-center mb-10">
          <h2 className="text-3xl">
            Total Assigned Tours: {guideBookings.length}
          </h2>
        </div>
        <div>
          <div className="overflow-x-auto rounded-t-xl">
            <table className="table">
              {/* head */}
              <thead className="uppercase text-white font-bold">
                <tr className="bg-slate-400">
                  <th className="text-center text-xl">#</th>
                  <th className="py-5 text-center">Package Name</th>
                  <th className="text-center">Tourist Name</th>
                  <th className="text-center">Date</th>
                  <th className="text-center">Price</th>
                  <th className="text-center">Status</th>
                  <th className="text-center">Action</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {guideBookings.map((item, idx) => (
                  <tr key={idx} className="font-inter">
                    <th className="text-center font-bold">{idx + 1}</th>
                    <td className="text-center">{item.tourName}</td>
                    <td className="text-center">{item.touristName}</td>
                    <td className="text-center">{item.date}</td>
                    <td className="text-center">${item.price}</td>
                    <td className="text-center">{item.status}</td>
                    <th className="text-center">
                      <button
                        disabled={item.status === "Rejected"}
                        onClick={() => handleAction(item._id, "Accepted")}
                        className="btn bg-slate-400 text-white"
                      >
                        Accept
                      </button>
                    </th>
                    <th className="text-center">
                      <button
                        disabled={item.status === "Accepted"}
                        onClick={() => handleAction(item._id, "Rejected")}
                        className="btn bg-slate-400 text-white"
                      >
                        Reject
                      </button>
                    </th>
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

export default AssignedTour;
