import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "../Hooks/useAuth";

const useAdmin = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: isAdmin, isPending: isAdminLoading } = useQuery({
    queryKey: [user?.email, "isAdmin"],
    queryFn: async () => {
      const result = await axiosSecure.get(`/users/admin/${user?.email}`);
      return result.data?.admin;
    },
  });
  return { isAdmin, isAdminLoading };
};

export default useAdmin;
