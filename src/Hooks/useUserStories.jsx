import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useUserStories = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: userStories = [],
    refetch,
    isError,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["userStories", user?.email], // Add user.email as part of queryKey
    queryFn: async () => {
      if (!user?.email) throw new Error("User email is not defined");
      const result = await axiosSecure.get(`/stories?email=${user.email}`);
      return result.data;
    },
    enabled: !!user?.email, // Only run query if email exists
  });

  return { userStories, refetch, isError, error, isLoading };
};

export default useUserStories;
