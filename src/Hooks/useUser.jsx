import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
import useAuth from "./useAuth";

const useUsers = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosPublic();
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const result = await axiosSecure.get("/users");
      return result.data;
    },
  });
  const theUser = users.find((theUser) => theUser?.userEmail == user?.email);
  return { users, theUser, refetch };
};

export default useUsers;
