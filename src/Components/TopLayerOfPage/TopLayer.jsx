import { Link, useNavigate } from "react-router-dom";
import useAdmin from "../../Hooks/useAdmin";
import useGuide from "../../Hooks/useGuide";
import PropType from "prop-types";
import useUsers from "../../Hooks/useUser";

const TopLayer = ({ packageId, page, guideMail }) => {
  const { theUser } = useUsers();
  const { isAdmin } = useAdmin();
  const { isGuide } = useGuide();
  const navigate = useNavigate();

  const goBack = () => navigate(-1);

  return (
    <div className="flex justify-between items-center mb-6">
      {isAdmin && (
        <Link
          to={`/dashboard/updatePackage/${packageId}`}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition"
        >
          Update Package
        </Link>
      )}
      {page == "guideDetails" &&
        isGuide &&
        theUser?.userEmail === guideMail && (
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition">
            Update Info
          </button>
        )}
      <button
        onClick={goBack}
        className="bg-gray-500 text-white px-4 py-2 rounded-lg shadow hover:bg-gray-600 transition"
      >
        Go Back
      </button>
    </div>
  );
};
TopLayer.propTypes = {
  packageId: PropType.string,
  page: PropType.string,
  guideMail: PropType.string,
};
export default TopLayer;
