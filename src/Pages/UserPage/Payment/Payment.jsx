import { loadStripe } from "@stripe/stripe-js";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./Shared/CheckoutForm";
import { useParams } from "react-router-dom";
import usePackages from "../../../Hooks/usePackages";
import useBookings from "../../../Hooks/useBookings";

const stripPromise = loadStripe(import.meta.env.VITE_STRIP_PUBLISH_KEY);
const Payment = () => {
  const { id } = useParams();
  const { bookings } = useBookings();
  const theBook = bookings.find((book) => book?._id === id);
//   console.log(theBook);
  const { packages } = usePackages();
  const thePack = packages.find((pkg) => pkg?._id === theBook?.packageId);
//   console.log(thePack);
  return (
    <div>
      <SectionTitle
        heading="Payment"
        subHeading="Pay to confirm your booking"
      />
      <div>
        <Elements stripe={stripPromise}>
          <CheckoutForm book={theBook} pkg={thePack} />
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
