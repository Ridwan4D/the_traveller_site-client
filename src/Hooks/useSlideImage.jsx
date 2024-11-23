import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useSlideImage = () => {
  const axiosPublic = useAxiosPublic();
  const {
    data: sliderImages = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["allSliders"],
    queryFn: async () => {
      const res = await axiosPublic.get("/sliders");
      return res.data;
    },
  });
  return {sliderImages, refetch, isLoading};
};

export default useSlideImage;
