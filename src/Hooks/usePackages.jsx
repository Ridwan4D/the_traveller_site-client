import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const usePackages = () => {
  const axiosPublic = useAxiosPublic();
  const { data: packages = [], refetch } = useQuery({
    queryKey: ["packages"],
    queryFn: async () => {
      const result = await axiosPublic.get("/packages");
      return result.data;
    },
  });
  return { packages, refetch };
};

export default usePackages;
