import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useTourTypes = () => {
  const axiosPublic = useAxiosPublic();
  const { data: tourTypes = [], refetch } = useQuery({
    queryKey: ["tourTypes"],
    queryFn: async () => {
      const result = await axiosPublic.get("/tourTypes");
      return result.data;
    },
  });
  return { tourTypes, refetch };
};

export default useTourTypes;
