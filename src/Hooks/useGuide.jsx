import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "../Hooks/useAuth";

const useGuide = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: isGuide, isPending: isGuideLoading } = useQuery({
    queryKey: [user?.email, "isGuide"],
    queryFn: async () => {
      const result = await axiosSecure.get(`/users/guide/${user?.email}`);
      return result.data?.guide;
    },
  });
  return { isGuide, isGuideLoading };
};

export default useGuide;
