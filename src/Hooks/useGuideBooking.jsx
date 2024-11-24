import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
import useAuth from "./useAuth";

const useGuideBooking = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const { data: bookings = [], refetch } = useQuery({
    queryKey: ["bookings"],
    queryFn: async () => {
      const result = await axiosPublic.get(`/bookings/${user.email}`);
      return result.data;
    },
  });
  return { bookings, refetch };
};

export default useGuideBooking;
