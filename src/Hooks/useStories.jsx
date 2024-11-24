import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useStories = () => {
  const axiosPublic = useAxiosPublic();
  const { data: stories = [], refetch } = useQuery({
    queryKey: ["stories"],
    queryFn: async () => {
      const result = await axiosPublic.get("/stories");
      return result.data;
    },
  });
  return { stories, refetch };
};

export default useStories;
