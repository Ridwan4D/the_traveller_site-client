import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useGuideReviews = () => {
  const axiosPublic = useAxiosPublic();
  const { data: guideReviews = [], refetch } = useQuery({
    queryKey: ["guideReviews"],
    queryFn: async () => {
      const result = await axiosPublic.get("/guideReviews");
      return result.data;
    },
  });
  return { guideReviews, refetch };
};

export default useGuideReviews;
