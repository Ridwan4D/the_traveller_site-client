import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
import useAuth from "./useAuth";

const useUserStories = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosPublic();
  const { data: userStories = [], refetch } = useQuery({
    queryKey: ["userStories"],
    queryFn: async () => {
      const result = await axiosSecure.get(`/stories?email=${user.email}`);
      return result.data;
    },
  });
  return { userStories, refetch };
};

export default useUserStories;
